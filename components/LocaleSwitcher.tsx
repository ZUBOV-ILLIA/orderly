"use client";

import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Translate } from "react-bootstrap-icons";
import "@/styles/_locale-switcher.scss";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("");

  function onSelect(nextLocale: string) {
    if (nextLocale === locale) return;

    router.replace({ pathname }, { locale: nextLocale as Locale });
  }

  return (
    <div className="locale-switcher dropdown">
      <div
        className="p-1 rounded-3 dropdown-toggle animate__animated animate__rubberBand"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {/*{locale}*/}
        <Translate size={24} />
      </div>

      <ul className="dropdown-menu w-100">
        {routing.locales.map((cur) => (
          <li
            key={cur}
            role="button"
            className={`dropdown-item ${cur === locale ? "bg-success text-white" : ""} text-uppercase text-center`}
            onClick={() => onSelect(cur)}
          >
            {t(cur)}
          </li>
        ))}
      </ul>
    </div>
  );
}
