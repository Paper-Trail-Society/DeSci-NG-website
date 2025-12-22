import React from "react";
import ProgramCard from "./program-card";

const projects = [
  {
    title: "v2",
    image: "/assets/psv2.jpeg",
    description: "We support research endeavours across Africa. Take a look at how v2 is shaping out.",
    link: "https://x.com/DeSci_NG/status/1935309068463141225",
  },
    {
    title: "v1",
    image: "/assets/psv1.jpeg",
    description: "We support research endeavours across Africa. 10 researchers were supported in v1.",
    link: "https://x.com/DeSci_NG/status/1886355157094461780",
  },
];

export default function ProjectShowcaseSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((item, idx) => (
        <ProgramCard key={idx} {...item} />
      ))}
    </div>
  );
}
