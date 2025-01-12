import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  user: {
    id: primaryKey(String),
    firstName: String,
    lastName: String,
  },
  booking: {
    id: primaryKey(String),
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
});
