import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import Image from "next/image";
import ProgramCardLink from "./program-card-link";
import ProgramPlatformLinks, {
  ProgramPlatformLink,
} from "./program-platform-links";

interface ProgramCardProps {
  title: string;
  image: string;
  description: string;
  link?: string;
  linkLabel?: string;
  platformLinks?: ProgramPlatformLink[];
}

export default function ProgramCard({
  title,
  image,
  description,
  link,
  linkLabel,
  platformLinks = [],
}: ProgramCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <div className="w-full relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={600}
          height={600}
          className="object-cover w-full transition-transform duration-200 hover:scale-105"
        />
      </div>

      <CardContent className="p-3 flex-1 flex flex-col">
        <CardHeader className="p-0 mb-1.5">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-lg">{title}</CardTitle>
            <ProgramPlatformLinks links={platformLinks} />
          </div>
        </CardHeader>

        <Text size={"sm"} className="text-gray-700 mb-2.5">
          {description}
        </Text>

        {platformLinks.length === 0 && link && linkLabel ? (
          <ProgramCardLink href={link} label={linkLabel} />
        ) : null}
      </CardContent>
    </Card>
  );
}
