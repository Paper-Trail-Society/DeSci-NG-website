"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
} from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import {
  ChevronDownIcon,
  CheckCircle2Icon,
  Loader2Icon,
  NotebookPenIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import useGetInstitutions from "@/domains/institutions/hooks/use-get-institutions";
import useCreateProjectShowcaseSubmission from "@/domains/project-showcase/hooks/use-create-project-showcase-submission";
import { cn } from "@/lib/utils/css";

const projectShowcaseSubmissionSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(255),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phoneNumber: z.string().trim().min(7, "Enter a valid phone or WhatsApp number").max(50),
  institutionId: z.coerce.number().int().positive().optional(),
  institutionInput: z
    .string()
    .trim()
    .min(2, "University or institution is required")
    .max(255),
  department: z.string().trim().min(2, "Department or field of study is required").max(255),
  degreeProgram: z
    .string()
    .trim()
    .min(2, "Degree program is required")
    .max(120),
  projectTitle: z.string().trim().min(3, "Project title is required").max(255),
  projectSummary: z
    .string()
    .trim()
    .min(80, "Give a stronger overview of the project")
    .max(5000),
  problemStatement: z
    .string()
    .trim()
    .min(50, "Explain the problem or opportunity more clearly")
    .max(5000),
  currentProgress: z
    .string()
    .trim()
    .min(30, "Tell us what progress has already been made")
    .max(5000),
  expectedImpact: z
    .string()
    .trim()
    .min(50, "Explain the potential impact more clearly")
    .max(5000),
  expectedStartDate: z.string().min(1, "Start date is required"),
  expectedEndDate: z.string().min(1, "Expected completion date is required"),
  willProvideUpdates: z.boolean({
    message: "Please confirm whether you can provide updates if selected",
  }),
  consentToFeature: z.boolean({
    message: "Please confirm whether the project can be featured if selected",
  }),
  inspiration: z.string().trim().max(3000).optional(),
  supportUse: z.string().trim().max(3000).optional(),
  beneficiaries: z.string().trim().max(3000).optional(),
  projectUrl: z.union([z.literal(""), z.string().trim().url("Enter a valid URL").max(2048)]),
  demoUrl: z.union([z.literal(""), z.string().trim().url("Enter a valid URL").max(2048)]),
  repositoryUrl: z.union([z.literal(""), z.string().trim().url("Enter a valid URL").max(2048)]),
});

type ProjectShowcaseSubmissionFormValues = z.infer<
  typeof projectShowcaseSubmissionSchema
>;
type ProjectShowcaseSubmissionFormInput = z.input<typeof projectShowcaseSubmissionSchema>;
type ProjectShowcaseFormControl = UseFormReturn<ProjectShowcaseSubmissionFormInput>["control"];
type ProjectShowcaseProgressStep = {
  id: string;
  title: string;
  complete: boolean;
};
type ProjectShowcaseTextFieldName =
  | "fullName"
  | "email"
  | "phoneNumber"
  | "department"
  | "degreeProgram"
  | "projectTitle"
  | "expectedStartDate"
  | "expectedEndDate"
  | "projectUrl"
  | "demoUrl"
  | "repositoryUrl";
type ProjectShowcaseTextareaFieldName =
  | "projectSummary"
  | "problemStatement"
  | "currentProgress"
  | "expectedImpact"
  | "inspiration"
  | "supportUse"
  | "beneficiaries";

const booleanOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

function ProjectShowcaseProgress({
  steps,
}: {
  steps: ProjectShowcaseProgressStep[];
}) {
  const completedSteps = steps.filter((step) => step.complete).length;
  const progressPercentage = Math.round((completedSteps / steps.length) * 100);
  const currentStepIndex = steps.findIndex((step) => !step.complete);
  const currentStep =
    currentStepIndex >= 0 ? steps[currentStepIndex] : steps[steps.length - 1];
  const visibleStepNumber =
    currentStepIndex >= 0 ? currentStepIndex + 1 : steps.length;

  return (
    <section className="sticky top-0 z-20 -mx-4 border-b border-[#f1dddd] bg-white/95 px-4 py-3 backdrop-blur md:top-4 md:mx-0 md:rounded-3xl md:border md:bg-[linear-gradient(180deg,#fffafa_0%,#fff7f6_100%)] md:px-5 md:py-5 md:shadow-[0_20px_50px_-40px_rgba(181,34,33,0.4)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-text-link">
            <NotebookPenIcon className="h-4 w-4 shrink-0" />
            <Text size="xs" weight="medium" className="uppercase tracking-[0.18em]">
              Project Submission
            </Text>
          </div>
          <Text as="p" weight="semibold" className="mt-2 text-base text-text">
            Tell us about your project
          </Text>
          <Text size="xs" className="mt-1 text-text-muted">
            Step {visibleStepNumber} of {steps.length}
          </Text>
        </div>

        <Text
          as="p"
          weight="semibold"
          className="shrink-0 text-sm text-text md:text-base"
        >
          {progressPercentage}%
        </Text>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#f6e8e7]">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="mt-2 flex items-center gap-2 text-text-muted">
        <CheckCircle2Icon className="h-3.5 w-3.5 shrink-0" />
        <Text size="xs" className="min-w-0">
          {currentStep.complete ? "Ready to submit" : currentStep.title}
        </Text>
      </div>
    </section>
  );
}

function ProjectShowcaseFormSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-3xl border border-[#f3dfdf] bg-[#fffdfc] p-4 md:space-y-5 md:rounded-[28px] md:p-6">
      <div className="space-y-2">
        <Text
          as="p"
          size="xs"
          weight="semibold"
          className="uppercase tracking-[0.16em] text-text-link"
        >
          {eyebrow}
        </Text>
        <Text as="h2" weight="semibold" className="text-base text-text md:text-lg">
          {title}
        </Text>
        {description ? (
          <Text size="sm" className="max-w-2xl leading-6 text-text-muted">
            {description}
          </Text>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function ProjectShowcaseFormTextField({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: {
  control: ProjectShowcaseFormControl;
  name: ProjectShowcaseTextFieldName;
  label: string;
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-text">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              value={typeof field.value === "string" ? field.value : ""}
              placeholder={placeholder}
              customSize="lg"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ProjectShowcaseFormTextareaField({
  control,
  name,
  label,
  placeholder,
  optional = false,
}: {
  control: ProjectShowcaseFormControl;
  name: ProjectShowcaseTextareaFieldName;
  label: string;
  placeholder?: string;
  optional?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-text">
            {label}
            {optional ? (
              <span className="ml-2 text-xs font-normal text-text-muted">Optional</span>
            ) : null}
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              value={typeof field.value === "string" ? field.value : ""}
              placeholder={placeholder}
              className="min-h-32 text-sm"
              size="sm"
              variant="noFocus"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ProjectShowcaseBooleanField({
  control,
  name,
  label,
  placeholder,
}: {
  control: ProjectShowcaseFormControl;
  name: "willProvideUpdates" | "consentToFeature";
  label: string;
  placeholder: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-text">{label}</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(value === "true")}
            value={typeof field.value === "boolean" ? String(field.value) : undefined}
          >
            <FormControl>
              <SelectTrigger className="h-10 text-sm">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {booleanOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ProjectShowcaseInstitutionField({
  control,
  institutions,
  isLoading,
  hasError,
  setValue,
}: {
  control: ProjectShowcaseFormControl;
  institutions: { id: number; name: string }[];
  isLoading: boolean;
  hasError: boolean;
  setValue: UseFormReturn<ProjectShowcaseSubmissionFormInput>["setValue"];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const institutionOptions = useMemo(
    () =>
      [...institutions]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((institution) => ({
          id: institution.id,
          label: institution.name,
        })),
    [institutions],
  );

  const findExactInstitutionMatch = (inputValue: string) => {
    const normalizedValue = inputValue.trim().toLowerCase();

    return institutionOptions.find(
      (institution) => institution.label.trim().toLowerCase() === normalizedValue,
    );
  };

  return (
    <FormField
      control={control}
      name="institutionInput"
      render={({ field }) => {
        const normalizedQuery = field.value.trim().toLowerCase();
        const filteredInstitutions = normalizedQuery
          ? institutionOptions
              .filter((institution) =>
                institution.label.toLowerCase().includes(normalizedQuery),
              )
              .slice(0, 20)
          : [];

        const syncInstitutionValue = (inputValue: string) => {
          const normalizedValue = inputValue.trim();

          if (!normalizedValue) {
            setValue("institutionInput", "", {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
            setValue("institutionId", undefined, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
            setIsOpen(false);
            return;
          }

          const matchedInstitution = findExactInstitutionMatch(normalizedValue);
          setValue("institutionInput", normalizedValue, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
          setValue(
            "institutionId",
            matchedInstitution ? matchedInstitution.id : undefined,
            {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            },
          );
          setIsOpen(false);
        };

        useEffect(() => {
          const handlePointerDown = (event: MouseEvent) => {
            if (
              containerRef.current &&
              !containerRef.current.contains(event.target as Node)
            ) {
              setIsOpen(false);
              syncInstitutionValue(field.value);
            }
          };

          document.addEventListener("mousedown", handlePointerDown);

          return () => {
            document.removeEventListener("mousedown", handlePointerDown);
          };
        }, [field.value]);

        return (
          <FormItem>
            <FormLabel className="text-sm font-medium text-text">
              University or institution
            </FormLabel>
            <FormControl>
              <div ref={containerRef} className="relative">
                <Input
                  value={field.value}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    setValue("institutionInput", nextValue, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    });

                    const matchedInstitution =
                      findExactInstitutionMatch(nextValue);

                    setValue(
                      "institutionId",
                      matchedInstitution ? matchedInstitution.id : undefined,
                      {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      },
                    );
                    setIsOpen(true);
                  }}
                  onFocus={() => setIsOpen(true)}
                  placeholder={
                    isLoading
                      ? "Loading institutions..."
                      : hasError
                        ? "Type to add institution"
                        : "Type to search or add institution"
                  }
                  customSize="lg"
                  className="pr-11"
                />
                <button
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setIsOpen((open) => !open);
                  }}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-text-dim"
                  aria-label="Toggle institution suggestions"
                >
                  <ChevronDownIcon className="h-4 w-4" />
                </button>

                {isOpen && !isLoading && normalizedQuery ? (
                  <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.28)]">
                    {filteredInstitutions.length > 0 ? (
                      <div className="max-h-56 overflow-y-auto overscroll-contain py-1 sm:max-h-64">
                        {filteredInstitutions.map((institution) => (
                          <button
                            key={institution.id}
                            type="button"
                            onMouseDown={(event) => {
                              event.preventDefault();
                              syncInstitutionValue(institution.label);
                            }}
                            className="flex w-full items-center px-4 py-3 text-left text-sm leading-5 text-text transition hover:bg-neutral-50"
                          >
                            {institution.label}
                          </button>
                        ))}
                      </div>
                    ) : field.value.trim() ? (
                      <div className="px-4 py-3 text-sm leading-5 text-text-muted">
                        No match found. Keep typing to add it.
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default function ProjectShowcaseSubmissionForm() {
  const [submittedProjectTitle, setSubmittedProjectTitle] = useState<string | null>(null);
  const form = useForm<ProjectShowcaseSubmissionFormInput>({
    resolver: zodResolver(projectShowcaseSubmissionSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      institutionId: undefined,
      institutionInput: "",
      department: "",
      degreeProgram: "",
      projectTitle: "",
      projectSummary: "",
      problemStatement: "",
      currentProgress: "",
      expectedImpact: "",
      expectedStartDate: "",
      expectedEndDate: "",
      willProvideUpdates: undefined,
      consentToFeature: undefined,
      inspiration: "",
      supportUse: "",
      beneficiaries: "",
      projectUrl: "",
      demoUrl: "",
      repositoryUrl: "",
    },
  });
  const institutionsQuery = useGetInstitutions();
  const createProjectShowcaseSubmission =
    useCreateProjectShowcaseSubmission();

  const isLookupLoading = institutionsQuery.isLoading;
  const isSubmitting =
    form.formState.isSubmitting ||
    createProjectShowcaseSubmission.isPending;
  const watchedApplicant = {
    fullName: form.watch("fullName") ?? "",
    email: form.watch("email") ?? "",
    phoneNumber: form.watch("phoneNumber") ?? "",
    institutionId: form.watch("institutionId"),
    institutionInput: form.watch("institutionInput") ?? "",
    department: form.watch("department") ?? "",
    degreeProgram: form.watch("degreeProgram") ?? "",
  };
  const watchedProjectCase = {
    projectTitle: form.watch("projectTitle") ?? "",
    projectSummary: form.watch("projectSummary") ?? "",
    problemStatement: form.watch("problemStatement") ?? "",
    currentProgress: form.watch("currentProgress") ?? "",
    expectedImpact: form.watch("expectedImpact") ?? "",
  };
  const watchedReadiness = {
    expectedStartDate: form.watch("expectedStartDate") ?? "",
    expectedEndDate: form.watch("expectedEndDate") ?? "",
  };
  const watchedPermissions = {
    willProvideUpdates: form.watch("willProvideUpdates"),
    consentToFeature: form.watch("consentToFeature"),
  };
  const progressSteps: ProjectShowcaseProgressStep[] = [
    {
      id: "applicant",
      title: "Applicant details",
      complete: Boolean(
        watchedApplicant.fullName.trim() &&
          watchedApplicant.email.trim() &&
          watchedApplicant.phoneNumber.trim() &&
          watchedApplicant.institutionInput.trim() &&
          watchedApplicant.department.trim() &&
          watchedApplicant.degreeProgram.trim(),
      ),
    },
    {
      id: "project-case",
      title: "Project case",
      complete: Boolean(
        watchedProjectCase.projectTitle.trim() &&
          watchedProjectCase.projectSummary.trim() &&
          watchedProjectCase.problemStatement.trim() &&
          watchedProjectCase.currentProgress.trim() &&
          watchedProjectCase.expectedImpact.trim(),
      ),
    },
    {
      id: "readiness",
      title: "Readiness",
      complete: Boolean(
        watchedReadiness.expectedStartDate.trim() &&
          watchedReadiness.expectedEndDate.trim(),
      ),
    },
    {
      id: "permissions",
      title: "Permissions",
      complete:
        typeof watchedPermissions.willProvideUpdates === "boolean" &&
        typeof watchedPermissions.consentToFeature === "boolean",
    },
  ];

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const payload: ProjectShowcaseSubmissionFormValues =
        projectShowcaseSubmissionSchema.parse(values);
      const response =
        await createProjectShowcaseSubmission.mutateAsync(payload);

      setSubmittedProjectTitle(response.data.projectTitle);
      toast.success("Submission received", {
        description: response.message,
      });

      form.reset({
        fullName: "",
        email: "",
        phoneNumber: "",
        institutionId: undefined,
        institutionInput: "",
        department: "",
        degreeProgram: "",
        projectTitle: "",
        projectSummary: "",
        problemStatement: "",
        currentProgress: "",
        expectedImpact: "",
        expectedStartDate: "",
        expectedEndDate: "",
        willProvideUpdates: undefined,
        consentToFeature: undefined,
        inspiration: "",
        supportUse: "",
        beneficiaries: "",
        projectUrl: "",
        demoUrl: "",
        repositoryUrl: "",
      });
    } catch (error) {
      const message = isAxiosError<{ error?: string; message?: string }>(error)
        ? error.response?.data?.error ||
          error.response?.data?.message ||
          "We couldn't submit your project right now."
        : "We couldn't submit your project right now.";

      toast.error("Submission failed", { description: message });
    }
  });

  return (
    <section id="project-showcase-submission-form" className="grid gap-6">
      <ProjectShowcaseProgress steps={progressSteps} />

      {submittedProjectTitle ? (
        <section className="rounded-3xl border border-[#d9eadf] bg-[#f4fbf6] px-4 py-3 text-sm text-[#166534] md:rounded-[28px]">
          <span className="font-semibold">{submittedProjectTitle}</span> has been submitted for
          review.
        </section>
      ) : null}

      {institutionsQuery.isError && !isLookupLoading ? (
        <section className="rounded-3xl border border-[#f0d8d8] bg-[#fff6f5] px-4 py-3 text-sm text-text-muted md:rounded-[28px]">
          We couldn&apos;t load the existing institution list right now. You can still type your institution manually.
        </section>
      ) : null}

      <Form {...form}>
        <form className="space-y-5" onSubmit={handleSubmit}>
              <ProjectShowcaseFormSection
                eyebrow="Applicant"
                title="Who is leading this work?"
                description="If this is a team project, one lead applicant can submit on behalf of the group."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <ProjectShowcaseFormTextField
                    control={form.control}
                    name="fullName"
                    label="Full name"
                    placeholder="Your full name"
                  />
                  <ProjectShowcaseFormTextField
                    control={form.control}
                    name="email"
                    label="Email address"
                    placeholder="you@example.com"
                    type="email"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <ProjectShowcaseFormTextField
                    control={form.control}
                    name="phoneNumber"
                    label="WhatsApp or phone number"
                    placeholder="Include country code"
                  />
                  <ProjectShowcaseInstitutionField
                    control={form.control}
                    institutions={institutionsQuery.data ?? []}
                    isLoading={isLookupLoading}
                    hasError={Boolean(institutionsQuery.isError)}
                    setValue={form.setValue}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <ProjectShowcaseFormTextField
                    control={form.control}
                    name="department"
                    label="Department or field of study"
                    placeholder="Economics, Computer Science, Public Health..."
                  />
                  <ProjectShowcaseFormTextField
                    control={form.control}
                    name="degreeProgram"
                    label="Degree program"
                    placeholder="BSc, MSc, MPhil, PhD..."
                  />
                </div>
              </ProjectShowcaseFormSection>

              <ProjectShowcaseFormSection
                eyebrow="Project Case"
                title="What is the project, and why should it matter?"
              >
                <div className="space-y-4">
                  <ProjectShowcaseFormTextField
                    control={form.control}
                    name="projectTitle"
                    label="Project title"
                  />

                  <ProjectShowcaseFormTextareaField
                    control={form.control}
                    name="projectSummary"
                    label="Concise project overview"
                  />

                  <ProjectShowcaseFormTextareaField
                    control={form.control}
                    name="problemStatement"
                    label="What question, challenge, or opportunity does this project address, and why is it important?"
                  />

                  <ProjectShowcaseFormTextareaField
                    control={form.control}
                    name="currentProgress"
                    label="What progress has already been made?"
                  />

                  <ProjectShowcaseFormTextareaField
                    control={form.control}
                    name="expectedImpact"
                    label="What impact could this project have in your field, institution, or community?"
                  />
                </div>
              </ProjectShowcaseFormSection>

              <ProjectShowcaseFormSection
                eyebrow="Readiness"
                title="What comes next?"
                description="A modest but realistic forward plan helps us assess readiness and trajectory."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <ProjectShowcaseFormTextField
                    control={form.control}
                    name="expectedStartDate"
                    label="Expected start date"
                    type="date"
                  />
                  <ProjectShowcaseFormTextField
                    control={form.control}
                    name="expectedEndDate"
                    label="Expected completion date"
                    type="date"
                  />
                </div>

                <div className="space-y-4">
                  <ProjectShowcaseFormTextareaField
                    control={form.control}
                    name="supportUse"
                    label="If selected, how would modest catalytic support help move this work forward?"
                    placeholder="Optional, but helpful if support would unlock a concrete next step."
                    optional
                  />

                  <ProjectShowcaseFormTextareaField
                    control={form.control}
                    name="beneficiaries"
                    label="Who stands to benefit most from this project?"
                    optional
                  />

                  <ProjectShowcaseFormTextareaField
                    control={form.control}
                    name="inspiration"
                    label="What motivated this project?"
                    placeholder="Share the origin story if it helps explain the work."
                    optional
                  />
                </div>
              </ProjectShowcaseFormSection>

              <ProjectShowcaseFormSection
                eyebrow="Supporting Materials"
                title="Optional links and permissions"
              >
                <div className="grid gap-4 md:grid-cols-3">
                  <ProjectShowcaseFormTextField
                    control={form.control}
                    name="projectUrl"
                    label="Project URL"
                    placeholder="https://..."
                  />
                  <ProjectShowcaseFormTextField
                    control={form.control}
                    name="demoUrl"
                    label="Demo URL"
                    placeholder="https://..."
                  />
                  <ProjectShowcaseFormTextField
                    control={form.control}
                    name="repositoryUrl"
                    label="Repository URL"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <ProjectShowcaseBooleanField
                    control={form.control}
                    name="willProvideUpdates"
                    label="If selected, would you be willing to share brief progress updates?"
                    placeholder="Select one"
                  />
                  <ProjectShowcaseBooleanField
                    control={form.control}
                    name="consentToFeature"
                    label="If selected, do you consent to the project being featured on our website or social channels?"
                    placeholder="Select one"
                  />
                </div>

                <div className="flex flex-col gap-4 border-t border-[#f3e0e0] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <Text size="sm" className="max-w-xl leading-6 text-text-muted">
                    We understand some excellent projects will not yet have a public demo or
                    repository. Strong thinking and credible progress matter more than polished
                    links.
                  </Text>

                  <Button
                    type="submit"
                    size="lg"
                    className={cn("w-full sm:min-w-52 sm:w-auto", isSubmitting && "cursor-wait")}
                    disabled={isSubmitting || isLookupLoading}
                  >
                    {isSubmitting ? <Loader2Icon className="h-4 w-4 animate-spin" /> : null}
                    Submit project
                  </Button>
                </div>
              </ProjectShowcaseFormSection>
        </form>
      </Form>
    </section>
  );
}
