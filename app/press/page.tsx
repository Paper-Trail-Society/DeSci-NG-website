import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { pressEntries } from "./press-entries";

export const metadata: Metadata = {
  title: "Nubian | Press",
  description: "Read the latest announcements and press updates from Nubian.",
};

const PressPage = () => {
  return (
    <div className="items-center justify-items-center pb-10 w-full">
      <section className="flex flex-col gap-8 md:gap-12 pt-10 w-full">
        <div className="max-w-3xl space-y-4">
          <Text
            as="h2"
            weight="bold"
            className="text-xl md:text-3xl leading-7 md:leading-9"
          >
            Press
          </Text>
          <Text className="text-base md:text-lg text-text-dim">
            Updates, announcements, and milestones from Nubian Research.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pressEntries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/press/${entry.slug}`}
              className="block h-full"
            >
                <Card className="h-full border-secondary-7 bg-secondary/10 transition-shadow duration-200 hover:shadow-md">
                  <CardContent className="pt-6 flex h-full flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Text
                      size="xs"
                      weight="medium"
                      className="uppercase tracking-[0.2em] text-text-dim"
                    >
                      {entry.label}
                    </Text>
                    {entry.date ? (
                      <Text size="sm" className="text-text-dim">
                        {entry.date}
                      </Text>
                    ) : null}
                  </div>
                  <Text
                    as="h2"
                    weight="bold"
                    className="text-lg md:text-xl leading-7"
                  >
                    {entry.title}
                  </Text>
                  <Text className="text-sm md:text-base text-text-dim">
                    {entry.summary}
                  </Text>
                  <Text
                    size="sm"
                    weight="medium"
                    className="mt-auto text-primary"
                  >
                    Read release
                  </Text>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PressPage;
