import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import "animate.css";

import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";
import AddBootstrap from "@/AddBootstrap";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import StoreProvider from "@/redux/StoreProvider";

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
        <StoreProvider>
          <AddBootstrap />
          <body className="min-vh-100 d-flex flex-column align-items-start">
            <Header />
            <div className="w-100 d-flex flex-grow-1">{children}</div>
            <ToastContainer />
          </body>
        </StoreProvider>
      </NextIntlClientProvider>
    </html>
  );
}
