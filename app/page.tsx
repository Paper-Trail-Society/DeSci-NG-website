import PaperSearchInput from "@/components/shared/paper-search-input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

// add 4 categories with name, tagline, and image URL. Categories - Applied science, arts & humanities, blockchain technology, medical science

const categories = [
  {
    name: "Applied Science",
    tagline: "Discover papers in Biology, Chemistry, and more",
    imageUrl: "/assets/applied-science.png",
  },
  {
    name: "Arts & Humanities",
    tagline: "Discover papers in Literature, Performing Arts, and more",
    imageUrl: "/assets/art-and-humanities.png",
  },
  {
    name: "Blockchain Technology",
    tagline: "Discover papers in Distributed Ledger, Crypto, and more",
    imageUrl: "/assets/blockchain-tech.jpg",
  },
  {
    name: "Medical Science",
    tagline: "Discover papers in Cardiology, Anatomy, and more",
    imageUrl: "/assets/medical-science.png",
  },
];

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen">
      <main className="flex flex-col items-center pb-20 w-full">
        <section className="md:w-2/5 w-full mx-auto my-10 space-y-6 px-8">
          <Text
            weight={"bold"}
            className="text-center leading-6 text-3xl font-semibold"
          >
            EXPLORE ACADEMIC PAPERS ACROSS DISCIPLINES
          </Text>

          <PaperSearchInput />
        </section>
        <section className="w-full">
          <div className="flex flex-wrap gap-4 items-center justify-center mx-auto">
            {categories.map((category) => {
              return (
                <Card
                  key={crypto.randomUUID()}
                  className="justify-center border-none shadow-none flex flex-col gap-2 md:w-1/6 w-[18em]"
                >
                  <CardHeader className="h-1/3 w-fit">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      width={250}
                      height={205}
                      className="object-cover"
                    />
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <CardTitle>{category.name.toUpperCase()}</CardTitle>
                    <CardDescription>
                      <Text
                        size={"xs"}
                        variant={"secondary"}
                        className="text-wrap"
                      >
                        {category.tagline}
                      </Text>
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button variant={"destructive"} className="mt-10">
              EXPLORE MORE PAPERS
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
