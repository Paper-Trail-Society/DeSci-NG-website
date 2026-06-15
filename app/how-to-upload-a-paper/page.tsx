import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import YouTubeEmbed from "@/components/shared/youtube-embed";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Nubian | How to Upload Your Paper",
  description: "Learn how to upload your paper on Nubian Research in simple steps.",
};

const steps = [
  {
    number: "1",
    paragraphs: [
      "Create a free account or log in. You will need a valid email address.",
      "If you have an institution affiliated email address, we encourage you to sign up with it!",
    ],
  },
  {
    number: "2",
    paragraphs: [
      "Prepare your Paper in a PDF. Include necessary preliminaries such as title, author(s), institution(s), and an abstract.",
    ],
  },
  {
    number: "3",
    paragraphs: [
      "To upload your paper, click “Upload New Paper” on your dashboard, fill in the fields, add your PDF (drag and drop or select a file), and click “Upload Paper” for review.",
    ],
  },
  {
    number: "4",
    paragraphs: [
      "All papers go through a credibility test by the Nubian Research team. You’ll be notified by email when your paper is approved and uploaded. If changes are required, you will get a feedback and can re-upload easily.",
    ],
  },
  {
    number: "5",
    paragraphs: [
      "Once approved, your paper is made publicly available through a dedicated link. You can use this link to make your work accessible to others.",
    ],
  },
] as const;

const StepCard = ({
  number,
  paragraphs,
}: {
  number: string;
  paragraphs: readonly string[];
}) => {
  return (
    <Card className="w-full border-secondary-7 bg-secondary/50 py-2 shadow-none">
      <CardContent className="my-1 flex flex-wrap gap-3 md:my-4 md:flex-nowrap md:items-start md:gap-5">
        <div className="relative h-14 w-14 shrink-0 rounded-full bg-white text-center shadow-sm md:h-12 md:w-12">
          <Text
            size={"2xl"}
            weight={"bold"}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {number}
          </Text>
        </div>
        <CardDescription className="w-full space-y-3 md:w-auto">
          {paragraphs.map((paragraph) => (
            <Text key={`${number}-${paragraph}`} size={"sm"} className="text-text">
              {paragraph}
            </Text>
          ))}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

const DesktopIntro = () => {
  return (
    <div className="hidden lg:block lg:pr-4">
      <div className="sticky top-24 space-y-5 rounded-2xl border border-secondary-7 bg-secondary/20 p-6">
        <Text as="h2" weight={"bold"} className="text-3xl leading-9">
          How to Upload Your Paper
        </Text>
        <Text className="text-base leading-7 text-text-dim">
          A simple step-by-step guide to how to upload your paper on Nubian
          Research.
        </Text>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center rounded-xl bg-white px-4 py-3 text-center">
            <Text
              size="xs"
              weight="medium"
              className="uppercase tracking-[0.18em] text-text-dim"
            >
              Format
            </Text>
            <Text className="mt-2 text-sm leading-6 text-text">PDF</Text>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-white px-4 py-3 text-center">
            <Text
              size="xs"
              weight="medium"
              className="uppercase tracking-[0.18em] text-text-dim"
            >
              Steps
            </Text>
            <Text className="mt-2 text-sm leading-6 text-text">5</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileIntro = () => {
  return (
    <div className="lg:hidden">
      <Text as="h2" weight={"bold"} size={"xl"} className="text-center">
        How to Upload Your Paper
      </Text>
    </div>
  );
};

const StepsSection = () => {
  return (
    <section className="flex flex-col gap-3">
      {steps.map((step) => (
        <StepCard
          key={step.number}
          number={step.number}
          paragraphs={step.paragraphs}
        />
      ))}

      <div className="mt-4 w-full">
        <YouTubeEmbed videoId="tBn0yliF4Lg" title="Upload process video" />
      </div>
    </section>
  );
};

const Page = () => {
  return (
    <div className="py-10">
      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 lg:px-6">
        <DesktopIntro />

        <div className="mx-auto w-full max-w-3xl lg:mx-0 lg:max-w-2xl">
          <MobileIntro />
          <div className="mt-4 lg:mt-0">
            <StepsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
