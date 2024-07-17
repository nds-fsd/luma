require('dotenv').config();
const supertest = require('supertest');
const { bootstrapApp } = require('../bootstrap');
const app = bootstrapApp();
const fakeRequest = supertest(app);
const mongoose = require('mongoose');
const { disconnectDB, connectDB } = require('../mongoose');
const Event = require('../models/eventModel');
const User = require('../models/userModel');
const { generateJWT } = require('../services/auth.service');

jest.setTimeout(30000);

const setUpData = async () => {
  const event = new Event({
    owner: new mongoose.Types.ObjectId(),
    eventLocation: new mongoose.Types.ObjectId(),
    creationDate: '2024-06-15',
    eventDate: '2024-06-16',
    eventDescription: "Descripción del Evento 1",
    eventTitle: "Evento 1",
    eventPrice: 50,
    eventStartTime: "10:00 AM",
    eventEndTime: "12:00 PM",
    eventCapacity: 100,
    eventPicture: "https://example.com/imagen1.jpg",
    subscriptionCount: 10,
  });
  await event.save();
  return event;
};

let event;

beforeAll(async () => {
  await connectDB();
  event = await setUpData();
  console.log(event);
});

afterAll(async () => {
  await disconnectDB();
  console.log("Disconnected DB from events.test.js!");
});

let adminUser;
let adminHeaders;

it('ADMIN user exists', async () => {
  adminUser = await User.findOne({ role: 'ADMIN' });
  expect(adminUser).toBeDefined();
  expect(adminUser.email).toBe('admin@fakeluma.com');
  adminHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + generateJWT(adminUser)
  };
  console.log("ADMIN CREADO FRANK", adminUser);
  console.log("HEADERS CREADO FRANK", adminHeaders);
});

describe("Event Controller TEST", () => {

  describe("GET /events", () => {
    it("should return 200 status code", async () => {
      const response = await fakeRequest.get("/events");
      expect(response.status).toBe(200);
    });
  
    it("should return a list of events", async () => {
      const response = await fakeRequest.get("/events");
      expect(response.body).toHaveLength(1);
    });
  });

  describe("POST /events", () => {
    it("should return 200 status code when we save a new Event", async () => {
      if (!adminHeaders) {
          throw new Error('adminHeaders is not defined');
      }
      const eventData = {
        owner: adminUser._id,
        eventLocation: new mongoose.Types.ObjectId(),
        creationDate: '2024-06-15',
        eventDate: '2024-06-16',
        eventDescription: "Descripción del Evento 2",
        eventTitle: "Evento 2",
        eventPrice: 60,
        eventStartTime: "11:00 AM",
        eventEndTime: "01:00 PM",
        eventCapacity: 200,
        eventPicture: "https://example.com/imagen2.jpg",
      };
      console.log("Data being sent:", eventData);
      const response = await fakeRequest.post("/events").set(adminHeaders).send(eventData);
      console.log("Response body:", response.body);
      expect(response.status).toBe(200);
    });
  });

  describe("POST /events/:eventId/subscribe", () => {
    it("should return 200 status code when subscribing to an Event", async () => {
      const eventId = event._id;
      const response = await fakeRequest.post(`/events/${eventId}/subscribe`).set(adminHeaders);
      expect(response.status).toBe(200);
      const updatedEvent = await Event.findById(eventId);
      expect(updatedEvent.subscriptionCount).toBe(event.subscriptionCount + 1);
    });
  });

  describe("POST /events/:eventId/unsubscribe", () => {
    it("should return 200 status code when unsubscribing from an Event", async () => {
      const eventId = event._id;
      await fakeRequest.post(`/events/${eventId}/subscribe`).set(adminHeaders);
      const response = await fakeRequest.post(`/events/${eventId}/unsubscribe`).set(adminHeaders);
      expect(response.status).toBe(200);
      const updatedEvent = await Event.findById(eventId);
      expect(updatedEvent.subscriptionCount).toBe(event.subscriptionCount);
    });
  });

});
