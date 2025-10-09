"use client";

import { useEffect } from "react";

export default function DeprecatedMyOrdersRedirect() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace("/orders/user");
    }
  }, []);
  return null;
}
