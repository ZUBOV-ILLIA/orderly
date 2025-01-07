"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  ArrowRightCircleFill,
  GearFill,
  PersonCircle,
} from "react-bootstrap-icons";
import "@/styles/_navigation-menu.scss";
import React, { useEffect, useState } from "react";
import { getProfileInfo } from "@/api/apiUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/strore";
import { setUserInfo } from "@/redux/slices/userSlice";

export default function NavigationMenu() {
  const pathname = usePathname();
  const t = useTranslations();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userSlice);

  const menuItems = [
    { label: t("orders"), href: "/orders", disabled: false },
    { label: t("groups"), href: "/groups", disabled: true },
    { label: t("products"), href: "/products", disabled: false },
    { label: t("customers"), href: "/customers", disabled: true },
    { label: t("settings"), href: "/settings", disabled: true },
  ];

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    async function getInfo() {
      try {
        // cookies customUserId
        const userId = document.cookie
          .split("; ")
          .find((row) => row.startsWith("customUserId="))
          ?.split("=")[1];

        const res = await getProfileInfo(userId ? userId : "");

        dispatch(setUserInfo(res));
      } catch (e) {
        console.error(e);
      }
    }

    getInfo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="nav-menu">
      <div
        className="nav-menu__burger-btn shadow-lg animate__animated animate__backInLeft"
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
        <div className="nav-menu__img-wrap animate__animated animate__zoomIn">
          {userInfo.avatar ? (
            <Image
              src={userInfo.avatar}
              className="rounded-circle"
              alt="user avatar"
              height={96}
              width={96}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <PersonCircle size={96} className="flex-shrink-0 text-secondary" />
          )}
          <Link
            href="/profile"
            className={`nav-menu__setting-btn shadow-sm ${pathname === "/profile" ? "bg-success" : "bg-white animate__rubberBand"} animate__animated`}
            role="button"
          >
            <GearFill size={14} />
          </Link>
        </div>

        <ul className="nav-menu__list">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.disabled ? (
                <span className="py-2 text-secondary fw-lighter animate__animated animate__zoomIn">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`nav-menu__link animate__animated ${pathname === item.href ? "nav-menu__link--active animate__rubberBand" : "animate__zoomIn"}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
