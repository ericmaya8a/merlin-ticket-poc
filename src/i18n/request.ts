import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale;
  }

  const messages = await fetch(
    "http://localhost:3001/translations/" + locale + ".json"
  );

  return {
    locale,
    messages: await messages.json(),
    timeZone: "UTC",
  };
});
