import React from "react";
import ProgramCard from "./program-card";

const dialogues = [
  {
    title: "Episode 3",
    image: "/assets/dialogues1.jpg",
    description: "This Saturday, we look to a people, their history, and their identity. Join us as we engage Uche Ezejiofor on her honours thesis and unpack the ideas behind the paper and what Biafra still reveals about power, identity, and the unfinished African project.",
    link: "https://x.com/DeSci_NG/status/2000911841405624800",
  },
  {
    title: "Episode 2",
    image: "/assets/dialogues2.jpeg",
    description: "Last week, we started in the medical sciences. This Saturday, we continue in the engineering sciences. Join us as we explore their joint research, the questions shaping their work, and how their system could transform logistics.",
    link: "https://x.com/DeSci_NG/status/1995775266438680636",
  },
    {
    title: "Episode 1",
    image: "/assets/dialogues1.jpeg",
    description: "Introducing: Dialogues. A new series where researchers share what they are working on, the questions shaping their studies, and how it concerns to you.",
    link: "https://x.com/DeSci_NG/status/1991852009495081458",
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
