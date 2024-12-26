"use client";

import { useTranslations } from "next-intl";
// import { Link } from "@/i18n/routing";

export default function CustomersPage() {
  const t = useTranslations("NavMenu");

  return (
    <div className="arrivals">
      <h1 className="p-5 fw-bolder">{t("customers")}</h1>
    </div>
  );
}
