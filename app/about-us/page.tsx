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

          <div className="md:w-2/5 w-full text-center flex flex-col gap-2 md:gap-4 px-4">
            <Text className="text-sm md:text-md">
              We are Africa’s first open, decentralized research repository,
              reducing barriers to knowledge sharing and increasing the
              visibility of African scholarship globally.
            </Text>

            <Text className="text-sm md:text-md">
              Leveraging blockchain technology, our repository is purpose-built
              against loss, tampering, and being kept out of reach for the very
              people who need it most. Every study added becomes a permanent
              part of a shared knowledge bank that anyone can access, learn
              from, and build upon.{" "}
            </Text>

            <Text className="text-sm md:text-md">
              Our vision is an Africa where our discoveries endure and move the
              world forward.{" "}
            </Text>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
