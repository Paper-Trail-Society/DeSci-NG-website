"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "../ui/text";

interface BreadcrumbProps {
  links: { label: string; href: string }[];
}

export default function Breadcrumb({ links }: BreadcrumbProps) {
  const pathname = usePathname() || "";
  const mobileLinks = links.length > 2 ? links.slice(-2) : links;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="hidden items-center space-x-1 text-sm md:flex">
        {links.map((link, idx) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href} className="flex items-center">
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`transition-colors duration-200 hover:underline ${
                  isActive
                    ? "font-semibold text-gray-900"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
              {idx < links.length - 1 && (
                <Text as={"span"} className="mx-2 px-0 text-gray-400">/</Text>
              )}
            </li>
          );
        })}
      </ol>

      <ol className="flex items-center overflow-x-auto whitespace-nowrap text-sm md:hidden">
        {mobileLinks.map((link, idx) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href} className="flex items-center">
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 transition-colors duration-200 hover:underline ${
                  isActive
                    ? "font-semibold text-gray-900"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
              {idx < mobileLinks.length - 1 && (
                <Text as={"span"} className="mx-2 px-0 text-gray-400">
                  /
                </Text>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
