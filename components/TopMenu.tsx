// "use client";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import Clocks from "@/components/Clocks";
import CurrentlyOnline from "@/components/CurrentlyOnline";

export default function TopMenu({ isUserAuth }: { isUserAuth: boolean }) {
  console.log("isUserAuth", isUserAuth);
  return (
    <div className="top-menu d-flex align-items-center gap-2">
      <LocaleSwitcher />

      {/* {isUserAuth && <CurrentlyOnline />} */}
      <CurrentlyOnline />

      <Clocks />
    </div>
  );
}
