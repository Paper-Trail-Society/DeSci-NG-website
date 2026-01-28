"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/lib/contexts/auth-context";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/css";

const navLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Upload paper", href: "/upload-paper" },
  { label: "Donate", href: "/donate" },
];

const mobileNavContainerAnimation = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

const mobileNavItemAnimation = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0 },
};

const programSubRoutes = [
  { label: "Dialogues", href: "/programs/dialogues" },
  { label: "Research Jam", href: "/programs/research-jam" },
  { label: "Project showcase", href: "/programs/project-showcase" },
];

const PublicNav = () => {
  const { isAuthenticated } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const currentPath = usePathname();

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
          {navLinks.map((link) => {
            const navLinksHref = navLinks.map((link) => link.href);
            const currentPathIsInNavLinks = navLinksHref.some((href) =>
              currentPath.includes(href),
            );
            const endGradient = currentPath.includes(link.href)
              ? "currentColor"
              : currentPathIsInNavLinks
                ? "var(--secondary)"
                : "currentColor";

            if (link.href === "/programs") {
              const isActivePrograms = currentPath.startsWith("/programs");

              return (
                <Dropdown
                  key={link.href}
                  open={programsOpen}
                  onOpenChange={setProgramsOpen}
                >
                  <div
                    onMouseEnter={() => setProgramsOpen(true)}
                    onMouseLeave={() => setProgramsOpen(false)}
                  >
                    <Dropdown.Trigger asChild noClassName={true}>
                      <Button
                        variant="link"
                        style={{
                          backgroundImage: `linear-gradient(to right, transparent, ${
                            isActivePrograms ? "currentColor" : endGradient
                          })`,
                          backgroundSize: isActivePrograms
                            ? "100% 1px"
                            : "0% 1px",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "left bottom",
                          transitionProperty: "background-size",
                          transitionDuration: "150ms",
                        }}
                        className="flex items-center gap-1 text-sm"
                      >
                        <Link href="/programs">{link.label}</Link>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content className="mt-1 min-w-40 bg-white border border-secondary-7 rounded-md shadow-sm">
                      {programSubRoutes.map((sub) => (
                        <Dropdown.Item
                          key={sub.href}
                          asChild
                          className={
                            cn('hover:bg-secondary/60!', currentPath.startsWith(sub.href)
                              ? "bg-secondary text-text font-medium"
                              : "text-text")
                          }
                        >
                          <Link href={sub.href}>{sub.label}</Link>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Content>
                  </div>
                </Dropdown>
              );
            }

            return (
              <Link key={link.href} href={link.href} prefetch={true}>
                <Button
                  variant={"link"}
                  style={{
                    backgroundImage: `linear-gradient(to right, transparent, ${endGradient})`,
                    backgroundSize: currentPath.includes(link.href)
                      ? "100% 1px"
                      : "0% 1px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left bottom",
                    transitionProperty: "background-size",
                    transitionDuration: "150ms",
                  }}
                  onMouseEnter={(event) => {
                    if (currentPath.includes(link.href)) return;
                    const button = event.currentTarget as HTMLButtonElement;
                    button.style.backgroundSize = "100% 1px";
                  }}
                  onMouseLeave={(event) => {
                    if (currentPath.includes(link.href)) return;
                    const button = event.currentTarget as HTMLButtonElement;
                    button.style.backgroundSize = "0% 1px";
                  }}
                >
                  {link.label}
                </Button>
              </Link>
            );
          })}
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
              className="p-0 mt-18 w-64 bg-white border-black/30 border-t"
            >
              <motion.div
                className="flex flex-col gap-4 mt-2 p-4"
                variants={mobileNavContainerAnimation}
                initial="hidden"
                animate={menuOpen ? "visible" : "hidden"}
              >
                {navLinks.map((link) => {
                  if (link.href === "/programs") {
                    return (
                      <motion.div
                        key={link.href}
                        variants={mobileNavItemAnimation}
                        className="flex flex-col gap-2"
                      >
                        <span className="text-sm font-medium text-text">
                          {link.label}
                        </span>
                        <div className="flex flex-col gap-1 pl-3">
                          <Link
                            className="w-full text-left text-base text-text"
                            href="/programs"
                            onClick={() => setMenuOpen(false)}
                          >
                            All programs
                          </Link>
                          {programSubRoutes.map((sub) => (
                            <Link
                              key={sub.href}
                              className="w-full text-left text-base text-text-dim"
                              href={sub.href}
                              onClick={() => setMenuOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={link.href}
                      variants={mobileNavItemAnimation}
                    >
                      <Link
                        className="w-full text-left text-lg text-text"
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default PublicNav;
