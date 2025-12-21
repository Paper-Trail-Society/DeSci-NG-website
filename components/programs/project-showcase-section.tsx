import React from "react";
import ProgramCard from "./program-card";

const projects = [
  {
    title: "Project 1",
    image: "/assets/project1.jpg",
    description: "Description for Project 1.",
    link: "https://example.com/project1",
  },
  {
    title: "Project 2",
    image: "/assets/project2.jpg",
    description: "Description for Project 2.",
    link: "https://example.com/project2",
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
