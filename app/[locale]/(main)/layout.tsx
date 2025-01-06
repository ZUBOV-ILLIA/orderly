import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Locale, routing } from "@/i18n/routing";
import "animate.css";

import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";
import AddBootstrap from "@/AddBootstrap";
import Header from "@/components/Header";
import NavigationMenu from "@/components/NavigationMenu";
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
  const cookieStore = await cookies();

  // In case if locale not found, go to main
  if (!routing.locales.includes(locale as Locale)) {
    console.log("Locale not found");
    redirect("/");
  }

  if (!cookieStore.get("customJWT")) {
    redirect(`/${locale}/login`);
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <StoreProvider>
          <AddBootstrap />
          <body className="min-vh-100 d-flex flex-column align-items-start">
            <Header isUserAuth />
            <div className="w-100 d-flex flex-grow-1">
              <NavigationMenu />
              {children}
            </div>
            <ToastContainer />
          </body>
        </StoreProvider>
      </NextIntlClientProvider>
    </html>
  );
}
