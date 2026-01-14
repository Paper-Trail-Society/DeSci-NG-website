"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/lib/contexts/auth-context";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const navLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Upload paper", href: "/upload-paper" },
];

const PublicNav = () => {
  const { isAuthenticated } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <nav className="max-w-6xl mx-auto py-4 md:px-0 px-6 z-60">
      <div className="w-full md:px-2 md:mx-auto flex justify-between items-center">
        <span>
          <Link href="/">
            <Image
              src="/assets/nubian-logo.png"
              alt="logo"
              width={140}
              height={100}
            />
          </Link>
        </span>
        {/* Desktop nav */}
        <div className="hidden md:flex gap-4 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} prefetch={true}>
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
            <Link href="/login" prefetch={true}>
              <Button variant={"destructive"} className="px-4 rounded-md">
                LOGIN
              </Button>
            </Link>
          )}
        </div>
        {/* Mobile nav */}
        <div className="md:hidden flex gap-2 items-center">
          {isAuthenticated ? (
            <Link href="/dashboard/profile">
              <Button variant="destructive" className="w-full text-left">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button
                variant="destructive"
                className="w-full text-left justify-start rounded-md px-4"
              >
                LOGIN
              </Button>
            </Link>
          )}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                ref={toggleRef}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
                aria-label="Toggle menu"
              >
                <span className="relative block h-6 w-6">
                  <motion.span
                    key={menuOpen ? "x" : "hamburger"}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      rotate: menuOpen ? -90 : 90,
                    }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      rotate: menuOpen ? 90 : -90,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        rotate: menuOpen ? -90 : 90,
                      }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        rotate: menuOpen ? 90 : -90,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {menuOpen ? (
                        <ChevronDown className="h-6 w-6" />
                      ) : (
                        <ChevronUp className="h-6 w-6" />
                      )}
                    </motion.div>
                  </motion.span>
                </span>
              </button>
            </SheetTrigger>
            <SheetContent
              title="mobile-nav-menu"
              side="right"
              className="p-0 mt-18 w-64 bg-white border-black/30 border-t-1"
            >
              <div className="flex flex-col gap-4 mt-2 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      // Sheet will close automatically on navigation
                    }}
                  >
                    <Button
                      variant="link"
                      className="w-full text-left text-lg text-gray-800 justify-start"
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default PublicNav;
