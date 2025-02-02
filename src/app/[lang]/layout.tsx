import { server } from "@/mocks/node";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTheme } from "@/services/theme";
import { Theme } from "@/components/ui/theme";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Merlin Ticket PoC",
    template: "%s | Merlin Ticket",
  },
  description: "Ticket flow PoC",
};

const tenant = process.env.TENANT_ID;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string; lang: string }>;
}>) {
  server.listen();
  const messages = await getMessages();

  const { lang } = await params;

  if (!routing.locales.includes(lang as never)) {
    notFound();
  }

  const theme = await getTheme(tenant);

  return (
    <html lang={lang}>
      <head>
        <Theme theme={theme} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <main className="min-h-screen font-[family-name:var(--font-geist-sans)]">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
