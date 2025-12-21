import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "../ui/button";
import Image from "next/image";

interface ProgramCardProps {
  title: string;
  image: string;
  description: string;
  link: string;
}

export default function ProgramCard({
  title,
  image,
  description,
  link,
}: ProgramCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <div className="w-full relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="object-cover w-full transition-transform duration-200 hover:scale-105"
        />
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>

        <Text size={'sm'} className="text-gray-700 mb-4 flex-1">{description}</Text>

        <div className="mt-auto">
          <Button
            variant={"link"}
            className="px-0"
          >
            <Link href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Recorded here
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
