import prisma from "../../src/database";
import { faker } from '@faker-js/faker';
import { CreateEventData } from "repositories/events-repository";

// type CreateEventData = {
//     name: string;
//     date: Date;
// }

export function createNewEventBody(): CreateEventData {
    return {
        name: faker.word.noun(),
        date: faker.date.future()
    }
}

export function createNewEventPastBody(): CreateEventData {
  return {
      name: faker.word.noun(),
      date: faker.date.past()
  }
}

export async function createNewEventPastData() {
  const {name, date} = createNewEventPastBody();

  return prisma.event.create({
    data: {
      name,
      date
    },
  });
}

export async function createNewEventData() {
  const {name, date} = createNewEventBody();

  return prisma.event.create({
    data: {
      name,
      date
    },
  });
}