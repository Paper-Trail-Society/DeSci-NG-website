import { Text } from "@/components/ui/text";
import type { Metadata } from "next";

type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalPageProps = {
  description: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  title: string;
};

export const buildLegalMetadata = (
  title: string,
  description: string
): Metadata => ({
  title: `Nubian | ${title}`,
  description,
});

export const LegalPage = ({
  title,
  description,
  lastUpdated,
  intro,
  sections,
}: LegalPageProps) => {
  return (
    <div className="items-center justify-items-center w-full pb-10">
      <section className="w-full max-w-3xl pt-10 md:pt-6">
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-8">
        <Text as="h2" className="text-2xl md:text-4xl leading-tight">
          {title}
        </Text>
        <Text size="sm" className="text-gray-500">
          {description}
        </Text>
        <Text size="sm" className="text-gray-500">
          Last updated: {lastUpdated}
        </Text>
        <Text className="text-base md:text-lg text-gray-700">{intro}</Text>
      </div>

      <div className="mt-8 flex flex-col gap-8">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-3">
            <Text as="h2" weight="semibold" className="text-lg md:text-xl">
              {section.title}
            </Text>
            <div className="flex flex-col gap-3">
              {section.paragraphs.map((paragraph) => (
                <Text key={paragraph} className="text-base leading-7 text-gray-700">
                  {paragraph}
                </Text>
              ))}
            </div>
          </div>
        ))}
      </div>
      </section>
    </div>
  );
};
