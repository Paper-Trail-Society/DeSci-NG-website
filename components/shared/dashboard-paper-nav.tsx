"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils/css";

const dashboardPaperNavItems = [
  {
    href: "/dashboard/profile",
    label: "Your Profile",
  },
  {
    href: "/upload-paper",
    label: "Upload New Paper",
  },
  {
    href: "/dashboard/manage-papers",
    label: "Manage Papers",
  },
];

export default function DashboardPaperNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Dashboard paper navigation"
      className="overflow-x-auto rounded-2xl border border-[#f3dede] bg-[#fff7f6] p-2"
    >
      <div className="flex min-w-max items-center gap-2">
        {dashboardPaperNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "rounded-xl px-4 py-2.5 text-sm font-medium transition-colors md:text-[15px]",
                isActive
                  ? "border border-[#ebd4d4] bg-white text-text shadow-sm"
                  : "text-text-muted hover:bg-white/70 hover:text-text",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
