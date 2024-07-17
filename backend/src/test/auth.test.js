require('dotenv').config();
const supertest = require("supertest");
const { bootstrapApp } = require("../bootstrap");
const app = bootstrapApp();
const fakeRequest = supertest(app);
const User = require("../models/userModel");
const { generateJWT } = require('../services/auth.service');
const { disconnectDB, connectDB } = require('../mongoose');

jest.setTimeout(30000);

let adminUser;
let adminHeaders;

beforeAll(async () => {
  await connectDB();

  adminUser = await User.findOne({ role: 'ADMIN' });
  expect(adminUser).toBeDefined();
  adminHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + generateJWT(adminUser),
  };
  console.log('ADMIN CREADO', adminUser);
});

afterAll(async () => {
  await disconnectDB();
  console.log('Disconnected from test database!');
});

describe('User Login', () => {
  const validUserData = {
    email: 'admin@fakeluma.com',
    password: '123456789',
  };

  const invalidEmailData = {
    email: 'notexist@fakeluma.com',
    password: '123456789',
  };

  const invalidPasswordData = {
    email: 'admin@fakeluma.com',
    password: 'wrongpassword',
  };

  it('should let the user login with valid email and password', async () => {
    const response = await fakeRequest.post('/auth/login').send(validUserData);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe(validUserData.email);
  });

  it('should not let the user login with invalid email', async () => {
    const response = await fakeRequest.post('/auth/login').send(invalidEmailData);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid email or phone number');
  });

  it('should not let the user login with invalid password', async () => {
    const response = await fakeRequest.post('/auth/login').send(invalidPasswordData);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid password!');
  });

  it('should return 400 if no email or phone number is provided', async () => {
    const response = await fakeRequest.post('/auth/login').send({ password: '123456789' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('You must provide an email or phone number');
  });
});
