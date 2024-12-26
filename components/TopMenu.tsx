// "use client";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import Clocks from "@/components/Clocks";
// import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";

export default function TopMenu() {
  return (
    <div className="top-menu d-flex align-items-center gap-3">
      <LocaleSwitcher />

      <Clocks />
    </div>
  );
}
