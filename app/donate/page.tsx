import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Link from "next/link";

export const metadata = {
  title: "Nubian | Donate",
};

const impactAreas = [
  {
    title: "Student research grants",
    description:
      "Support microgrants that help students across African universities design, run, and publish context-rich research projects.",
  },
  {
    title: "Open infrastructure",
    description:
      "Fund the storage, indexing, and long-term preservation of African scholarship so that it stays accessible, verifiable, and reusable.",
  },
  {
    title: "Community & programs",
    description:
      "Back programs, dialogues, and learning tracks that help early-career researchers find collaborators and share their work openly.",
  },
];

const DonatePage = () => {
  const PAYSTACK_DONATION_LINK = process.env.NEXT_PAYSTACK_DONATION_LINK || "#";
  const GIVETH_DONATION_LINK = process.env.NEXT_GIVETH_DONATION_LINK || "#";
  return (
    <div className="items-center justify-items-center pb-20 w-full">
      <section className="flex flex-col gap-10 md:gap-14 pt-10 pb-16 w-full">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
          <div className="flex-1 space-y-4 md:space-y-6">
            <Text
              as="h2"
              className="text-xl md:text-3xl leading-7 md:leading-9"
              weight="bold"
            >
              Help keep African research open and accessible, forever.
            </Text>

            <Text className="text-base md:text-lg">
              Although Africa represents about 17% of the world&apos;s population, it contributes less than 3% of global research output. 
              Nubian (formerly DeSci Nigeria) is building a decentralized research
              infrastructure to make under-represented research accessible to all.
            </Text>

            <Text className="text-sm md:text-base text-text-dim">
              Your donation directly supports under-represented researchers, long-term
              preservation of African scholarship, and the community initiatives that keep
              this collective alive. 
            </Text>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg shadow transition-colors px-8 py-3"
              >
                <Link href={PAYSTACK_DONATION_LINK}>Donate with Paystack</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary border border-primary hover:bg-primary/10 font-semibold rounded-lg shadow transition-colors px-8 py-3"
              >
                <Link href={GIVETH_DONATION_LINK}>Donate with Giveth.io</Link>
              </Button>
            </div>
          </div>

          <Card className="flex-1 bg-secondary/10 border-secondary-7">
            <CardContent className="pt-6 flex flex-col gap-3">
              <Text
                weight="medium"
                className="text-base md:text-lg mb-1 md:mb-2"
              >
                Where your support goes
              </Text>
              <ul className="list-disc list-inside text-sm md:text-base text-text-dim space-y-2">
                <li>
                  Microgrants for undergraduate and early-career research.
                </li>
                <li>
                  Infrastructure that keeps African papers searchable and
                  tamper-resistant.
                </li>
                <li>
                  Convenings, dialogues, and collaborations across institutions
                  and regions.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <section id="paystack" className="w-full">
          <Text
            as="h2"
            weight="bold"
            className="text-xl md:text-2xl mb-4 md:mb-6"
          >
            Ways to support
          </Text>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactAreas.map((area) => (
              <Card key={area.title} className="h-full">
                <CardContent className="pt-6 flex flex-col gap-3">
                  <Text weight="medium" className="text-base md:text-lg">
                    {area.title}
                  </Text>
                  <Text size="sm" className="text-text-dim">
                    {area.description}
                  </Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default DonatePage;
