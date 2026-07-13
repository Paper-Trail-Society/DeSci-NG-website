import type { Metadata } from "next";
import ProjectShowcaseSection from "@/components/programs/project-showcase-section";

export const metadata: Metadata = {
  title: "Nubian Research | Project Showcase",
  description:
    "Discover Project Showcase, where Nubian Research highlights emerging researchers and the projects they are building.",
};

export default function ProjectShowcasePage() {
  return (
    <main className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Project Showcase</h1>
      <ProjectShowcaseSection />
    </main>
  );
}
