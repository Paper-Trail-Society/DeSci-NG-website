import DialoguesSection from "@/components/programs/dialogues-section";
import { Text } from "@/components/ui/text";

export default function DialoguesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Text as="h2" className="text-2xl font-bold mb-6">Dialogues</Text>
      <DialoguesSection />
    </main>
  );
}
