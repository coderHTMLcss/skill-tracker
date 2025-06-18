"use client";

import { useEffect } from "react";

export function MSWInit() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      import("@/shared/api/mocks/browser").then(({ worker }) => {
        worker.start();
      });
    }
  }, []);

  return null;
}
