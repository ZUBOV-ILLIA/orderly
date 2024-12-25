"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function ArrivalsPage() {
  const t = useTranslations("HomePage");
  return (
    <div className="arrivals">
      <h1 className="p-5">{t("title")}</h1>

      <Link href="/" className="nav-link ">
        Home
      </Link>
    </div>
  );
}
