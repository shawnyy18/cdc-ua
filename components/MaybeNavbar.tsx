"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function MaybeNavbar() {
  const pathname = usePathname() || "/";

  // Pages where we don't want the global Navbar to appear
  const excluded = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/auth",
    "/auth/callback",
    "/admin",
  ];

  const hide = excluded.some((p) => pathname === p || (p !== "/" && pathname.startsWith(p)));

  if (hide) return null;
  return <Navbar />;
}
