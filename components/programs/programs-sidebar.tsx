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
              className={`text-left text-sm px-3 py-2 rounded-md transition-colors duration-150 ${
                isActive
                  ? "bg-secondary text-secondary-foreground font-bold"
                  : "hover:bg-secondary/30 text-secondary-foreground"
              }`}
            >
              {tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>

      <div className="md:hidden">
        <TabsList className="flex space-x-3 overflow-auto">
          {TABS.map((tab) => {
            const isActive = tab.value === active;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`px-3 py-2 rounded-md transition-colors duration-150 ${
                  isActive
                  ? "bg-secondary text-secondary-foreground font-bold"
                  : "hover:bg-secondary/30 text-secondary-foreground"
                }`}
              >
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
    </Tabs>
  );
}
