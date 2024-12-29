"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Clock } from "react-bootstrap-icons";

export default function Clocks() {
  const locale = useLocale();

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer); // Очищаем таймер при размонтировании
  }, []);

  const formatDate = (
    date: Date,
    type:
      | "dayName"
      | "monthName"
      | "dayNumber"
      | "yearNumber"
      | "hours"
      | "minutes" = "minutes",
    length: "short" | "long" = "short"
  ): string => {
    switch (type) {
      case "dayName":
        return new Intl.DateTimeFormat(locale, {
          weekday: length,
        }).format(date);

      case "monthName":
        return new Intl.DateTimeFormat(locale, {
          month: length,
        }).format(date);

      case "dayNumber":
        return String(date.getDate());

      case "yearNumber":
        return String(date.getFullYear());

      case "hours":
        return String(date.getHours()).padStart(2, "0");

      default:
        return String(date.getMinutes()).padStart(2, "0");
    }
  };

  return (
    <div className="clocks">
      <div className="d-flex align-items-center justify-content-between text-capitalize">
        {formatDate(currentDate, "dayName", "long")}
      </div>
      <div className="d-flex align-items-center gap-1">
        <span>{formatDate(currentDate, "dayNumber")}</span>
        <span className="text-capitalize">
          {formatDate(currentDate, "monthName").slice(0, 3)},
        </span>
        <span className="me-2">{formatDate(currentDate, "yearNumber")}</span>

        <Clock size={13} className="text-success fw-bolder" />

        <div>
          <span>{formatDate(currentDate, "hours")}</span>
          <span className="animate__animated animate__flash animate__infinite animate__slower">
            :
          </span>
          <span>{formatDate(currentDate, "minutes")}</span>
        </div>
      </div>
    </div>
  );
}
