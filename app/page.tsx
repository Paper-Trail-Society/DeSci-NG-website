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
    title: "Dialogues",
    description: "A new series where researchers share what they are working on, the questions shaping their studies, and how it concerns to you. Join us on Saturday for our second episode.",
    imageUrl: "/assets/dialogues1.jpeg",
    link: "https://x.com/DeSci_NG/status/1991852009495081458",
  },
  {
    title: "Project Showcase",
    description: "We support research endeavours across Africa. 10 researchers were supported in v1, v2 is currently ongoing.",
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
    imageWidth: 250, // Adjust this if it looks bigger
    imageHeight: 160, // Adjust this if it looks bigger (e.g., taller)
  },
  {
    name: "Medical Science",
    query: "medicine",
    tagline: "Discover papers in Cardiology, Anatomy, and more",
    imageUrl: "/assets/medical-science.png",
  },
];

const successStories = [
  {
    name: "Emmanuel A. Ayoade (Industrial Chemistry Graduate, First Class Honours), Project Showcase V1 grantee",
    quote:
      "Honoured to be featured as a Spotlight Researcher by Decentralized Science Nigeria (DeSci NG)! This recognition means a lot, as it highlights my work on Green water treatment. I’m truly grateful for the DeSci NG community for providing a platform where young researchers can grow, share, and make an impact.",
  },
  {
    name: "Sylvester Agose (Founder/President, Space Clubs - LASU)",
    quote:
      "Nigeria now has its first decentralized research repository. A platform where young researchers, students, and innovators can share their work freely, where anyone can read, critique, and build upon new ideas. This matters because innovation doesn’t only come from million-dollar labs. Most times it begins with a student asking a simple question, a young thinker making notes, or a community leader wondering, “What if?”",
  },
  {
    name: "John Aboje (Editor at Journal of African Medical Students)",
    quote:
      "I’ve been involved in writing and publishing for 2 years now, and I’ve come across a lot of remarkable work, but this one truly stands out. With a record turnaround time of less than 3 months from submission to publication, I must acknowledge both the speed and novelty of this research. Even more exciting — this was my first-ever grant-funded study, sponsored by DeSci NG, and marks my 21st research publication.",
  },
];


export default function Home() {
  return (
    <div>
      <PublicNav />

      <div className="items-center justify-items-center min-h-screen">
        <main className="flex flex-col items-center w-full pt-10 md:pt-4 pb-16">
          <section className="lg:w-2/5 md:w-3/5 w-full mx-auto my-7 md:my-6 space-y-6 px-8">
            <Text
              weight={"bold"}
              className="text-center leading-6 text-3xl font-semibold"
            >
              EXPLORE ACADEMIC PAPERS ACROSS DISCIPLINES
            </Text>

            <PaperSearchInput />
          </section>
          <section className="w-full">
            <section className="w-full mt-10">
              <div className="flex flex-wrap gap-6 items-center justify-center mx-auto">
                {categories.map((category) => {
                  return (
                    <Card
                      key={category.name} // Use name for the key instead of randomUUID
                      // Adjusted width classes for a more standard grid look
                      className="flex flex-col gap-3 lg:w-1/6 md:w-1/3 w-[18em] h-full shadow-md transition-shadow hover:shadow-xl"
                    >
                      <Link href={`/search?q=${category.query}`} className="block">
                        <CardHeader className="p-0">
                          <Image
                            src={category.imageUrl}
                            alt={category.name}
                            width={category.imageWidth || 250}
                            height={category.imageHeight || 150} // Adjusted height to make the image fit nicely in a card header
                            className="object-cover w-full rounded-t-lg"
                          />
                        </CardHeader>
                        <CardContent className="space-y-1 p-4">
                          <CardTitle className="text-lg font-semibold">
                            {category.name.toUpperCase()}
                          </CardTitle>
                          <CardDescription>
                            <Text
                              size={"sm"} // Changed from "xs" to "sm" for readability
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

              {/* Keep your existing button logic */}
              <div className="flex justify-center">
                <Button variant={"destructive"} className="mt-10">
                  <Link href="/search">EXPLORE MORE PAPERS</Link>
                </Button>
              </div>
            </section>
          </section>

          <section className="w-full mx-auto my-10 space-y-6 px-8">
            <Text
              weight={"bold"}
              className="text-center leading-6 text-3xl font-semibold"
            >
              Current Initiatives
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 max-w-4xl mx-auto">
              {initiatives.map((initiative) => (
                <Card key={initiative.title} className="flex flex-col h-full">
                  <Link href={initiative.link} className="flex flex-col h-full">
                    <CardHeader className="p-0">
                      <Image
                        src={initiative.imageUrl}
                        alt={initiative.title}
                        width={600}
                        height={400}
                        className="object-cover w-full rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent className="p-4 space-y-2 flex flex-col">
                      <CardTitle className="text-xl font-bold">{initiative.title}</CardTitle>
                      <CardDescription>
                        <Text size={"sm"} variant={"secondary"} className="text-wrap">
                          {initiative.description}
                        </Text>
                      </CardDescription>
                      <Button variant="link" className="p-0 self-start">Learn More &rarr;</Button>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </section>

          <section className="lg:w-2/5 md:w-3/5 w-full mx-auto my-16 space-y-8 px-8">
            <Text
              weight={"bold"}
              className="text-center leading-6 text-3xl font-semibold"
            >
              Some Success Stories
            </Text>
            <div className="space-y-8 pt-4">
              {successStories.map((story, idx) => (
                <div key={idx} className="space-y-2 text-center">
                  <Text size={"md"} className="italic leading-relaxed">
                    “{story.quote}”
                  </Text>
                  <Text size={"sm"} weight={"medium"} className="text-gray-600">
                    — {story.name}
                  </Text>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
