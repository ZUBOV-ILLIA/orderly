"use client";

import { useTranslations } from "next-intl";
// import { Link } from "@/i18n/routing";

export default function GroupsPage() {
  const t = useTranslations();

  return (
    <div className="flex-grow-1">
      <div className="my-5 mx-4 mx-md-5 d-md-flex align-items-center">
        <h2 className="mb-3 me-4 mb-md-0 fw-bolder text-nowrap animate__animated animate__backInLeft animate__faster">
          {t("groups")}
        </h2>
      </div>
    </div>
  );
}
