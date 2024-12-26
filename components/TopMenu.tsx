// "use client";

import LocaleSwitcher from "@/components/LocaleSwitcher";
// import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";

export default function TopMenu() {
  return (
    <div className="top-menu d-flex gap-2">
      <LocaleSwitcher />
      <div className="border border-4">clocks</div>
    </div>
  );
}
