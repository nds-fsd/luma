require('dotenv').config();
const supertest = require('supertest');
const { bootstrapApp } = require('../bootstrap');
const app = bootstrapApp();
const fakeRequest = supertest(app);
const mongoose = require('mongoose');
const { disconnectDB, connectDB } = require('../mongoose');
const City = require('../models/cityModel');
const User = require('../models/userModel');
const { generateJWT } = require('../services/auth.service');

jest.setTimeout(30000); // 30 segundos de tiempo de espera

let adminUser;
let adminHeaders;
let city;

beforeAll(async () => {
  await connectDB();

  adminUser = await User.findOne({ role: 'ADMIN' });
  expect(adminUser).toBeDefined();
  expect(adminUser.email).toBe('admin@fakeluma.com');
  adminHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + generateJWT(adminUser)
  };

  city = new City({
    cityName: 'Test City',
    cityLogo: 'https://example.com/logo.jpg',
    cityWallpaper: 'https://example.com/wallpaper.jpg'
  });
  await city.save();
});

afterAll(async () => {
  await City.deleteMany({});
  await disconnectDB();
  console.log('Disconnected from test database!');
});

describe('City Controller TEST', () => {

  describe('GET /city', () => {
    it('should return 200 status code and a list of cities', async () => {
      const response = await fakeRequest.get('/city').set(adminHeaders);
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].cityName).toBe('Test City');
    });
  });

  describe('GET /city/:id', () => {
    it('should return 200 status code and the correct city', async () => {
      const response = await fakeRequest.get(`/city/${city._id}`).set(adminHeaders);
      expect(response.status).toBe(200);
      expect(response.body.cityName).toBe('Test City');
    });

    it('should return 404 status code for non-existent city', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await fakeRequest.get(`/city/${nonExistentId}`).set(adminHeaders);
      expect(response.status).toBe(404);
    });
  });

  describe('POST /city', () => {
    it('should return 201 status code and create a new city', async () => {
      const cityData = {
        cityName: 'New City',
        cityLogo: 'https://example.com/logo.jpg',
        cityWallpaper: 'https://example.com/wallpaper.jpg'
      };
      const response = await fakeRequest.post('/city').set(adminHeaders).send(cityData);
      expect(response.status).toBe(201);
      expect(response.body.cityName).toBe('New City');
    });

    it('should return 400 status code for invalid data', async () => {
      const invalidCityData = { cityName: '' };
      const response = await fakeRequest.post('/city').set(adminHeaders).send(invalidCityData);
      expect(response.status).toBe(400);
    });
  });

  describe('PUT /city/:id', () => {
    it('should return 200 status code and update the city', async () => {
      const cityData = {
        cityName: 'Updated City',
        cityLogo: 'https://example.com/updatedlogo.jpg',
        cityWallpaper: 'https://example.com/updatedwallpaper.jpg'
      };
      const response = await fakeRequest.put(`/city/${city._id}`).set(adminHeaders).send(cityData);
      expect(response.status).toBe(200);
      expect(response.body.cityName).toBe('Updated City');
    });

    it('should return 404 status code for non-existent city', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const cityData = {
        cityName: 'Updated City',
        cityLogo: 'https://example.com/updatedlogo.jpg',
        cityWallpaper: 'https://example.com/updatedwallpaper.jpg'
      };
      const response = await fakeRequest.put(`/city/${nonExistentId}`).set(adminHeaders).send(cityData);
      expect(response.status).toBe(404);
    });

    it('should return 400 status code for invalid data', async () => {
      const invalidCityData = { cityName: '' };
      const response = await fakeRequest.put(`/city/${city._id}`).set(adminHeaders).send(invalidCityData);
      expect(response.status).toBe(400);
    });
  });

  describe('PATCH /city/:id', () => {
    it('should return 200 status code and patch the city', async () => {
      const cityData = {
        cityName: 'Patched City',
        cityLogo: city.cityLogo, // Ensure all required fields are included
        cityWallpaper: city.cityWallpaper // Ensure all required fields are included
      };
      const response = await fakeRequest.patch(`/city/${city._id}`).set(adminHeaders).send(cityData);
      console.log("Response body PATCH:", response.body); // Log response body for debugging
      expect(response.status).toBe(200);
      expect(response.body.cityName).toBe('Patched City');
    });

    it('should return 400 status code for invalid patch data', async () => {
      const invalidCityData = { invalidField: 'Invalid' };
      const response = await fakeRequest.patch(`/city/${city._id}`).set(adminHeaders).send(invalidCityData);
      expect(response.status).toBe(400);
    });

    it('should return 404 status code for non-existent city', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const cityData = {
        cityName: 'Patched City',
        cityLogo: city.cityLogo, // Ensure all required fields are included
        cityWallpaper: city.cityWallpaper // Ensure all required fields are included
      };
      const response = await fakeRequest.patch(`/city/${nonExistentId}`).set(adminHeaders).send(cityData);
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /city/:id', () => {
    it('should return 200 status code and delete the city', async () => {
      const response = await fakeRequest.delete(`/city/${city._id}`).set(adminHeaders);
      expect(response.status).toBe(200);
    });

    it('should return 404 status code for non-existent city', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await fakeRequest.delete(`/city/${nonExistentId}`).set(adminHeaders);
      expect(response.status).toBe(404);
    });
  });

});
