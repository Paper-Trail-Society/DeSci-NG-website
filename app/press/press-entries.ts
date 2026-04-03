export type PressEntry = {
  slug: string;
  title: string;
  summary: string;
  label: string;
  date?: string;
  body: string[];
  video?: {
    videoId: string;
    title: string;
  };
  cta?: {
    before: string;
    readMoreLabel: string;
    readMoreHref: string;
    middle: string;
    formLabel: string;
    formHref: string;
    after?: string;
  };
};

// Replace the placeholder copy below with the finalized press text when it is ready.
export const pressEntries: PressEntry[] = [
  {
    slug: "desci-nigeria-evolves-into-nubian-research",
    title: "DeSci Nigeria evolves into Nubian Research",
    label: "Press Release",
    date: "January 14, 2026",
    summary:
      "DeSci Nigeria is now operating under a new identity: Nubian Research, reflecting an evolution in scope rather than a shift in mission.",
    body: [
      "DeSci Nigeria is now operating under a new identity: Nubian Research. This change reflects an evolution in scope rather than a shift in mission, as the organisation continues its work building open, decentralised research infrastructure for scholars across Africa and beyond.",
      "Since inception, we have focused on indexing, preserving and surfacing research from African institutions, departments, and independent researchers. That work continues uninterrupted under the Nubian name. Existing research, contributors, partnerships, and community efforts remain fully intact.",
      "The decision to adopt the Nubian identity emerged as the organization grew beyond its initial geographic framing. While the work began in Nigeria as an offshoot of the Decentralised Science movement, this new identity codifies our contextual understanding even as we co-create with scholars across Africa and beyond. This is not a restart, it is a continuation and a clearer expression of our ideals.",
      "To our research community, collaborators, and co-creators, thank you for evolving with us. We look forward to continued engagement.",
    ],
  },
  {
    slug: "nubian-partners-with-nunet-to-expand-research-compute-access",
    title: "Nubian Partners with NuNet to Expand Research Compute Access",
    label: "Press Release",
    date: "February 19, 2026",
    summary:
      "Nubian is partnering with NuNet to make decentralized compute access more practical for researchers across its community.",
    body: [
      "Many researchers have decent computers in their labs, offices, or homes. Some of these computers have more or less computing capacity than the researchers personally need. What if there was a way for those who have more to offer their compute to those who request it? NuNet makes this happen through a peer-to-peer decentralised network.",
      "Instead of leaving available compute underused, this opens up a practical way for researchers to contribute resources to one another across a wider network. It points toward a model where access to compute can be shared more intentionally, especially for research work that may need more capacity than one person or lab can easily provide on its own.",
      "This is an early, practical step toward one of Nubian's core goals: making it easier for our community of researchers to run real workloads, collaborate globally, and keep their work accessible and durable over time.",
      "As this collaboration develops, we are interested in learning from researchers who would benefit from additional compute and from contributors willing to make spare capacity available to others. The aim is to keep building practical pathways for research collaboration, not only in theory, but in the everyday conditions researchers actually work in.",
    ],
    video: {
      videoId: "_bWzxDDr9X0",
      title: "NuNet partnership video",
    },
    cta: {
      before: "You can read more about this partnership ",
      readMoreLabel: "here",
      readMoreHref: "https://medium.com/nunet/desci-compute-x-nunet-f6ab7fcb22cc",
      middle:
        " and fill out this ",
      formLabel: "interest form",
      formHref: "https://forms.gle/38uJuM7UEVKwCnF67",
      after: " to either request or offer compute.",
    },
  },
];

export const getPressEntry = (slug: string) =>
  pressEntries.find((entry) => entry.slug === slug);
