import type { Metadata } from "next";
import DialoguesSection from "@/components/programs/dialogues-section";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Nubian Research | Dialogues",
  description:
    "Explore Dialogues, Nubian Research's conversations and community sessions across research, ideas, and emerging questions.",
};

export default function DialoguesPage() {
  return (
    <main className="max-w-6xl mx-auto py-8">
      <Text as="h2" className="text-2xl font-bold mb-6">Dialogues</Text>
      <DialoguesSection />
    </main>
  );
}
