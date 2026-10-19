import YouTubeEmbed from "@/components/shared/youtube-embed";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Text } from "@/components/ui/text";
import { getPressEntry, pressEntries } from "../press-entries";
import type { PressBodyContent } from "../press-entries";

type Props = {
  params: {
    slug: string;
  };
};

const PressBodyParagraph = ({ content }: { content: PressBodyContent }) => {
  if (typeof content === "string") {
    return content;
  }

  return content.segments.map((segment, index) => {
    const key = `${segment.text}-${index}`;

    if (segment.href) {
      const isExternal = segment.href.startsWith("http");

      return (
        <Link
          key={key}
          href={segment.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="underline underline-offset-4 transition-colors hover:text-primary"
        >
          {segment.text}
        </Link>
      );
    }

    if (segment.emphasis) {
      return <em key={key}>{segment.text}</em>;
    }

    return segment.text;
  });
};

export function generateStaticParams() {
  return pressEntries.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getPressEntry(params.slug);

  if (!entry) {
    return {
      title: "Nubian | Press",
      description: "Read the latest announcements and press updates from Nubian.",
    };
  }

  return {
    title: `Nubian | ${entry.title}`,
    description: entry.summary,
  };
}

const PressEntryPage = ({ params }: Props) => {
  const entry = getPressEntry(params.slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="items-center justify-items-center pb-10 w-full">
      <article className="w-full max-w-3xl pt-10 space-y-8">
        <Link
          href="/press"
          className="inline-block text-sm text-primary transition-colors hover:underline"
        >
          Back to Press
        </Link>

        <div className="space-y-5 border-b border-gray-200 pb-8">
          <div className="flex flex-col gap-2">
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
            className="text-xl md:text-3xl leading-7 md:leading-9"
          >
            {entry.title}
          </Text>
          <Text className="text-base md:text-lg text-text-dim">
            {entry.summary}
          </Text>
        </div>

        <div className="space-y-6">
          {entry.body.map((paragraph, index) => (
            <Text
              key={`${entry.slug}-${index}`}
              className="text-base md:text-lg leading-7 md:leading-8 text-gray-700"
            >
              <PressBodyParagraph content={paragraph} />
            </Text>
          ))}
          {entry.cta ? (
            <Text className="text-base md:text-lg leading-7 md:leading-8 text-gray-700">
              {entry.cta.before}
              <Link
                href={entry.cta.readMoreHref}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 transition-colors hover:text-primary"
              >
                {entry.cta.readMoreLabel}
              </Link>
              {entry.cta.middle}
              <Link
                href={entry.cta.formHref}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 transition-colors hover:text-primary"
              >
                {entry.cta.formLabel}
              </Link>
              {entry.cta.after}
            </Text>
          ) : null}
          {entry.video?.videoId ? (
            <div className="pt-2">
              <YouTubeEmbed
                videoId={entry.video.videoId}
                title={entry.video.title}
              />
            </div>
          ) : null}
        </div>
      </article>
    </div>
  );
};

export default PressEntryPage;
