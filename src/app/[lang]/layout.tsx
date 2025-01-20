import { server } from "@/mocks/node";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTheme } from "@/services/theme";
import { Theme } from "@/components/ui/theme";

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

  const { locale, lang } = await params;

  if (routing.locales.includes(lang as never)) {
    notFound();
  }

  const theme = await getTheme(tenant);

  return (
    <html lang={locale}>
      <head>
        <Theme theme={theme} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="min-h-screen font-[family-name:var(--font-geist-sans)]">
          {children}
        </main>
      </body>
    </html>
  );
}
