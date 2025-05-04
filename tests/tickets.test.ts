import app from "../src/index";
import supertest from "supertest"
import { createNewTicketData } from "./factories/tickets-factory";
import { createNewEventData } from "./factories/events-factory";
import prisma from "database";
import httpStatus from "http-status";


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
            const response = await api.get("/events/-1");
        
            expect(response.status).toBe(400);
        });
        });

        

//ticketsRouter.post("/tickets", validateSchema(ticketSchema), postTicket);
//ticketsRouter.put("/tickets/use/:id", putTicket);