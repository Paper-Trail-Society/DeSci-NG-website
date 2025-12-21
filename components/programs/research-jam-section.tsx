import React from "react"
import ProgramCard from "./program-card";

const jams = [
  {
    title: "The Research Jam",
    image: "/assets/trj1.jpeg",
    description: "A symposium for researchers, research institutes, and stakeholders to discuss innovation.",
    link: "https://drive.google.com/file/d/162pPmgLQUG0PK-QW7h22MI_VJnokn8uG/view",
  },
  // {
  //   title: "Research Jam 2",
  //   image: "/assets/jam2.jpg",
  //   description: "Description for Research Jam 2.",
  //   link: "https://example.com/jam2",
  // },
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
