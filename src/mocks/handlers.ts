import { constants } from "@/lib/constants";
import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { db } from "./db";
import { format } from "date-fns";

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
    to: new Date(2025, 9, 20),
  });
  return format(date, "EEEE dd LLL yyyy");
}

export const handlers = [
  http.get("http://localhost:3000/api/booking/:id", (req) => {
    const id = req.params.id as string;
    const booking = db.booking.findFirst({ where: { id: { equals: id } } });

    return HttpResponse.json({ success: true, data: booking });
  }),
  http.post("http://localhost:3000/api/booking", () => {
    const { count, subtotal } = getRandomParking();
    const { ticketsCount, ticketsSavings, ticketsSubtotal } =
      getRandomTickets();
    const newBooking = db.booking.create({
      id: faker.string.uuid(),
      date: randomDate(),
      tickets: {
        count: ticketsCount,
        savings: ticketsSavings,
        subtotal: ticketsSubtotal,
      },
      parking: {
        express: {
          count,
          subtotal,
        },
        standard: {
          count,
          subtotal,
        },
      },
    });

    return HttpResponse.json(
      { success: true, data: newBooking },
      { status: 201 },
    );
  }),
];
