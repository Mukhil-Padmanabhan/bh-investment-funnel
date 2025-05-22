"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";


const navLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Suggest", href: "/suggest" },
  { label: "Rejections", href: "/rejections" },
];

export function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const is_Admin = localStorage.getItem("is_admin");
    setIsAdmin(Boolean(JSON.parse(is_Admin ?? 'false')));
    const token = localStorage.getItem("token");
    setLoggedIn(Boolean(token))
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    setLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Berkshire Funnel</Link>

        <nav className="space-x-4 text-sm font-medium flex items-center">
          {isAdmin && (
            <Link
              href="/admin"
              className={clsx(
                "hover:underline transition-colors",
                pathname.startsWith("/admin")
                  ? "text-primary font-semibold underline"
                  : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
          )}
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "hover:underline transition-colors",
                pathname.startsWith(href)
                  ? "text-primary font-semibold underline"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </Link>
          ))}



          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline ml-2"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className={clsx(
                  "hover:underline",
                  pathname === "/login" ? "text-primary underline" : "text-muted-foreground"
                )}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={clsx(
                  "hover:underline",
                  pathname === "/register" ? "text-primary underline" : "text-muted-foreground"
                )}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
