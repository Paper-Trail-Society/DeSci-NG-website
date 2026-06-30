import { Text } from "@/components/ui/text";

import ProjectShowcaseProjectGrid from "./project-showcase-project-grid";
import ProjectShowcaseSubmissionCta from "./project-showcase-submission-cta";

export default function ProjectShowcaseSection() {
  return (
    <div className="space-y-8">
      <section className="rounded-[34px] border border-[#f0d8d8] bg-[linear-gradient(180deg,#fffafa_0%,#fff6f5_100%)] px-6 py-8 shadow-[0_28px_70px_-44px_rgba(181,34,33,0.28)] md:px-8 md:py-10">
        <div className="space-y-5">
          <Text as="h2" size="2xl" weight="bold" className="max-w-3xl text-text">
            Accelerating research projects across African campuses.
          </Text>
          <ProjectShowcaseSubmissionCta />
        </div>
      </section>

      <ProjectShowcaseProjectGrid />
    </div>
  );
}
