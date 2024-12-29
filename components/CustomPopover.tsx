"use client";

import React, { useState } from "react";
import ReactDOM from "react-dom";

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
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  function onMouseEnter(event: React.MouseEvent) {
    if (behaviour === "onHover") {
      const rect = event.currentTarget.getBoundingClientRect();

      setTooltipPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
      setIsVisible(true);
    }
  }

  function onMouseLeave() {
    if (behaviour === "onHover") {
      setIsVisible(false);
    }
  }

  return (
    <div
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isVisible &&
        content.length > maxLength &&
        tooltipPosition &&
        ReactDOM.createPortal(
          <div
            className="p-2 position-fixed z-3 bg-white border rounded-2 shadow animate__animated animate__fadeIn animate__faster"
            style={{
              maxWidth,
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              transform: "translateY(-100%)",
            }}
          >
            {content}
          </div>,
          document.body
        )}
      {children}
    </div>
  );
}
