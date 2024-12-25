import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import AddBootstrap from "@/AddBootstrap";
import LocaleSwitcher from "@/components/LocaleSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orderly",
  description: "Manage your business",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  // In case if locale not found, go to main
  if (!routing.locales.includes(locale as Locale)) {
    redirect("/");
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <AddBootstrap />
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <LocaleSwitcher />

          {children}
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
