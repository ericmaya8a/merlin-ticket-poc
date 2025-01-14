import { constants } from "@/lib/constants";
import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { db } from "./db";

function getRandomParking(isExpress?: boolean) {
  const count = faker.number.int({ min: 1, max: 3 });
  const subtotal =
    count *
    (isExpress
      ? constants.parking.EXPRESS_PARKING
      : constants.parking.STANDARD_PARKING);
  return { count, subtotal };
}

function getRandomTickets() {
  const count = faker.number.int({ min: 1, max: 5 });
  const subtotal = count * constants.tickets.ONLINE_PRICE;
  const savings = count * constants.tickets.GATE_PRICE - subtotal;
  return {
    ticketsCount: count,
    ticketsSavings: savings,
    ticketsSubtotal: subtotal,
  };
}

function randomDate() {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  const date = faker.date.between({
    from: startDate,
    to: new Date(2025, 0, 31),
  });
  return date.toDateString();
}

function createBookingData() {
  const { count: expressCount, subtotal: expressSubtotal } =
    getRandomParking(true);
  const { count, subtotal } = getRandomParking();
  const { ticketsCount, ticketsSavings, ticketsSubtotal } = getRandomTickets();
  return db.booking.create({
    id: faker.string.uuid(),
    date: randomDate(),
    tickets: {
      count: ticketsCount,
      savings: ticketsSavings,
      subtotal: ticketsSubtotal,
    },
    parking: {
      express: {
        count: expressCount,
        subtotal: expressSubtotal,
      },
      standard: {
        count,
        subtotal,
      },
    },
  });
}

export const handlers = [
  http.get("http://localhost:3000/api/booking/:id", () => {
    const booking = createBookingData();

    return HttpResponse.json({ success: true, data: booking });
  }),
  http.post("http://localhost:3000/api/booking", () => {
    const newBooking = createBookingData();

    return HttpResponse.json(
      { success: true, data: newBooking },
      { status: 201 },
    );
  }),
];
