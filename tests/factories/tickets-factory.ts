import prisma from "../../src/database";
import { faker } from '@faker-js/faker';
import { createNewEventData } from "./events-factory";

// type CreateTicketData = {
//     owner: string;
//     code: string;
//     eventId: number;
// }

export async function createNewTicketData() {
    const event = await createNewEventData();

    const ticket = await prisma.ticket.create({
        data: {
            owner: faker.person.fullName(),
            code: faker.string.alpha(),
            eventId: event.id
        }
    })

    return ticket
}