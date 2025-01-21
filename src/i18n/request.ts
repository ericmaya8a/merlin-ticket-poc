import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const cmsUrl = process.env.CMS_URL;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale;
  }

  const messages = await fetch(cmsUrl + "/translations/" + locale + ".json");

  return {
    locale,
    messages: await messages.json(),
    timeZone: "UTC",
  };
});
