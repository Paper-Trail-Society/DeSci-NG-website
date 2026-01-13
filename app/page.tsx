import PaperSearchInput from "@/components/shared/paper-search-input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Link from "next/link";
import {
  Card,
  CardContent
} from "../components/ui/card";
import CategoriesSection from "@/components/home/categories-section";
import SuccessStoriesSection from "@/components/home/success-stories";

export const metadata = {
  title: "Nubian | Decentralized Science Nigeria",
};


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
              <CategoriesSection />

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

              <SuccessStoriesSection />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
