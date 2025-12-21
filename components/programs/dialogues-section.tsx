import React from "react";
import ProgramCard from "./program-card";

const dialogues = [
  {
    title: "Dialogue 1",
    image: "/assets/dialogues1.jpg",
    description: "A new series where researchers share what they are working on, the questions shaping their studies, and how it concerns to you. Join us on Saturday for our third episode.",
    link: "https://x.com/DeSci_NG/status/2000911841405624800",
  },
  {
    title: "Dialogue 2",
    image: "/assets/dialogues1.jpg",
    description: "Description for Dialogue 2.",
    link: "https://example.com/dialogue2",
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
