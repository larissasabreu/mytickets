import app from "../src/index";
import supertest from "supertest"
import { createNewEventData } from "./factories/events-factory";
import prisma from "database";
import httpStatus from "http-status";
import { faker } from '@faker-js/faker';
import { findEventById, findEventByName } from "repositories/events-repository";

const api = supertest(app);

beforeEach(async () => {
  await prisma.event.deleteMany();
})

afterEach(async () => {
await prisma.event.deleteMany();    
})

// eventsRouter.get("/events", getEvents);

describe("GET /events", () => {
    it("should return status 200 and an array", async () => {
      const event = await createNewEventData();

      const response = await api.get("/events");
    
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: event.id,
              name: event.name,
              date: expect.any(String),
            }),
          ])
        );
      });
    });


// eventsRouter.get("/events/:id", getEvent);

describe("GET /events/:id", () => {
  it("should return status 200 and an array", async () => {
      const event = await createNewEventData();

      const response = await api.get(`/events/${event.id}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: event.id,
          name: event.name,
          date: expect.any(String),
        })
      );
    });

    // GET errors
    it("should return 400", async () => {
      const response = await api.get("/events/-1");
  
      expect(response.status).toBe(400);
    });
    it("should return 404", async () => {
      const response = await api.get("/events/1111111");
  
      expect(response.status).toBe(404);
    });
    it("should return 400", async () => {
      const response = await api.get("/events/dejnkdjw");
  
      expect(response.status).toBe(400);
    });
    });

// eventsRouter.post("/events", validateSchema(eventSchema), postEvent);
describe("POST /events", () => {
  it("should return status 201 and an array", async () => {
      const newEvent = {
        name: faker.word.noun(),
        date: faker.date.future()
      };

      const response = await api.post("/events").send(newEvent);
      const result = await findEventByName(newEvent.name)
  
      expect(response.status).toBe(201);

      expect(result).toEqual(
        expect.objectContaining({
          id: result.id,
          name: newEvent.name,
          date: newEvent.date
        })
      );
    }) 
      it("should return 409", async () => {
        const event =  {
          name: faker.word.noun(),
          date: faker.date.future()
        }
 
        const response = await api.post("/events").send(event);
        const response2 = await api.post("/events").send(event);

        expect(response2.status).toBe(409);
      });;
    });

// eventsRouter.put("/events/:id", validateSchema(eventSchema), putEvent);
describe("PUT /events/:id", () => {
  it("should return status 200 and an array", async () => {
      const event = await createNewEventData();

      const editEvent = {
        name: faker.word.noun(),
        date: faker.date.future()
      };

      const response = await api.put(`/events/${event.id}`).send(editEvent);
      const result = await findEventById(event.id)
  
      expect(response.status).toBe(200);

      expect(result).toEqual(
        expect.objectContaining({
          id: event.id,
          name: editEvent.name,
          date: editEvent.date
        })
      );
    });

    // PUT errors
    it("should return 422", async () => {
      const response = await api.put("/events/-1");
  
      expect(response.status).toBe(422);
    });
    it("should return 422", async () => {
      const response = await api.put("/events/1111111");
  
      expect(response.status).toBe(422);
    });
    it("should return 422", async () => {
      const response = await api.put("/events/dejnkdjw");
  
      expect(response.status).toBe(422);
    });
    });

// eventsRouter.delete("/events/:id", deleteEvent);
describe("DELETE /events/:id", () => {
  it("should return status 204 and an array", async () => {
      const event = await createNewEventData();

      const response = await api.delete(`/events/${event.id}`);
      const result = await findEventById(event.id)
  
      expect(response.status).toBe(204);

      expect(result).toBeNull();
    });

    // DELETE errors
      it("should return 400", async () => {
        const response = await api.delete("/events/-1");
    
        expect(response.status).toBe(400);
      });
      it("should return 404", async () => {
        const response = await api.delete("/events/1111111");
    
        expect(response.status).toBe(404);
      });
      it("should return 400", async () => {
        const response = await api.delete("/events/dejnkdjw");
    
        expect(response.status).toBe(400);
      });
    });