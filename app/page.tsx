import PaperSearchInput from "@/components/shared/paper-search-input";
import PublicNav from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export const metadata = {
  title: "DeSci NG | Decentralized Science Nigeria",
};

const initiatives = [
  {
    title: "Project Showcase",
    description: "We support research endeavours across Africa. 10 researchers were supported in v1, v2 is currently ongong.",
    imageUrl: "/assets/psv2.jpeg", 
    link: "https://x.com/DeSci_NG/status/1935309068463141225",
  },
  {
    title: "The Research Jam",
    description: "A symposium for researchers, research institutes, and stakeholders to discuss innovation. Piloted in July 2025, more to come.",
    imageUrl: "/assets/trj1.jpeg", 
    link: "https://x.com/DeSci_NG/status/1944805322830303672",
  },
];

const categories = [
  {
    name: "Applied Science",
    tagline: "Discover papers in Biology, Chemistry, and more",
    query: "science",
    imageUrl: "/assets/applied-science.png",
  },
  {
    name: "Arts & Humanities",
    query: "arts",
    tagline: "Discover papers in Literature, Performing Arts, and more",
    imageUrl: "/assets/art-and-humanities.png",
  },
  {
    name: "Blockchain Technology",
    query: "blockchain",
    tagline: "Discover papers in Distributed Ledger, Crypto, and more",
    imageUrl: "/assets/blockchain-tech.png",
  },
  {
    name: "Medical Science",
    query: "medicine",
    tagline: "Discover papers in Cardiology, Anatomy, and more",
    imageUrl: "/assets/medical-science.png",
  },
];

export default function Home() {
  return (
    <div>
      <PublicNav />

      <div className="items-center justify-items-center min-h-screen">
        <main className="flex flex-col items-center w-full md:py-24 pb-16">
          <section className="lg:w-2/5 md:w-3/5 w-full mx-auto my-10 space-y-6 px-8">
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
                    className="justify-center border-none shadow-none flex flex-col gap-2 lg:w-1/6 md:w-2/5 w-[18em]"
                  >
                    <Link href={`/search?query=${category.query}`}>
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
                    </Link>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-center">
              <Button variant={"destructive"} className="mt-10">
                <Link href="/search">EXPLORE MORE PAPERS</Link>
              </Button>
            </div>
          </section>

          <section className="lg:w-2/5 md:w-3/5 w-full mx-auto my-10 space-y-6 px-8">
                        <Text
              weight={"bold"}
              className="text-center leading-6 text-3xl font-semibold"
            >
              Current Initiatives
            </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {initiatives.map((initiative) => (
              <Card key={initiative.title}>
                <Link href={initiative.link}>
                  <CardHeader className="p-0">
                    <Image
                      src={initiative.imageUrl} // Ensure these paths are correct
                      alt={initiative.title}
                      width={600}
                      height={400}
                      className="object-cover w-full rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-4 space-y-1">
                    <CardTitle className="text-xl font-bold">{initiative.title}</CardTitle>
                    <CardDescription>
                      <Text size={"sm"} className="text-wrap">
                        {initiative.description}
                      </Text>
                    </CardDescription>
                    <Button variant="link" className="p-0">Learn More &rarr;</Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
            
          </section>
        </main>
      </div>
    </div>
  );
}
