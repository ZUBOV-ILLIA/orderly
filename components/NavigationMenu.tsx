"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ArrowRightCircleFill, GearFill } from "react-bootstrap-icons";
import "@/styles/_navigation-menu.scss";
import { useState } from "react";

export default function NavigationMenu() {
  const pathname = usePathname();
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { label: t("orders"), href: "/orders" },
    { label: t("groups"), href: "/groups" },
    { label: t("products"), href: "/products" },
    { label: t("customers"), href: "/customers" },
    { label: t("settings"), href: "/settings" },
  ];

  return (
    <div className="nav-menu flex-grow-1">
      <div
        className="nav-menu__burger-btn mt-1 py-3 ps-4 pe-3 position-fixed top-0 rounded-end-5 border border-black bg-white shadow-lg z-2 animate__animated animate__backInLeft"
        role="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ArrowRightCircleFill
          size={24}
          className={`nav-menu__burger-icon  ${isOpen ? "nav-menu__burger-icon--open" : ""}  text-success `}
        />
      </div>
      <div
        className={`nav-menu__wrap ${isOpen ? "" : "nav-menu__wrap--closed"} h-100 d-flex flex-column align-items-center bg-white shadow-lg z-1`}
      >
        <div className="nav-menu__img-wrap my-5 position-relative d-flex align-items-center justify-content-center rounded-circle animate__animated animate__zoomIn">
          <Image
            src="/images/avatar.jpg"
            height={96}
            width={96}
            className="rounded-circle"
            alt="user avatar"
          />
          <div
            className="nav-menu__setting-btn position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center rounded-circle bg-white shadow-sm"
            role="button"
          >
            <GearFill size={14} />
          </div>
        </div>

        <ul className="nav-menu__list d-flex flex-column align-items-center gap-3 text-uppercase list-unstyled">
          {menuItems.map((item) => (
            <li key={item.label} className="nav-menu__item text-center">
              <Link
                href={item.href}
                className={`nav-menu__link d-flex justify-content-center py-2 animate__animated ${pathname === item.href ? "nav-menu__link--active animate__rubberBand" : "animate__zoomIn"}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
