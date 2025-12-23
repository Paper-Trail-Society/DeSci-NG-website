"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const TABS = [
  { label: "Dialogues", value: "dialogues", href: "/programs/dialogues" },
  {
    label: "Project Showcase",
    value: "project-showcase",
    href: "/programs/project-showcase",
  },
  {
    label: "The Research Jam",
    value: "research-jam",
    href: "/programs/research-jam",
  },
];

export default function ProgramsSidebar() {
  const router = useRouter();
  const pathname = usePathname() || "";

  const active =
    TABS.find((tab) => pathname.endsWith(tab.value))?.value || "dialogues";

  const handleChange = (value: string) => {
    const tab = TABS.find((t) => t.value === value);
    if (tab) router.push(tab.href);
  };

  const renderIcon = (value: string) => {
    switch (value) {
      case "dialogues":
        return (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 1v11" />
            <path d="M8 5v7a4 4 0 0 0 8 0V5" />
            <path d="M19 11a7 7 0 0 1-14 0" />
          </svg>
        );
      case "project-showcase":
        return (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M20 21V11a2 2 0 0 0-2-2h-4V5l-6 6v8" />
            <rect x="2" y="13" width="7" height="8" rx="2" />
          </svg>
        );
      case "research-jam":
        return (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M8 2h8l-1.5 6H9.5L8 2z" />
            <path d="M7 8h10l-1 9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2l-1-9z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Tabs
      value={active}
      onValueChange={handleChange}
      orientation="vertical"
      className=""
    >
      {/* Desktop vertical list, mobile will render as a horizontal row via responsive classes */}
      <TabsList className="hidden md:flex flex-col space-y-2">
        {TABS.map((tab) => {
          const isActive = tab.value === active;
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`flex items-center gap-2 text-left text-sm px-3 py-2 rounded-md transition-colors duration-150 ${
                isActive
                  ? "bg-secondary text-secondary-foreground font-bold"
                  : "hover:bg-secondary/30 text-secondary-foreground"
              }`}
            >
              {renderIcon(tab.value)}
              <span>{tab.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {/* Mobile: fixed bottom navigation */}
      <div className="md:hidden">
        <div
          className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-md"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 1rem)" }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <TabsList className="flex justify-between">
              {TABS.map((tab) => {
                const isActive = tab.value === active;

                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`flex-1 flex flex-col items-center justify-center px-3 py-3 transition-colors duration-150 ${
                      isActive
                        ? "bg-secondary text-secondary-foreground font-bold rounded-t-md"
                        : "hover:bg-secondary/30 text-secondary-foreground"
                    }`}
                  >
                    <div className="mb-1">{renderIcon(tab.value)}</div>
                    <span className="text-xs">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </div>
      </div>
    </Tabs>
  );
}
