"use client";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/contexts/auth-context";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

const navLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Upload paper", href: "/upload-paper" },
];

const PublicNav = () => {
  const { isAuthenticated } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="w-full 2xl:p-container-md pt-10 sm:pt-4">
      <div className="w-full md:w-[70%] px-4 md:px-2 md:mx-auto flex justify-between items-center">
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
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
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
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-2 mt-2">
            <Link href="/programs">
              <Button variant="link" className="w-full text-left">
                Programs
              </Button>
            </Link>
            <Link href="/upload-paper">
              <Button variant="link" className="w-full text-left">
                Upload paper
              </Button>
            </Link>
            {isAuthenticated ? (
              <Link href="/dashboard/profile">
                <Button variant="destructive" className="w-full text-left">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="destructive" className="w-full text-left">
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
