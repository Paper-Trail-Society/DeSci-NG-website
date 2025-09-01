import Image from "next/image";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { SearchIcon } from "lucide-react";

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
    <div className="font-sans items-center justify-items-center min-h-screen ">
      <nav className="w-full 2xl:p-container-md pt-10 sm:pt-4">
        <ul className="w-full md:w-[70%] px-4 md:px-2 md:mx-auto flex justify-between items-center">
          <li>
            <a href="#">
              <Image
                src="/assets/desci-ng-logo.png"
                alt="logo"
                width={100}
                height={100}
              />
            </a>
          </li>
          <li>
            <a href="#">
              <Button variant={"destructive"} className="px-4">
                LOGIN
              </Button>
            </a>
          </li>
        </ul>
      </nav>
      <main className="flex flex-col items-center pb-20 w-full">
        <section className="md:w-1/3 w-full mx-auto my-10 space-y-6 px-8">
          <Text weight={"bold"} className="text-center leading-6 text-3xl">
            EXPLORE ACADEMIC PAPERS ACROSS DISCIPLINES
          </Text>

          <div className="relative">
            <Input
              type="text"
              placeholder="Search papers by topic, author, or affiliated institution"
              className="md:p-6 p-2 bg-[#F3E7E780] ring-1 ring-neutral-400 border-[#F3E7E780]/50 focus:border-[#F3E7E780]/50 placeholder:text-xs"
            />

            <SearchIcon className="absolute w-3 h-3 top-3.25 right-1 md:top-4.25 md:right-3 text-[#0B0B0B]" />
          </div>
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

      <footer className="w-full 2xl:p-container-md pt-10 sm:pt-4 border-t border-t-[var(--primary)]">
        <div className="w-[70%] mx-auto space-y-4 md:mx-auto">
          <Image
            src="/assets/desci-ng-logo.png"
            alt="logo"
            width={100}
            height={100}
          />

          <div className="w-full px-4 md:px-2 md:mx-auto md:flex md:flex-wrap md:items-center md:justify-between space-y-4">
            <section>
              <ul className="space-y-2">
                <li>
                  <a href="#">
                    <Text size={"sm"}>About Us</Text>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Text size={"sm"}>How to Upload a Paper</Text>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Text size="sm">Contact Us</Text>
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <ul className="space-y-2">
                <li>
                  <a href="#">
                    <Text size="sm">X (Formerly Twitter)</Text>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Text size="sm">LinkedIn, Instagram</Text>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Text size="sm">TikTok, YouTube</Text>
                  </a>
                </li>
              </ul>
            </section>

            <section className="flex flex-col justify-end md:pt-14">
              <Text size="sm"> &copy; {new Date().getFullYear()} Desci NG</Text>
            </section>
          </div>
        </div>
      </footer>
    </div>
  );
}
