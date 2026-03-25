import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import CategoriesSection from "@/components/home/categories-section";
import SuccessStoriesSection from "@/components/home/success-stories";
import HeroSection from "@/components/home/hero-section";

export const metadata: Metadata = {
  title: "Nubian | fka DeSci Nigeria",
  description:
    "Nubian is building an open-access research infrastructure that welcomes scholarly contributions from every discipline.",
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
                as="h2"
                className="text-center leading-6 text-3xl font-semibold"
              >
                What contributors are saying
              </Text>

              <SuccessStoriesSection />
              
              <section className="w-full mt-12">
                <Text
                  weight={"bold"}
                  as="h2"
                  className="text-center leading-6 text-3xl font-semibold"
                >
                  Partners
                </Text>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-items-center">
                  <div className="flex items-center justify-center">
                    <img
                      src="/assets/sba.png"
                      alt="Desci NG"
                      className="h-12 md:h-16 w-auto object-contain"
                      style={{ maxWidth: 220 }}
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <img
                      src="/assets/scl.png"
                      alt="Applied Science"
                      className="h-12 md:h-16 w-auto object-contain"
                      style={{ maxWidth: 220, filter: 'brightness(0) saturate(100%)' }}
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <img
                      src="/assets/nunet.svg"
                      alt="Blockchain Tech"
                      className="h-16 md:h-22 w-auto object-contain"
                      style={{ maxWidth: 280 }}
                    />
                  </div>
                </div>
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
