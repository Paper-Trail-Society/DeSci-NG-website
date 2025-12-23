import PaperSearchInput from "@/components/shared/paper-search-input";
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
    description:
      "A new series where researchers share what they are working on, the questions shaping their studies, and how it concerns to you. Join us on Saturday for our third episode.",
    imageUrl: "/assets/dialogues1.jpg",
    link: "https://x.com/DeSci_NG/status/2000911841405624800",
  },
  {
    title: "Project Showcase",
    description:
      "We support research endeavours across Africa. 10 researchers were supported in v1, v2 is currently ongoing.",
    imageUrl: "/assets/psv2.jpeg",
    link: "https://x.com/DeSci_NG/status/1935309068463141225",
  },
  {
    title: "The Research Jam",
    description:
      "A symposium for researchers, research institutes, and stakeholders to discuss innovation. Piloted in July 2025, more to come.",
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
      "Nigeria now has its first decentralized research repository. A platform where young researchers, students, and innovators can share their work freely, where anyone can read, critique, and build upon new ideas. This matters because innovation doesn’t only come from million-dollar labs. Most times it begins with a student asking a simple question, a young thinker making notes, or a community leader wondering, 'What if?'",
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
      <div className="items-center justify-items-center min-h-screen">
        <main className="flex flex-col items-center w-full pt-10 md:pt-4">
          <section className="md:w-3/5 w-full mx-auto my-7 md:my-6 space-y-6 px-8">
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
              <div className="flex flex-wrap md:flex-nowrap gap-6 items-center justify-center">
                {categories.map((category) => {
                  return (
                    <Card
                      key={category.name} // Use name for the key instead of randomUUID
                      // Adjusted width classes for a more standard grid look
                      className="flex flex-col gap-2 lg:w-1/4 md:w-1/3 w-4/5 h-full shadow-md transition-shadow hover:shadow-xl"
                    >
                      <Link
                        href={`/search?q=${category.query}`}
                        className="block"
                      >
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

          <section className="w-full mx-auto my-16 px-4">
            <div className="max-w-6xl mx-auto">
              <Text
                weight={"bold"}
                className="text-center leading-6 text-3xl font-semibold"
              >
                What contributors are saying
              </Text>

              <div
                role="region"
                aria-label="Success stories carousel"
                className="w-full mt-6 px-4 overflow-x-auto scrollbar-hide"
              >
                <div className="snap-x w-fit flex gap-4 pb-4 mx-auto">
                  {successStories.map((story, idx) => (
                    <Card
                      key={crypto.randomUUID()}
                      className="snap-center flex-none w-80 min-h-[160px] p-0 shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      <CardContent className="p-4 flex flex-col h-full">
                        <Text
                          size={"sm"}
                          className="italic leading-relaxed text-gray-800 flex-1"
                        >
                          “{story.quote}”
                        </Text>
                        <div className="mt-4">
                          <Text
                            size={"sm"}
                            weight={"medium"}
                            className="text-gray-600"
                          >
                            — {story.name}
                          </Text>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
