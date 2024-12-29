"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import "@/styles/_custom-select.scss";

export default function CustomSelect({ options }: { options: string[] }) {
  const t = useTranslations();

  const [selectedValue, setSelectedValue] = useState(t("all"));

  return (
    <div className="custom-select dropdown flex-grow-1 position-relative">
      <div
        className="custom-select__head py-1 px-3 flex-grow-1 border bg-white rounded-2 dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedValue}
      </div>

      <ul className="custom-select__menu dropdown-menu w-100 bg-white">
        <li
          className={`custom-select__item mb-2 ps-2 py-1 ${selectedValue === t("all") ? "bg-secondary text-white" : ""}`}
          onClick={() => setSelectedValue(t("all"))}
          role="button"
        >
          {t("all")}
        </li>

        {options.map((option) => (
          <li
            key={option}
            className={`custom-select__item mb-2 ps-2 py-1 ${selectedValue === option ? "bg-secondary text-white" : ""}`}
            onClick={() => setSelectedValue(option)}
            role="button"
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
