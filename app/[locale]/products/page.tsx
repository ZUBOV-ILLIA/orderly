"use client";

import { useTranslations } from "next-intl";
// import { Link } from "@/i18n/routing";

export default function ProductsPage() {
  const t = useTranslations("NavMenu");

  return (
    <div className="arrivals">
      <h1 className="p-5 fw-bolder">{t("products")}</h1>
    </div>
  );
}
