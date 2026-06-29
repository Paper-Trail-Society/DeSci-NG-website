"use client";

import Breadcrumb from "@/components/shared/breadcrumb";
import { usePathname } from "next/navigation";

const PROGRAM_BREADCRUMB_MAP = [
  {
    href: "/programs/dialogues",
    links: [
      { label: "Home", href: "/" },
      { label: "Programs", href: "/programs" },
      { label: "Dialogues", href: "/programs/dialogues" },
    ],
  },
  {
    href: "/programs/project-showcase/submissions",
    links: [
      { label: "Home", href: "/" },
      { label: "Programs", href: "/programs" },
      { label: "Project Showcase", href: "/programs/project-showcase" },
      {
        label: "Submissions",
        href: "/programs/project-showcase/submissions",
      },
    ],
  },
  {
    href: "/programs/project-showcase",
    links: [
      { label: "Home", href: "/" },
      { label: "Programs", href: "/programs" },
      { label: "Project Showcase", href: "/programs/project-showcase" },
    ],
  },
  {
    href: "/programs/research-jam",
    links: [
      { label: "Home", href: "/" },
      { label: "Programs", href: "/programs" },
      { label: "The Research Jam", href: "/programs/research-jam" },
    ],
  },
];

export default function ProgramsBreadcrumb() {
  const pathname = usePathname() || "";

  const activeBreadcrumb =
    PROGRAM_BREADCRUMB_MAP.find((item) => pathname.startsWith(item.href))?.links ?? [
      { label: "Home", href: "/" },
      { label: "Programs", href: "/programs" },
    ];

  return <Breadcrumb links={activeBreadcrumb} />;
}
