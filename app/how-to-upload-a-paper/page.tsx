import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import React from "react";

export const metadata = {
  title: "Desci NG | How to Upload a Paper",
  description: "Learn how to upload a paper to desci.ng",
}

const StepCard = ({
  children,
  number,
}: {
  children: React.ReactNode;
  number: string;
}) => {
  return (
    <Card className="bg-[#F3E7E780] w-full py-2">
      <CardContent className="flex flex-wrap gap-4 my-4">
        <div className="relative rounded-full w-14 h-14 bg-white p-2 text-center">
          <Text size={"2xl"} weight={"bold"} className="absolute top-3 left-5">
            {number}
          </Text>
        </div>
        <CardDescription className="space-y-4 md:w-4/5 w-full">{children}</CardDescription>
      </CardContent>
    </Card>
  );
};

const Page = () => {
  return (
    <div>
      <div className="space-y-4 items-center justify-items-center pt-10 pb-20 md:w-3/5 w-full mx-auto">
        <Text as="h2" weight={"bold"} size={"xl"} className="text-center">
          How to Upload a Paper
        </Text>

        <section className="flex flex-col gap-3 md:w-3/5 w-full mx-auto">
          <StepCard number="1">
            <Text size={"sm"}>
              Create a free account or log in. You’ll need a valid email
              address.
            </Text>
            <Text size={"sm"}>
              If you have an institution affiliated email address, we encourage
              you to sign up with it!
            </Text>
          </StepCard>

          <StepCard number="2">
            <Text size={"sm"}>
              Prepare your Paper in a PDF. Include necessary preliminaries such
              as title, author(s), institution(s), and an abstract.
            </Text>
          </StepCard>
          <StepCard number="3">
            <Text size={"sm"}>
              To upload your paper, click “Upload New Paper” on your dashboard,
              fill in the fields, add your PDF (drag and drop or select a file),
              and click “Upload Paper” for review.
            </Text>
          </StepCard>
          <StepCard number="4">
            <Text size={"sm"}>
              All papers go through a credibility test by the DeSci NG team.
              You’ll be notified by email when your paper is approved and
              uploaded. If changes are needed, you'll get feedback and can
              re-upload easily.
            </Text>
          </StepCard>
          <StepCard number="5">
            <Text size={"sm"}>
              Once approved, your paper is stored securely and publicly on DeSci
              NG. Share the link, download the PDF, and see stats like views and
              downloads anytime in your dashboard.
            </Text>
          </StepCard>
        </section>
      </div>
    </div>
  );
};

export default Page;
