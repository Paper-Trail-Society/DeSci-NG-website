import ProgramsSidebar from "@/components/programs/programs-sidebar";
import Breadcrumb from "@/components/shared/breadcrumb";
import React from "react";

export const metadata = {
  title: "Programs — DeSci NG",
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
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
