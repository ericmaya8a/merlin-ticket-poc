import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { db } from "./db";

export const handlers = [
  http.get("http://localhost:3000/api/user", () => {
    const newUser = db.user.create({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });

    return HttpResponse.json({ newUser }, { status: 200 });
  }),
];
