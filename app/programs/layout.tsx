import ProgramsSidebar from "@/components/programs/programs-sidebar";
import ProgramsBreadcrumb from "@/components/programs/programs-breadcrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Nubian Research | Programs",
  description:
    "Explore Nubian Research programs that support open scholarship, research collaboration, and scholarly contributions across disciplines.",
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="md:flex md:gap-8">
        <aside className="flex flex-col md:w-56 mb-6 md:mb-0 md:gap-17">
          <div></div>
          <ProgramsSidebar />
        </aside>
        <main className="flex-1 pb-24 md:pb-0">
          <div className="mb-4">
            <ProgramsBreadcrumb />
          </div>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
