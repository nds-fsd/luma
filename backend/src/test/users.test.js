const mongoose = require('mongoose');
const supertest = require("supertest");
const { bootstrapApp } = require("../bootstrap");
const app = bootstrapApp();
const fakeRequest = supertest(app);
const User = require("../models/userModel");
const { generateJWT } = require('../services/auth.service');
const { disconnectDB, connectDB } = require('../mongoose');
const bcrypt = require('bcrypt');

jest.setTimeout(30000);

let adminUser;
let adminHeaders;

beforeAll(async () => {
  await connectDB();

  adminUser = await User.findOne({ role: 'ADMIN' });
  if (!adminUser) {
    const adminData = {
      fullname: 'ADMIN',
      email: 'admin@fakeluma.com',
      birthdate: "1991-10-12",
      phone_number: "666666666",
      role: "ADMIN",
      profile_picture: "www.google.com",
      password: await bcrypt.hash('123456789', 10),
    };
    adminUser = new User(adminData);
    await adminUser.save();
  }
  adminHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + generateJWT(adminUser),
  };
  console.log('ADMIN CREADO', adminUser);
});

afterAll(async () => {
  await User.deleteMany({});
  await disconnectDB();
  console.log('Disconnected from test database!');
});

describe('User Controller TEST', () => {
  beforeAll(async () => {
    let testUser = await User.findOne({ email: 'testuser@example.com' });
    if (!testUser) {
      const userData = {
        fullname: 'TEST USER',
        email: 'testuser@example.com',
        birthdate: '2000-01-01',
        phone_number: '0987654321',
        profile_picture: 'https://example.com/profile.jpg',
        password: await bcrypt.hash('password', 10),
        role: 'CREATOR'
      };
      testUser = new User(userData);
      await testUser.save();
    }
  });

  it('should return 201 status code when we register a new user', async () => {
    const userData = {
      fullname: 'NEW TEST USER',
      email: 'newtestuser@example.com',
      birthdate: '2000-01-01',
      phone_number: '0987654322',
      profile_picture: 'https://example.com/profile.jpg',
      password: 'password',
    };

    const response = await fakeRequest.post('/user/register').send(userData);
    expect(response.status).toBe(201);
  });

  it('should return 400 status code for existing email', async () => {
    const userData = {
      fullname: 'TEST USER',
      email: 'testuser@example.com',
      birthdate: '2000-01-01',
      phone_number: '1234567891',
      profile_picture: 'https://example.com/profile.jpg',
      password: 'password',
    };

    const response = await fakeRequest.post('/user/register').send(userData);
    expect(response.status).toBe(400);
  });

  it('should return 400 status code for existing phone number', async () => {
    const userData = {
      fullname: 'TEST USER',
      email: 'newemail@example.com',
      birthdate: '2000-01-01',
      phone_number: '0987654321',
      profile_picture: 'https://example.com/profile.jpg',
      password: 'password',
    };

    const response = await fakeRequest.post('/user/register').send(userData);
    expect(response.status).toBe(400);
  });

  it('should handle general error when registering a user', async () => {
    const userData = {
      fullname: 'TEST USER',
      email: 'testuser2@example.com',
      birthdate: '2000-01-01',
      phone_number: '1234567890',
      profile_picture: 'https://example.com/profile.jpg',
      password: 'password',
    };

    
    const userSaveSpy = jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('General error');
    });

    const response = await fakeRequest.post('/user/register').send(userData);
    expect(response.status).toBe(500);

    userSaveSpy.mockRestore();
  });

  it('should return 200 status code and a list of users', async () => {
    const response = await fakeRequest.get('/user').set(adminHeaders);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(4);
  });

  it('should handle general error when fetching all users', async () => {
    const userFindSpy = jest.spyOn(User, 'find').mockImplementationOnce(() => {
      throw new Error('General error');
    });

    const response = await fakeRequest.get('/user').set(adminHeaders);
    expect(response.status).toBe(500);

    userFindSpy.mockRestore();
  });

  it('should return 200 status code and the correct user', async () => {
    const user = await User.findOne({ email: 'testuser@example.com' });
    const response = await fakeRequest.get(`/user/${user._id}`).set(adminHeaders);
    expect(response.status).toBe(200);
    expect(response.body.email).toBe('testuser@example.com');
  });

  it('should return 404 status code if user not found', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await fakeRequest.get(`/user/${nonExistentId}`).set(adminHeaders);
    expect(response.status).toBe(404);
  });

  it('should handle general error when fetching user by ID', async () => {
    const userFindByIdSpy = jest.spyOn(User, 'findById').mockImplementationOnce(() => {
      throw new Error('General error');
    });

    const userId = new mongoose.Types.ObjectId();
    const response = await fakeRequest.get(`/user/${userId}`).set(adminHeaders);
    expect(response.status).toBe(500);

    userFindByIdSpy.mockRestore();
  });

  it('should return 200 status code and update the user', async () => {
    const user = await User.findOne({ email: 'testuser@example.com' });
    const userData = {
      fullname: 'UPDATED USER',
      email: 'updateduser@example.com',
      birthdate: '2000-01-01',
      phone_number: '0987654321',
      password: 'newpassword',
    };

    const response = await fakeRequest.put(`/user/${user._id}`).set(adminHeaders).send(userData);
    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe('updateduser@example.com');
  });

  it('should return 404 status code if user not found for update', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const userData = {
      fullname: 'UPDATED USER',
      email: 'updateduser@example.com',
      birthdate: '2000-01-01',
      phone_number: '0987654321',
      password: 'newpassword',
    };

    const response = await fakeRequest.put(`/user/${nonExistentId}`).set(adminHeaders).send(userData);
    expect(response.status).toBe(404);
  });

  it('should handle general error when updating user', async () => {
    let user = await User.findOne({ email: 'testuser@example.com' });
    if (!user) {
      const userData = {
        fullname: 'TEST USER',
        email: 'testuser@example.com',
        birthdate: '2000-01-01',
        phone_number: '0987654321',
        profile_picture: 'https://example.com/profile.jpg',
        password: await bcrypt.hash('password', 10),
        role: 'CREATOR'
      };
      user = new User(userData);
      await user.save();
    }

    const userUpdateSpy = jest.spyOn(User, 'findByIdAndUpdate').mockImplementationOnce(() => {
      throw new Error('General error');
    });

    const userData = {
      fullname: 'UPDATED USER',
      email: 'updateduser@example.com',
      birthdate: '2000-01-01',
      phone_number: '0987654321',
      password: 'newpassword',
    };

    const response = await fakeRequest.put(`/user/${user._id}`).set(adminHeaders).send(userData);
    expect(response.status).toBe(500);

    userUpdateSpy.mockRestore();
  });

  it('should return 200 status code and delete the user', async () => {
    const user = await User.findOne({ email: 'updateduser@example.com' });
    const response = await fakeRequest.delete(`/user/${user._id}`).set(adminHeaders);
    expect(response.status).toBe(200);
  });

  it('should return 404 status code if user not found for delete', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await fakeRequest.delete(`/user/${nonExistentId}`).set(adminHeaders);
    expect(response.status).toBe(404);
  });

  it('should handle general error when deleting user', async () => {
    const userDeleteSpy = jest.spyOn(User, 'findByIdAndDelete').mockImplementationOnce(() => {
      throw new Error('General error');
    });

    let user = await User.findOne({ email: 'testuser@example.com' });
    if (!user) {
      const userData = {
        fullname: 'TEST USER',
        email: 'testuser@example.com',
        birthdate: '2000-01-01',
        phone_number: '0987654321',
        profile_picture: 'https://example.com/profile.jpg',
        password: await bcrypt.hash('password', 10),
        role: 'CREATOR'
      };
      user = new User(userData);
      await user.save();
    }

    const response = await fakeRequest.delete(`/user/${user._id}`).set(adminHeaders);
    expect(response.status).toBe(500);

    userDeleteSpy.mockRestore();
  });

  it('should return 200 status code and user subscriptions', async () => {
    const response = await fakeRequest.get('/user/subscriptions').set(adminHeaders);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('subscribedEvents');
  });

  it('should handle general error when fetching user subscriptions', async () => {
    const userFindByIdSpy = jest.spyOn(User, 'findById').mockImplementationOnce(() => {
      throw new Error('General error');
    });

    const response = await fakeRequest.get('/user/subscriptions').set(adminHeaders);
    expect(response.status).toBe(500);

    userFindByIdSpy.mockRestore();
  });
});
