import type { Metadata } from "next";
import ResearchJamSection from "@/components/programs/research-jam-section";

export const metadata: Metadata = {
  title: "Nubian Research | Research Jam",
  description:
    "Learn about Research Jam, Nubian Research's program for collaborative inquiry, experimentation, and shared research momentum.",
};

export default function ResearchJamPage() {
  return (
    <main className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">The Research Jam</h1>
      <ResearchJamSection />
    </main>
  );
}
