import { faker } from "@faker-js/faker";
import { factory, primaryKey } from "@mswjs/data";
import { addDays, endOfYear, format, startOfYear } from "date-fns";

export const db = factory({
  user: {
    id: primaryKey(String),
    firstName: String,
    lastName: String,
  },
  booking: {
    id: primaryKey(String),
    date: String,
    tickets: {
      count: Number,
      subtotal: Number,
      savings: Number,
    },
    parking: {
      express: {
        count: Number,
        subtotal: Number,
      },
      standard: {
        count: Number,
        subtotal: Number,
      },
    },
  },
  calendarDay: {
    id: primaryKey(() => faker.string.uuid()),
    date: () =>
      format(
        faker.date.between({ from: "2025-01-01", to: "2025-12-31" }),
        "yyyy-MM-dd",
      ),
    price: () => faker.number.int({ min: 20, max: 50 }),
    closed: () => Math.random() < 0.1,
    lowestPrice: () => false as boolean,
  },
});

export const seedMockData = async () => {
  const startDate = startOfYear(new Date());
  const endDate = endOfYear(new Date());
  const numberOfDays =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  const data = Array.from({ length: numberOfDays }, (_, i) => {
    const currentDate = format(addDays(startDate, i), "yyyy-MM-dd");
    const isClosed = Math.random() < 0.1;
    return db.calendarDay.create({
      date: currentDate,
      price: faker.number.int({ min: 20, max: 50 }),
      closed: isClosed,
      lowestPrice: false,
    });
  });

  const nonClosedDays = data.filter((day) => !day.closed);
  if (nonClosedDays.length > 0) {
    const lowestPriceDay = nonClosedDays.reduce((lowest, current) =>
      current.price < lowest.price ? current : lowest,
    );
    lowestPriceDay.lowestPrice = true;
  }
};

await seedMockData();
