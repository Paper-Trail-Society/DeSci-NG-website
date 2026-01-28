"use client";

import React from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Text } from "../ui/text";

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

const SuccessStoriesSection = () => {
  return (
    <div
      role="region"
      aria-label="Success stories carousel"
      className="w-full mt-6 px-4 overflow-x-auto scrollbar-hide"
    >
      <div className="snap-x w-fit flex gap-4 pb-4 mx-auto">
        {successStories.map((story) => (
          <motion.div
            key={story.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="snap-center flex-none bg-card text-card-foreground rounded-xl border shadow w-80 min-h-[160px] p-0"
          >
            <CardContent className="p-4 flex flex-col h-full">
              <Text
                size={"sm"}
                className="italic leading-relaxed text-gray-800 flex-1"
              >
                “{story.quote}”
              </Text>
              <div className="mt-4">
                <Text size={"sm"} weight={"medium"} className="text-gray-600">
                  — {story.name}
                </Text>
              </div>
            </CardContent>
          </motion.div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center md:hidden text-xs text-text-dim">
        <motion.span
          className="flex items-center gap-1"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="h-[1px] w-6 bg-gray-300" />
          <span>Swipe to see more</span>
          <span className="text-lg">→</span>
        </motion.span>
      </div>
    </div>
  );
};

export default SuccessStoriesSection;
