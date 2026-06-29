import { RouteGuard } from "@/components/auth/route-guard";
import ProjectShowcaseSubmissionCta from "@/components/programs/project-showcase-submission-cta";
import ProjectShowcaseSubmissionForm from "@/components/programs/project-showcase-submission-form";
import { Text } from "@/components/ui/text";
import { projectShowcaseSettings } from "@/lib/project-showcase";

export default function ProjectShowcaseSubmissionsPage() {
  if (projectShowcaseSettings.submissionState === "closed") {
    return (
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-0 md:py-8">
        <section className="space-y-4 rounded-[24px] border border-[#f3dfdf] bg-[#fffdfc] p-5 md:rounded-[28px] md:p-6">
          <Text as="h1" weight="semibold" className="text-xl text-text md:text-2xl">
            Submissions are currently closed
          </Text>
          <Text size="sm" className="max-w-2xl leading-6 text-text-muted">
            Leave your email and we will let you know when the next submission window
            opens.
          </Text>
          <ProjectShowcaseSubmissionCta hideClosedCopy />
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:px-0 md:py-8">
      <RouteGuard>
        <ProjectShowcaseSubmissionForm />
      </RouteGuard>
    </main>
  );
}
