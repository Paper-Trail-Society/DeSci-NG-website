export type PressBodySegment = {
  text: string;
  href?: string;
  emphasis?: boolean;
};

export type PressBodyContent =
  | string
  | {
      segments: PressBodySegment[];
    };

export type PressEntry = {
  slug: string;
  title: string;
  summary: string;
  label: string;
  date?: string;
  body: PressBodyContent[];
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
    slug: "nubian-research-contributes-to-pan-african-scientific-computing-position-paper",
    title:
      "Nubian Research Contributes to Pan-African Scientific Computing Position Paper",
    label: "Press Release",
    date: "October 19, 2026",
    summary:
      "Led by the Science for Africa Foundation, Nairobi, Kenya, the initiative examines research computing capacity and identifies practical pathways for improving access across Africa.",
    body: [
      {
        segments: [
          {
            text: "At the convening, researchers and practitioners interpreted the findings and shaped recommendations for the position paper, ",
          },
          {
            text: "Mapping Scientific Computing to Power Research, Big Data, and AI in Africa: Evidence and Pathways for a Federated Ecosystem",
            emphasis: true,
          },
          { text: "." },
        ],
      },
      "The paper draws on a mapping exercise that received 118 institutional submissions across 28 African countries, with 67 retained for analysis. The findings revealed an average scientific computing readiness of 40.1% among participating institutions, highlighting gaps in computing capacity, connectivity, software, technical expertise, and operational sustainability.",
      "Represented by the Executive Director, Mosadoluwa Fasasi, Nubian Research emphasized the need to explore practical alternatives while the continent continues working towards building and owning more of its computing infrastructure.",
      "Rather than waiting for every institution to acquire and maintain expensive computing systems, we advocated for making existing resources more visible, accessible, and shareable. Our contributions focused on infrastructure-as-a-service models, service catalogues, shared GPU pools, and appropriately scaled solutions that institutions can realistically sustain.",
      "These approaches do not replace the need for long-term infrastructure investment. They offer ways for researchers to access the resources they need today while that larger work continues.",
      {
        segments: [
          {
            text: "This contribution builds on Nubian Research's ongoing efforts to make research infrastructure more accessible, including our ",
          },
          {
            text: "partnership with NuNet",
            href: "/press/nubian-partners-with-nunet-to-expand-research-compute-access",
          },
          {
            text: " to explore decentralised computing access for researchers.",
          },
        ],
      },
      "We appreciate the Science for Africa Foundation for leading this effort and the colleagues across the continent who contributed their expertise.",
      {
        segments: [
          {
            text: "Read the full position paper",
            href: "https://nubianresearch.com/api/ipfs/bafybeicwsxgjjhjidpc34gea5n7bihhxt5pvg4a3uuxqa4jb3h4fcawpsy",
          },
          { text: "." },
        ],
      },
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
];

export const getPressEntry = (slug: string) =>
  pressEntries.find((entry) => entry.slug === slug);
