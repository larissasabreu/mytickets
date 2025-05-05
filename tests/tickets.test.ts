import app from "../src/index";
import supertest from "supertest"
import { createNewTicketData } from "./factories/tickets-factory";
import { createNewEventData } from "./factories/events-factory";
import prisma from "database";
import { faker } from '@faker-js/faker';
import httpStatus from "http-status";
import { findTicketByCodeForEvent } from "repositories/tickets-repository";


const api = supertest(app);

afterEach(async () => {
    await prisma.event.deleteMany();    
})

//ticketsRouter.get("/tickets/:eventId", getEventTickets);

describe("GET /tickets/:eventId", () => {
  it("should return status 200 and an array", async () => {
      const ticket = await createNewTicketData();

      const response = await api.get(`/tickets/${ticket.eventId}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              owner: expect.any(String),
              code: expect.any(String),
              eventId: ticket.eventId
            }),
          ])
        );
      });
        it("should return 400", async () => {
            const response = await api.get("/tickets/-1");
        
            expect(response.status).toBe(400);
        });
        });

        

//ticketsRouter.post("/tickets", validateSchema(ticketSchema), postTicket);

describe("POST /tickets", () => {
    it("should return status 200 and an array", async () => {
        const event = await createNewEventData();

        const newTicket = {
           owner: faker.person.fullName(),
           code: faker.string.alpha(),
           eventId: event.id
        };
  
        const response = await api.post("/tickets").send(newTicket);
        const result = await findTicketByCodeForEvent(event.id, newTicket.code)
    
        expect(response.status).toBe(201);
  
        expect(result).toEqual(
          expect.objectContaining({
            owner: newTicket.owner,
            code: newTicket.code,
            eventId: event.id
          })
        );
      });
      });

//ticketsRouter.put("/tickets/use/:id", putTicket);

describe("PUT /tickets/use/:id", () => {
    it("should return status 200 and an array", async () => {
        const event = await createNewEventData();
        const ticket = await createNewTicketData();

        const response = await api.put(`/tickets/use/${ticket.id}`);
    
        expect(response.status).toBe(204);

        });
      });