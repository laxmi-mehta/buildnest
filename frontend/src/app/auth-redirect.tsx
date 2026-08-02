"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS } from "@/lib/constants";

export function AuthRedirect() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEYS.authToken)) {
      router.push("/dashboard");
    }
  }, [router]);
  return null;
}
