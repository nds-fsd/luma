const supertest = require("supertest");
const { bootstrapApp } = require("../bootstrap");
const app = bootstrapApp();
const fakeRequest = supertest(app);
const mongoose = require('mongoose');
const { disconnectDB, connectDB } = require("../mongoose");
const Event = require("../models/eventModel");
const User = require('../controllers/userController');
const { generateJWT } = require('../services/auth.service');



const setUpData = async () => {
  const event = await Event.create([
    {
      owner: new mongoose.Types.ObjectId(),
      eventLocation: new mongoose.Types.ObjectId(),
      creationDate: new Date(),
      eventDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      eventDescription: "Descripción del Evento 1",
      eventTitle: "Evento 1",
      eventPrice: 50,
      eventStartTime: "10:00 AM",
      eventEndTime: "12:00 PM",
      eventCapacity: 100,
      eventPicture: "imagen1.jpg",
      subscriptionCount: 10,
    },
  ]);
  return event;
}

let event;

beforeAll(async () => {
  await connectDB();
  event = await setUpData();
  console.log(event);
});

afterAll(async () => {
  await disconnectDB();
  console.log("Disconnected from test database!");
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
    }
    console.log("ADMIN CREADO", adminUser);
})

describe("Event Controller TEST", () => {

  describe("GET /events", () => {
    it("should return 200 status code", async () => {
      const response = await fakeRequest.get("/events");
      expect(response.status).toBe(200);
    });
  
    it("should return a list of events", async () => {
      const response = await fakeRequest.get("/events");
      expect(response.body).toHaveLength(1)
    }
    )
  
    describe("POST /event", () => {
      it("should return 200 status code when we save a new Event", async () => {
        const response = await fakeRequest.post("/events").set(adminHeaders).send(event)
        expect(response.status).toBe(200)
      })
    })

  })
})

