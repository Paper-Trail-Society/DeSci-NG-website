import { buildLegalMetadata } from "@/components/shared/legal-page";
import { Text } from "@/components/ui/text";

export const metadata = buildLegalMetadata(
  "Privacy Policy",
  "Learn how Nubian Research collects, uses, and protects information shared through the platform."
);

const informationWeCollect = [
  "Account Information: name, email address, password (encrypted), affiliated institution, and area of research interest, when you register on the platform",
  "Submission Data: research content and associated metadata uploaded during the paper submission process",
  "Usage Data: IP address, browser type, and pages visited, collected via platform logging tools",
];

const howWeUseInformation = [
  "Create and manage your contributor account",
  "Process and publish submitted work on the platform",
  "Communicate with contributors about submissions and platform updates",
  "Store submitted work securely on the InterPlanetary File System via Pinata",
  "Send transactional emails via ZeptoMail",
  "Monitor platform performance and diagnose technical issues via Pino logging",
];

const sharingIntro = [
  "We do not sell personal data.",
  "Information is shared with trusted service providers only as necessary to operate the platform, including:",
];

const serviceProviderCategories = [
  "Authentication and session management providers",
  "Database and storage providers",
  "Decentralised file storage infrastructure providers",
  "Transactional email delivery providers",
];

const disclosureNote = [
  "We may disclose information if required by law.",
];

const securityMeasures = [
  "Passwords are encrypted and never stored in plain text",
  "All data transmissions are secured via HTTPS",
  "File storage is handled through decentralised infrastructure via Pinata, providing tamper-proof, immutable records",
  "Database access is managed through controlled backend infrastructure",
];

const yourRights = [
  "Request access to the personal data we hold about you",
  "Request correction of inaccurate data",
  "Request deletion of your account and associated data",
  "Withdraw a submitted work from the platform at any time",
];

const sections = [
  {
    id: "who-we-are",
    title: "01. Who We Are",
    content: [
      {
        type: "paragraph",
        text: "Nubian Research is an open-access research collective dedicated to making Global South scholarship visible, searchable, and citable. We host, preserve, and advocate for scholarly work across every discipline.",
      },
    ],
  },
  {
    id: "information-we-collect",
    title: "02. Information We Collect",
    content: [
      {
        type: "paragraph",
        text: "We may collect:",
      },
      {
        type: "list",
        items: informationWeCollect,
      },
    ],
  },
  {
    id: "how-we-use-information",
    title: "03. How We Use Information",
    content: [
      {
        type: "paragraph",
        text: "We use collected data to:",
      },
      {
        type: "list",
        items: howWeUseInformation,
      },
    ],
  },
  {
    id: "how-we-share-information",
    title: "04. How We Share Information",
    content: [
      {
        type: "paragraph",
        text: sharingIntro[0],
      },
      {
        type: "paragraph",
        text: sharingIntro[1],
      },
      {
        type: "list",
        items: serviceProviderCategories,
      },
      {
        type: "paragraph",
        text: disclosureNote[0],
      },
    ],
  },
  {
    id: "data-retention",
    title: "05. Data Retention",
    content: [
      {
        type: "paragraph",
        text: "We retain account data for as long as your account remains active. Submitted works stored on IPFS are content-addressed and persist as long as they remain pinned by Nubian Research. Upon a takedown request, we will remove your work from the platform and unpin it from IPFS. Note that the cryptographic hash generated at upload remains as a timestamped record of prior existence; this is a property of decentralised infrastructure and cannot be erased by any party.",
      },
    ],
  },
  {
    id: "security",
    title: "06. Security",
    content: [
      {
        type: "paragraph",
        text: "We take the following measures to protect your data:",
      },
      {
        type: "list",
        items: securityMeasures,
      },
    ],
  },
  {
    id: "your-rights",
    title: "07. Your Rights",
    content: [
      {
        type: "paragraph",
        text: "You may:",
      },
      {
        type: "list",
        items: yourRights,
      },
      {
        type: "paragraph",
        text: "To exercise any of these rights, contact us at info.nubianresearch@gmail.com.",
      },
    ],
  },
  {
    id: "cookies-and-tracking",
    title: "08. Cookies and Tracking",
    content: [
      {
        type: "paragraph",
        text: "Our platform may use cookies and session tokens to manage authentication and improve your experience. You may disable cookies in your browser settings, though this may affect platform functionality.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "09. Children's Privacy",
    content: [
      {
        type: "paragraph",
        text: "Nubian Research is not intended for users under the age of 13. We do not knowingly collect personal data from children. If you believe a child has registered on the platform, please contact us and we will remove their data promptly.",
      },
    ],
  },
  {
    id: "changes-to-this-policy",
    title: "10. Changes to This Policy",
    content: [
      {
        type: "paragraph",
        text: "We reserve the right to update this Privacy Policy from time to time to reflect changes in the platform or applicable law. Updated versions will be posted on this page and material changes will be communicated to registered users via email.",
      },
    ],
  },
  {
    id: "contact",
    title: "11. Contact",
    content: [
      {
        type: "paragraph",
        text: "For questions about this Privacy Policy, contact us at info.nubianresearch@gmail.com.",
      },
    ],
  },
] as const;

const sectionIndex = sections.map((section) => ({
  id: section.id,
  title: section.title,
}));

const Page = () => {
  return (
    <div className="items-center justify-items-center w-full pb-10">
      <section className="w-full max-w-5xl pt-10 md:pt-6">
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-8 lg:max-w-3xl">
          <Text as="h2" className="text-2xl md:text-4xl leading-tight">
            Privacy Policy
          </Text>
          <Text size="sm" className="text-gray-500">
            Last updated: October 2025
          </Text>
          <Text className="text-base md:text-lg text-gray-700">
            We value your privacy. This policy explains what information we collect, how we use it, and what rights you have.
          </Text>
        </div>

        <div className="mt-8 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-3">
              <Text
                size="xs"
                weight="medium"
                className="uppercase tracking-[0.18em] text-text-dim"
              >
                Index
              </Text>
              <nav aria-label="Privacy policy sections">
                <ul className="space-y-2">
                  {sectionIndex.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-xs leading-5 text-text-dim transition-colors hover:text-primary"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="flex flex-col gap-8">
            {sections.map((section) => (
              <div
                key={section.title}
                id={section.id}
                className="scroll-mt-24 flex flex-col gap-3"
              >
                <Text as="h2" weight="semibold" className="text-lg md:text-xl">
                  {section.title}
                </Text>

                <div className="flex flex-col gap-3">
                  {section.content.map((block, index) => {
                    if (block.type === "paragraph") {
                      return (
                        <Text
                          key={`${section.title}-paragraph-${index}`}
                          className="text-base leading-7 text-gray-700"
                        >
                          {block.text}
                        </Text>
                      );
                    }

                    return (
                      <ul
                        key={`${section.title}-list-${index}`}
                        className="list-disc space-y-2 pl-6 text-gray-700"
                      >
                        {block.items.map((item) => (
                          <li key={item} className="text-base leading-7">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
