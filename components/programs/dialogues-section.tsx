import React from "react";
import ProgramCard from "./program-card";
import type { ProgramPlatformLink } from "./program-platform-links";

interface DialogueItem {
  title: string;
  image: string;
  description: string;
  platformLinks?: ProgramPlatformLink[];
}

const dialogues: DialogueItem[] = [
  {
    title: "Episode 4",
    image: "/assets/EP4.png",
    description:
      "On April 2nd, we engage Dr. Harri (Lead, Superteam Nigeria), on his doctoral study on stablecoin adoption in Nigeria. We take the numbers and look beyond the numbers to ask: why stablecoins, and what does it reveal about trust in Nigeria today?",
    platformLinks: [
      {
        platform: "apple",
        href: "https://podcasts.apple.com/ng/podcast/dialogues-by-nubian-research/id1896858326?i=1000770758448",
      },
      {
        platform: "spotify",
        href: "https://open.spotify.com/episode/2W7hkNm9Vr6Z2FernG0XAz?si=o0IEeo72SkuKeqT5Kn0MYw",
      },
      {
        platform: "youtubeMusic",
        href: "https://music.youtube.com/watch?v=Sa2k-KKtLMk&si=zeXKCO3o8EI-lB6l",
      },
    ],
  },
  {
    title: "Episode 3",
    image: "/assets/EP3.png",
    description:
      "This Saturday, we look to a people, their history, and their identity. Join us as we engage Uche Ezejiofor on her honours thesis and unpack the ideas behind the paper and what Biafra still reveals about power, identity, and the unfinished African project.",
    platformLinks: [
      {
        platform: "apple",
        href: "https://podcasts.apple.com/ng/podcast/dialogues-by-nubian-research/id1896858326?i=1000770586813",
      },
      {
        platform: "spotify",
        href: "https://open.spotify.com/episode/5BgpuxtsXH2SWeUCNhhtWe?si=NPxqMxtkQ8iJaF35tO5SAw",
      },
      {
        platform: "youtubeMusic",
        href: "https://music.youtube.com/watch?v=maLl0xoD-Hw&si=2Q8P4CfSAW_Zdb-M",
      },
    ],
  },
  {
    title: "Episode 2",
    image: "/assets/EP2.png",
    description: "Last week, we started in the medical sciences. This Saturday, we continue in the engineering sciences. Join us as we explore their joint research, the questions shaping their work, and how their system could transform logistics.",
  },
  {
    title: "Episode 1",
    image: "/assets/EP1.png",
    description:
      "Introducing: Dialogues. We engage scholars and researchers to pull back the curtain on the questions shaping their studies, the inferences they are making, and, importantly, why it matters in everyday life.",
  },
];

export default function DialoguesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {dialogues.map((item, idx) => (
        <ProgramCard key={idx} {...item} />
      ))}
    </div>
  );
}
