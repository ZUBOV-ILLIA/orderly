import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import "animate.css";

import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";
import AddBootstrap from "@/AddBootstrap";
import Header from "@/components/Header/Header";
import NavigationMenu from "@/components/NavigationMenu";

export const metadata: Metadata = {
  title: "Orderly",
  description: "Manage your business",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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
        <body className="min-vh-100 d-flex flex-column">
          <Header />
          <div className="d-flex flex-grow-1">
            <NavigationMenu />
            {children}
          </div>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
