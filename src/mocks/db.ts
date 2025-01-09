import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  user: {
    id: primaryKey(String),
    firstName: String,
    lastName: String,
  },
});
