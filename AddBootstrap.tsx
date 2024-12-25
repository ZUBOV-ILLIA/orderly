"use client";

import { useEffect } from "react";

declare module "bootstrap/dist/js/bootstrap.bundle.js";

export default function AddBootstrap() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);
  return <></>;
}
