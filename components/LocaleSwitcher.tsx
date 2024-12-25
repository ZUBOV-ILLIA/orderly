"use client";

import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  function onSelect(nextLocale: string) {
    if (nextLocale === locale) return;

    router.replace({ pathname }, { locale: nextLocale as Locale });
  }

  return (
    <div className="dropdown ">
      <button
        className="btn btn-primary dropdown-toggle w-100"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {locale}
      </button>
      <ul className="dropdown-menu w-100">
        {routing.locales.map((cur) => (
          <li
            key={cur}
            role="button"
            className={`dropdown-item ${cur === locale ? "active" : ""} text-center`}
            onClick={() => onSelect(cur)}
          >
            {cur}
          </li>
        ))}
      </ul>
    </div>
  );
}
