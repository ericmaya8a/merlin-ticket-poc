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
  http.get("http://localhost:3001/theme/chessington.json", () => {
    return HttpResponse.json({
      "--core-primary-1": "#FF5733",
      "--core-primary-2": "#C70039",
      "--core-secondary-1": "#FFC300",
      "--core-secondary-2": "#DAF7A6",
      "--core-secondary-dark-1": "#900C3F",
      "--core-secondary-dark-2": "#581845",
      "--core-secondary-3": "#FFC300",
      "--core-secondary-4": "#FF5733",
      "--core-secondary-dark-3": "#C70039",
      "--core-secondary-dark-4": "#900C3F",
      "--background": "0 0% 100%",
      "--foreground": "240 10% 3.9%",
      "--card": "0 0% 100%",
      "--card-foreground": "240 10% 3.9%",
      "--popover": "0 0% 100%",
      "--popover-foreground": "240 10% 3.9%",
      "--primary": "240 5.9% 10%",
      "--primary-foreground": "0 0% 98%",
      "--secondary": "240 4.8% 95.9%",
      "--secondary-foreground": "240 5.9% 10%",
      "--muted": "240 4.8% 95.9%",
      "--muted-foreground": "240 3.8% 46.1%",
      "--accent": "240 4.8% 95.9%",
      "--accent-foreground": "240 5.9% 10%",
      "--destructive": "0 84.2% 60.2%",
      "--destructive-foreground": "0 0% 98%",
      "--border": "240 5.9% 90%",
      "--input": "240 5.9% 90%",
      "--ring": "240 10% 3.9%",
      "--chart-1": "12 76% 61%",
      "--chart-2": "173 58% 39%",
      "--chart-3": "197 37% 24%",
      "--chart-4": "43 74% 66%",
      "--chart-5": "27 87% 67%",
      "--radius": "0.5rem",
    });
  }),
  http.get("http://localhost:3001/translations/en.json", () => {
    return HttpResponse.json({});
  }),
  http.get("http://localhost:3001/api/calendarDay", () => {
    const rawData = db.calendarDay.getAll();
    return HttpResponse.json(rawData);
  }),
];
