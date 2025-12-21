import React from "react"
import ProgramCard from "./program-card";

const jams = [
  {
    title: "Research Jam 1",
    image: "/assets/jam1.jpg",
    description: "Description for Research Jam 1.",
    link: "https://example.com/jam1",
  },
  {
    title: "Research Jam 2",
    image: "/assets/jam2.jpg",
    description: "Description for Research Jam 2.",
    link: "https://example.com/jam2",
  },
];

export default function ResearchJamSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jams.map((item, idx) => (
        <ProgramCard key={idx} {...item} />
      ))}
    </div>
  );
}
