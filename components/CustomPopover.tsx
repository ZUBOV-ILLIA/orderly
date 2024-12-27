"use client";

import React, { useState } from "react";

export default function CustomPopover({
  content,
  children,
  className = "",
  maxWidth = "400px",
  maxLength = 100,
  behaviour = "onHover",
}: {
  content: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  maxLength?: number;
  behaviour?: "onHover" | "onClick";
}) {
  const [isVisible, setIsVisible] = useState(false);

  function onMouseEnter() {
    if (behaviour === "onHover") {
      setIsVisible(true);
    }
  }

  function onMouseLeave() {
    if (behaviour === "onHover") {
      setIsVisible(false);
    }
  }

  function onClick() {
    if (behaviour === "onClick") {
      setIsVisible(!isVisible);
    }
  }

  return (
    <div
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="position-relative">
        {isVisible && content.length > maxLength && (
          <div
            className="p-2 position-absolute bottom-100 z-3 bg-white border rounded-2 shadow animate__animated animate__fadeIn animate__faster"
            style={{
              maxWidth,
            }}
          >
            {content}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
