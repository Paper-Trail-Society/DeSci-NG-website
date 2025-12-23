"use client";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/contexts/auth-context";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Upload paper", href: "/upload-paper" },
];

const PublicNav = () => {
  const { isAuthenticated } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    function onDocumentClick(e: MouseEvent) {
      const target = e.target as Node;
      if (!menuOpen) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", onDocumentClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // control mount state so we can animate close
  useEffect(() => {
    let t: number | undefined;
    if (menuOpen) {
      setShowMenu(true);
    } else {
      // wait for animation then unmount
      t = window.setTimeout(() => setShowMenu(false), 220);
    }

    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [menuOpen]);

  return (
    <nav className="max-w-6xl mx-auto py-4 md:px-0 px-6">
      <div className="w-full md:px-2 md:mx-auto flex justify-between items-center">
        <span>
          <Link href="/">
            <Image
              src="/assets/desci-ng-logo.png"
              alt="logo"
              width={102}
              height={100}
            />
          </Link>
        </span>
        {/* Desktop nav */}
        <div className="hidden md:flex gap-4 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={"link"}
                style={{
                  backgroundImage:
                    "linear-gradient(to right, transparent, currentColor)",
                  backgroundSize: "0% 1px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left bottom",
                  transitionProperty: "background-size",
                  transitionDuration: "150ms",
                }}
                onMouseEnter={(event) => {
                  const button = event.currentTarget as HTMLButtonElement;
                  button.style.backgroundSize = "100% 1px";
                }}
                onMouseLeave={(event) => {
                  const button = event.currentTarget as HTMLButtonElement;
                  button.style.backgroundSize = "0% 1px";
                }}
              >
                {link.label}
              </Button>
            </Link>
          ))}
          {isAuthenticated ? (
            <Link href="/dashboard/profile">
              <Button variant={"destructive"} className="px-4">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant={"destructive"} className="px-4">
                LOGIN
              </Button>
            </Link>
          )}
        </div>
        {/* Mobile nav */}
        <div className="md:hidden flex items-center">
          <button
            ref={toggleRef}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            aria-label="Toggle menu"
            onClick={() => {
              if (!menuOpen) {
                setShowMenu(true);
                setMenuOpen(true);
              } else {
                setMenuOpen(false);
              }
            }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu dropdown */}
      {showMenu && (
        <div
          className={`w-full md:hidden pb-4 transition-all duration-200 ${
            menuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div
            ref={menuRef}
            className="w-full flex flex-col gap-2 mt-2 bg-secondary p-3 rounded transform-gpu"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                <Button
                  variant="link"
                  className="w-full text-left"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Button>
              </Link>
            ))}

            {isAuthenticated ? (
              <Link
                href="/dashboard/profile"
                onClick={() => setMenuOpen(false)}
              >
                <Button
                  variant="destructive"
                  className="w-full text-left"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="destructive"
                  className="w-full text-left"
                  onClick={() => setMenuOpen(false)}
                >
                  LOGIN
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNav;
