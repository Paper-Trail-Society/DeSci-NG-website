import ProgramsSidebar from "@/components/programs/programs-sidebar";
import Breadcrumb from "@/components/shared/breadcrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Nubian | Programs",
  description: "Explore programs offered by Nubian to support African research and researchers.",
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
            <Breadcrumb
              links={[
                { label: "Home", href: "/" },
                { label: "Programs", href: "/programs" },
              ]}
            />
          </div>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
