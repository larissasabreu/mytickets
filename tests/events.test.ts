import app from "../src/index";
import supertest from "supertest"
import { createNewEventData } from "./factories/events-factory";
import prisma from "database";
import httpStatus from "http-status";

const api = supertest(app);

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
              name: expect.any(String),
              date: expect.any(String),
            }),
          ])
        );
      });
    });


// eventsRouter.get("/events/:id", getEvent);

describe("GET /events:id", () => {
  it("should return status 200 and an array", async () => {
      const event = await createNewEventData();

      const response = await api.get(`/events/${event.id}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: event.id,
          name: expect.any(String),
          date: expect.any(String),
        })
      );
    });
      it("should return 400", async () => {
        const response = await api.get("/events/-1");
    
        expect(response.status).toBe(400);
      });
    });

// eventsRouter.post("/events", validateSchema(eventSchema), postEvent);
// eventsRouter.put("/events/:id", validateSchema(eventSchema), putEvent);
// eventsRouter.delete("/events/:id", deleteEvent);