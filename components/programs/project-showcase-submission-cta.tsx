"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import useCreateProjectShowcaseWaitlistEntry from "@/domains/project-showcase/hooks/use-create-project-showcase-waitlist-entry";
import { projectShowcaseSettings } from "@/lib/project-showcase";

export default function ProjectShowcaseSubmissionCta({
  hideClosedCopy = false,
}: {
  hideClosedCopy?: boolean;
}) {
  const [email, setEmail] = useState("");
  const createWaitlistEntry = useCreateProjectShowcaseWaitlistEntry();

  const handleWaitlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await createWaitlistEntry.mutateAsync({ email });

      toast.success("Saved", {
        description: response.message,
      });
      setEmail("");
    } catch (error) {
      const message = isAxiosError<{ error?: string; message?: string }>(error)
        ? error.response?.data?.error ||
          error.response?.data?.message ||
          "We couldn't save your email right now."
        : "We couldn't save your email right now.";

      toast.error("Notify me failed", { description: message });
    }
  };

  if (projectShowcaseSettings.submissionState === "closed") {
    return (
      <div className="space-y-4">
        {hideClosedCopy ? null : (
          <Text as="p" size="sm" className="max-w-2xl leading-7 text-text-muted">
            Submissions closed. Be the first to know when we open.
          </Text>
        )}

        <form
          className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          onSubmit={handleWaitlistSubmit}
        >
          <Input
            customSize="lg"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            className="sm:flex-1"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button size="lg" type="submit" disabled={createWaitlistEntry.isPending}>
            Notify me
          </Button>
        </form>
      </div>
    );
  }

  return (
    <Button asChild size="lg" className="w-full sm:w-auto">
      <Link href="/programs/project-showcase/submissions">
        Let's hear from you
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </Button>
  );
}
