import PaperSearchInput from "@/components/shared/paper-search-input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Link from "next/link";
import { motion } from "motion/react";
import CategoriesSection from "@/components/home/categories-section";
import SuccessStoriesSection from "@/components/home/success-stories";
import HeroSection from "@/components/home/hero-section";

export const metadata = {
  title: "Nubian | fka DeSci Nigeria",
};


export default function Home() {
  return (
    <div>
      <div className="items-center justify-items-center min-h-screen">
        <main className="flex flex-col items-center w-full pt-10 md:pt-4">
          <HeroSection />
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
