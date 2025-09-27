import PublicNav from "@/components/shared/public-nav";
import { Text } from "@/components/ui/text";
import React from "react";

export const metadata = {
  title: "Desci NG | About Us",
};

const Page = () => {
  return (
    <div>
      <PublicNav />

      <div className="items-center justify-items-center  pt-10 pb-20 w-full">
        <section className="flex flex-col gap-8 md:gap-14 items-center pt-10 pb-20 w-full">
          <Text as="p" className="text-center text-xl md:text-3xl leading-7">
            About <b>Decentralized Science Nigeria</b>
          </Text>

          <div className="md:w-2/3 w-full text-left md:text-center flex flex-col gap-2 md:gap-4 px-4">
            <Text className="text-base md:text-lg">
             We are Africa’s first decentralized research infrastructure, making African research open, secure, and globally accessible, forever. For far too long, African scholarship remains siloed in institutions across the continent, limiting shared knowledge and the speed of innovation. We are reimagining this challenge by providing a collective where anyone can publish, share, and build on contextual African and related studies. 
            </Text>

            <Text className="text-base md:text-lg">
Today, our collective spans across West Africa and India, with the highest number of studies from Nigeria across 12 higher institutions. Some of the current fields include; Arts & Humanities, Clinical Sciences, Computing, Communication & Information, Pure & Applied Sciences, and Social Sciences; with the highest number of studies from Social Sciences.{" "}
            </Text>

            <Text className="text-base md:text-lg">
Leveraging blockchain technology, our infrastructure is purpose-built against loss, tampering, and being kept out of reach for the very people who need it most. This creates a multiplier effect for scholars within and outside the continent to consult contextual African studies, innovate to build custom solutions for Africa, and join forces with the rest of the world to address concerns that cannot wait. Our vision is an Africa where our discoveries endure and move the world forward.{" "}
            </Text>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
