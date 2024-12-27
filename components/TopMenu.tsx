// "use client";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import Clocks from "@/components/Clocks";

export default function TopMenu() {
  return (
    <div className="top-menu d-flex align-items-center gap-1">
      <LocaleSwitcher />
      <Clocks />
    </div>
  );
}
