"use client";

import { useTranslations } from "next-intl";

export default function ProductsPage() {
  const t = useTranslations("HomePage");
  return (
    <div className="arrivals">
      <h1 className="p-5">{t("title")}</h1>
    </div>
  );
}
