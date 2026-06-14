import { buildLegalMetadata } from "@/components/shared/legal-page";
import { Text } from "@/components/ui/text";

export const metadata = buildLegalMetadata(
  "Terms of Use",
  "Review the terms that govern access to and use of the Nubian Research platform."
);

const intellectualPropertyAllowedUses = [
  "Access and read published works for personal study, research, and non-commercial purposes",
  "Share links to published works on this platform",
  "Build upon works in accordance with the terms of their Creative Commons licence, provided proper attribution is given",
];

const intellectualPropertyProhibitedUses = [
  "Reproduce or republish substantial portions of any work for commercial purposes",
  "Scrape, bulk-download, or use platform content to train artificial intelligence models or build derivative commercial products",
  "Falsely attribute, distort, or misrepresent any work published on this platform",
  "Remove or obscure any attribution, licence notice, or authorship information",
];

const contributorResponsibilities = [
  "Confirm that the work is your original creation or that you have the right to submit it",
  "Grant Nubian Research a non-exclusive licence to host, display, and promote the work on the platform and associated channels under the terms of Creative Commons Attribution 4.0 International (CC BY 4.0)",
  "Acknowledge that under CC BY 4.0, others may share and build upon your work provided they credit you as the original author",
];

const prohibitedConduct = [
  "You do not have the right to publish",
  "Contains plagiarised or fabricated content",
  "Is defamatory, fraudulent, or harmful",
  "Violates the intellectual property rights of any third party",
];

const sections = [
  {
    id: "about-the-platform",
    title: "1. About the Platform",
    content: [
      {
        type: "paragraph",
        text: "Nubian Research is an open-access research collective dedicated to making Global South scholarship visible, searchable, and citable. By creating an account or submitting work to the platform, you agree to these Terms of Use.",
      },
    ],
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    content: [
      {
        type: "paragraph",
        text: "Nubian Research is open to researchers, scholars, students, and practitioners from every discipline. There are no restrictions based on geography, institution, or career stage.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "3. Intellectual Property",
    content: [
      {
        type: "paragraph",
        text: "Nubian Research does not claim ownership over any research work, paper, or scholarly content submitted to this platform. Copyright remains entirely with the original author or their institution.",
      },
      {
        type: "paragraph",
        text: "Our role is to host, preserve, and advocate for scholarly work, making it publicly accessible and discoverable for research, education, and public benefit.",
      },
      {
        type: "paragraph",
        text: "Contributor-submitted works remain owned by their authors and are made available under the licence selected or stated at publication. Where a work is published under Creative Commons Attribution 4.0 International (CC BY 4.0), downstream users may reuse, adapt, and redistribute that work provided they comply with the applicable licence terms and give proper attribution.",
      },
      {
        type: "list",
        items: intellectualPropertyAllowedUses,
      },
      {
        type: "list",
        items: intellectualPropertyProhibitedUses,
      },
    ],
  },
  {
    id: "contributor-rights-and-responsibilities",
    title: "4. Contributor Rights and Responsibilities",
    content: [
      {
        type: "paragraph",
        text: "You retain 100% ownership of your work. Submitting to Nubian Research does not transfer copyright to us in any form.",
      },
      {
        type: "label",
        text: "By submitting work, you:",
      },
      {
        type: "list",
        items: contributorResponsibilities,
      },
    ],
  },
  {
    id: "publishing-on-nubian-research",
    title: "5. Publishing on Nubian Research",
    content: [
      {
        type: "paragraph",
        text: "Nubian Research is an open-access publishing infrastructure. Work published here is publicly accessible and recorded through decentralised storage on the InterPlanetary File System (IPFS) in a manner intended to create a verifiable publication record linked to its author.",
      },
      {
        type: "paragraph",
        text: "Work published on Nubian Research carries a verifiable publication record. Contributors who wish to additionally pursue peer-reviewed journal publication are encouraged to confirm that journal's open-access preprint policy, as standards vary across publishers.",
      },
      {
        type: "paragraph",
        text: "Nubian Research reserves the right to introduce peer review, journal-tier publishing, or other editorial processes in the future. Any such changes will be communicated to registered contributors and will not retroactively alter the status of previously published work.",
      },
    ],
  },
  {
    id: "proof-of-authorship-and-timestamping",
    title: "6. Proof of Authorship and Timestamping",
    content: [
      {
        type: "paragraph",
        text: "Every submission to Nubian Research is stored on IPFS via Pinata, generating a unique cryptographic hash at the point of upload. This hash is designed to serve as a timestamped record that the work existed in that form at that moment and is not intended to be retroactively altered or backdated by Nubian Research.",
      },
      {
        type: "paragraph",
        text: "This record may serve as evidence of prior authorship and may be accessed through public IPFS gateways.",
      },
    ],
  },
  {
    id: "takedowns",
    title: "7. Takedowns",
    content: [
      {
        type: "paragraph",
        text: "You may request removal of your work from the platform at any time by contacting us at info.nubianresearch@gmail.com. We will review takedown requests and act on them within a reasonable timeframe.",
      },
      {
        type: "paragraph",
        text: "Nubian Research may also remove, restrict, or review content where there is a credible complaint relating to rights infringement, illegality, or harm.",
      },
      {
        type: "paragraph",
        text: "Please note that while we will remove your work from the platform and unpin it from IPFS, the cryptographic hash generated at the time of upload may continue to exist as a timestamped record of prior existence as a feature of decentralised infrastructure.",
      },
    ],
  },
  {
    id: "prohibited-conduct",
    title: "8. Prohibited Conduct",
    content: [
      {
        type: "label",
        text: "You may not submit work that:",
      },
      {
        type: "list",
        items: prohibitedConduct,
      },
      {
        type: "paragraph",
        text: "Nubian Research reserves the right to remove any submission that violates these terms without prior notice.",
      },
    ],
  },
  {
    id: "platform-availability",
    title: "9. Platform Availability",
    content: [
      {
        type: "paragraph",
        text: "Nubian Research is committed to maintaining reliable access to the platform. In the event of scheduled maintenance or unforeseen technical disruptions, we will communicate this to users where possible. Nubian Research is not liable for losses arising from temporary service interruptions beyond our reasonable control.",
      },
    ],
  },
  {
    id: "changes-to-these-terms",
    title: "10. Changes to These Terms",
    content: [
      {
        type: "paragraph",
        text: "We may update these Terms from time to time to reflect the growth and evolution of the platform. We will notify registered contributors of material changes via email. Continued use of the platform following notification constitutes acceptance of the revised terms.",
      },
    ],
  },
  {
    id: "contact",
    title: "11. Contact",
    content: [
      {
        type: "paragraph",
        text: "For questions about these Terms, contact us at info.nubianresearch@gmail.com.",
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
            Terms of Use
          </Text>
          <Text size="sm" className="text-gray-500">
            Last updated: October 2025
          </Text>
          <Text className="text-base md:text-lg text-gray-700">
            These Terms of Use explain the rules that govern access to and use of the Nubian Research platform.
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
              <nav aria-label="Terms of use sections">
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

                    if (block.type === "label") {
                      return (
                        <Text
                          key={`${section.title}-label-${index}`}
                          weight="medium"
                          className="text-base leading-7 text-gray-900"
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
