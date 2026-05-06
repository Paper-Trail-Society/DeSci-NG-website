"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  Loader2Icon,
  SparklesIcon,
} from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";

import { RouteGuard } from "@/components/auth/route-guard";
import DashboardPaperNav from "@/components/shared/dashboard-paper-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MultiSelect,
  SelectValueBase,
  type SelectValue as CreateableSelectValue,
} from "@/components/ui/createable-select";
import { Form, FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import TextField from "@/components/ui/text-field";
import { Textarea } from "@/components/ui/textarea";
import useGetFieldCategories from "@/domains/fields/hooks/use-get-field-categories";
import useGetFields from "@/domains/fields/hooks/use-get-fields";
import useUploadPaper from "@/domains/paper/hooks/use-upload-paper";
import { Keyword } from "@/domains/paper/types";
import { $http } from "@/lib/http";
import { cn } from "@/lib/utils/css";

const ALLOWED_FILE_TYPES = ["application/pdf"];
const MAX_FILE_SIZE_IN_BYTES = 10 * 1024 * 1024;

const uploadPaperSchema = z.object({
  title: z.string().trim().min(2, { message: "Title is required" }).max(250),
  abstract: z.string().min(1, { message: "Abstract is required" }).max(2000),
  categoryId: z.number({ message: "Category is required" }),
  notes: z.string().max(2000).optional(),
  fieldId: z.number({ message: "Field is required" }),
});

type UploadPaperFormFields = z.infer<typeof uploadPaperSchema>;

type UploadProgressStep = {
  id: string;
  title: string;
  description: string;
  complete: boolean;
};

type SectionCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function SectionCard({
  title,
  description,
  children,
}: SectionCardProps) {
  return (
    <Card className="border-[#f0d8d8] bg-white shadow-[0_18px_48px_-34px_rgba(181,34,33,0.32)]">
      <CardHeader className="space-y-3 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-base text-text">{title}</CardTitle>
          <CardDescription className="text-sm leading-6 text-text-muted">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

function UploadSectionStatus({
  isComplete,
  label,
}: {
  isComplete: boolean;
  label: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
        isComplete
          ? "bg-[#edf8f1] text-[#166534]"
          : "bg-[#fff5f5] text-text-muted",
      )}
    >
      {isComplete ? (
        <CheckCircle2Icon className="h-3.5 w-3.5" />
      ) : (
        <AlertCircleIcon className="h-3.5 w-3.5" />
      )}
      {label}
    </div>
  );
}

function UploadDesktopSummary({ steps }: { steps: UploadProgressStep[] }) {
  const completedSteps = steps.filter((step) => step.complete).length;
  const progressPercentage = Math.round((completedSteps / steps.length) * 100);

  return (
    <div className="sticky top-8 hidden h-fit lg:block">
      <Card className="overflow-hidden border-[#f0d8d8] bg-white shadow-[0_24px_60px_-38px_rgba(181,34,33,0.35)]">
        <div className="border-b border-[#f5e2e2] bg-[linear-gradient(180deg,#fffafa_0%,#fff7f6_100%)] px-6 py-5">
          <div className="flex items-center gap-2 text-text-link">
            <SparklesIcon className="h-4 w-4" />
            <Text size="xs" weight="medium" className="uppercase tracking-[0.18em]">
              Upload Progress
            </Text>
          </div>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <Text as="p" weight="semibold" className="text-base text-text">
                {progressPercentage === 100 ? "Ready to publish" : "Building your paper"}
              </Text>
              <Text size="sm" className="mt-1 text-text-muted">
                {completedSteps} of {steps.length} core sections complete
              </Text>
            </div>

            <div className="text-right">
              <Text as="p" weight="semibold" className="text-2xl text-text">
                {progressPercentage}%
              </Text>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f6e8e7]">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <CardContent className="space-y-6 p-6">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
                      step.complete
                        ? "border-primary bg-primary text-white"
                        : "border-[#ead1d1] bg-white text-text-muted",
                    )}
                  >
                    {step.complete ? <CheckCircle2Icon className="h-3.5 w-3.5" /> : index + 1}
                  </div>

                  {index < steps.length - 1 && (
                    <div className="mt-1 h-8 w-px bg-[#f0dede]" />
                  )}
                </div>

                <div className="pt-0.5">
                  <Text as="p" weight="medium" className="text-sm text-text">
                    {step.title}
                  </Text>
                  <Text size="xs" className="mt-1 leading-5 text-text-muted">
                    {step.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function UploadMobileProgress({
  steps,
}: {
  steps: UploadProgressStep[];
}) {
  const completedSteps = steps.filter((step) => step.complete).length;
  const progressPercentage = Math.round((completedSteps / steps.length) * 100);
  const currentStep =
    steps.find((step) => !step.complete) ?? steps[steps.length - 1];

  return (
    <div className="sticky top-0 z-30 -mx-4 border-b border-[#f1dddd] bg-white/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Text as="p" weight="semibold" className="text-base text-text">
            Upload Paper
          </Text>
          <Text size="xs" className="mt-1 text-text-muted">
            Step {Math.min(completedSteps + 1, steps.length)} of {steps.length}
          </Text>
        </div>

        <Text as="p" weight="semibold" className="text-sm text-text">
          {progressPercentage}%
        </Text>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#f6e8e7]">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <Text size="xs" className="mt-2 text-text-muted">
        {currentStep.complete ? "Ready to publish" : currentStep.title}
      </Text>
    </div>
  );
}

function UploadPaperContent() {
  const router = useRouter();
  const [selectedKeywords, setSelectedKeywords] = useState<CreateableSelectValue[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileUploadComponentRef = useRef<HTMLInputElement>(null);

  const form = useForm<UploadPaperFormFields>({
    resolver: zodResolver(uploadPaperSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      abstract: "",
      notes: "",
    },
  });

  const { data: fields } = useGetFields();
  const selectedFieldId = form.watch("fieldId");
  const watchedTitle = form.watch("title") ?? "";
  const watchedAbstract = form.watch("abstract") ?? "";
  const watchedNotes = form.watch("notes") ?? "";

  const {
    data: selectedFieldCategories,
    isPending: isLoadingSelectedFieldCategories,
  } = useGetFieldCategories({
    fieldId: selectedFieldId,
  });
  const { mutate: uploadPaper, isPending: isUploadingPaper } = useUploadPaper();

  const selectedField = fields?.find((field) => field.id === selectedFieldId);
  const selectedCategory = selectedFieldCategories?.find(
    (category) => category.id === form.watch("categoryId"),
  );

  const progressSteps: UploadProgressStep[] = [
    {
      id: "details",
      title: "Paper details",
      description: "A strong title and abstract help readers understand the paper at a glance.",
      complete: Boolean(watchedTitle.trim() && watchedAbstract.trim()),
    },
    {
      id: "classification",
      title: "Classification",
      description: "Field and category place the paper in the right research context.",
      complete: Boolean(selectedFieldId && form.watch("categoryId")),
    },
    {
      id: "keywords",
      title: "Keywords",
      description: "Keywords improve search and make the paper easier to discover.",
      complete: selectedKeywords.length > 0,
    },
    {
      id: "upload",
      title: "Upload file",
      description: "Attach the PDF readers will open and cite.",
      complete: Boolean(selectedFile),
    },
  ];

  const onSubmit = async (values: UploadPaperFormFields) => {
    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }

    const selectedKeywordIds: string[] = [];
    const newKeywords: string[] = [];

    selectedKeywords.forEach((keyword) => {
      const keywordValueIsNaN = Number.isNaN(parseInt(keyword.value, 10));

      if (keywordValueIsNaN) {
        newKeywords.push(keyword.value);
        return;
      }

      selectedKeywordIds.push(keyword.value);
    });

    const payload = {
      ...values,
      keywords: selectedKeywordIds,
      newKeywords,
      file: selectedFile,
    };

    uploadPaper(payload, {
      onSuccess: (res) => {
        form.reset();
        if (fileUploadComponentRef.current) {
          fileUploadComponentRef.current.value = "";
        }
        setSelectedKeywords([]);
        setSelectedFile(null);

        toast.success("Paper uploaded successfully");
        router.push(`/paper/${res.data.slug}`);
      },
      onError: (err) => {
        console.error(err);
        if (isAxiosError(err)) {
          toast.error(`Paper upload failed. ${String(err.response?.data)}`);
          return;
        }

        toast.error(`Paper upload failed. ${String(err)}`);
      },
    });
  };

  const handleKeywordSearch = async (
    searchVal: string,
    setOptions: (options: SelectValueBase[]) => void,
  ) => {
    if (!searchVal || searchVal.trim().length === 0) {
      setOptions([]);
      return;
    }

    const res = await $http.get<Keyword[]>("/keywords", {
      params: { q: searchVal },
    });

    setOptions(
      res.data.map((keyword) => ({
        label: keyword.name,
        value: keyword.id.toString(),
      })),
    );
  };

  const loadKeywordOptions = useDebouncedCallback(
    (searchVal: string, setOptions: (options: SelectValueBase[]) => void) => {
      handleKeywordSearch(searchVal, setOptions);
    },
    500,
  );

  const handleSelectFile = (file?: File) => {
    if (!file) {
      return;
    }

    if (file.size > MAX_FILE_SIZE_IN_BYTES) {
      toast.error("File size should be less than or equal to 10MB");
      if (fileUploadComponentRef.current) {
        fileUploadComponentRef.current.value = "";
      }
      return;
    }

    setSelectedFile(file);
  };

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-0 md:p-container-lg">
        <UploadMobileProgress steps={progressSteps} />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_340px] xl:grid-cols-[minmax(0,1.15fr)_360px]">
          <section className="space-y-6">
            <div className="hidden md:block">
              <DashboardPaperNav />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <SectionCard
                  title="Paper details"
                  description="Your title and abstract are the first things readers will see. Make them clear and specific."
                >
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <TextField
                        control={form.control}
                        name="title"
                        label="Research Title"
                        placeholder="Enter the full title of your paper"
                        className="h-11 rounded-md border-0 bg-[#fffdfd] py-2 ring-1 ring-[#edd5d5]"
                        required
                      />
                      <div className="flex justify-end">
                        <Text size="xs" className="text-text-dim">
                          {watchedTitle.length}/250
                        </Text>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="abstract"
                      render={({ field }) => (
                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-bold text-text md:text-lg">
                            Abstract
                          </Label>
                          <Textarea
                            variant="default"
                            size="sm"
                            placeholder="Summarize the problem, approach, and key findings."
                            className="min-h-[180px] rounded-md border-0 bg-[#fffdfd] px-4 py-3 text-sm leading-6 ring-1 ring-[#edd5d5] placeholder:text-text-dim"
                            required
                            {...field}
                          />
                          <div className="flex items-center justify-between gap-3">
                            <Text size="xs" className="text-text-muted">
                              A concise abstract helps readers decide whether to open the full paper.
                            </Text>
                            <Text size="xs" className="text-text-dim">
                              {watchedAbstract.length}/2000
                            </Text>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </SectionCard>

                <SectionCard
                  title="Classification"
                  description="Choose the research field and category that best describe this paper."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-bold text-text md:text-lg">
                        Primary Field
                      </Label>
                      <Select
                        value={selectedField?.name}
                        onValueChange={(value: string) => {
                          const nextField = fields?.find((field) => field.name === value);
                          form.setValue("fieldId", nextField?.id as number, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                          form.setValue("categoryId", undefined as unknown as number, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }}
                      >
                        <SelectTrigger className="h-11 border-0 bg-[#fffdfd] text-sm ring-1 ring-[#edd5d5]">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-text">
                          {fields?.map((field) => (
                            <SelectItem
                              key={field.id}
                              value={field.name}
                              className="text-sm hover:bg-[#F3E7E780]"
                            >
                              {field.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Text className="text-xs text-rose-600">
                        {form.formState.errors.fieldId?.message}
                      </Text>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-bold text-text md:text-lg">
                        Category
                      </Label>
                      <Select
                        value={selectedCategory?.name}
                        onValueChange={(value: string) => {
                          const nextCategory = selectedFieldCategories?.find(
                            (category) => category.name === value,
                          );

                          form.setValue("categoryId", nextCategory?.id as number, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }}
                      >
                        <SelectTrigger className="h-11 border-0 bg-[#fffdfd] text-sm ring-1 ring-[#edd5d5]">
                          <SelectValue
                            placeholder={
                              selectedFieldCategories
                                ? "Select category"
                                : "Select a field first"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-text">
                          {isLoadingSelectedFieldCategories ? (
                            <Text size="xs" className="px-4 py-2 text-center">
                              Loading...
                            </Text>
                          ) : selectedFieldCategories && selectedFieldCategories.length > 0 ? (
                            selectedFieldCategories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.name}
                                className="text-sm hover:bg-[#F3E7E780]"
                              >
                                {category.name}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-center text-xs opacity-50">
                              Select a field to choose a category
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      <Text className="text-xs text-rose-600">
                        {form.formState.errors.categoryId?.message}
                      </Text>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard
                  title="Keywords"
                  description="Keywords help your research appear in search results and related paper recommendations."
                >
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-text md:text-lg">
                      Keywords that describe your research
                    </Label>
                    <MultiSelect
                      name="keywords"
                      isCreatable
                      isAsync
                      loadOptions={loadKeywordOptions}
                      value={selectedKeywords}
                      handleChange={(value) => {
                        setSelectedKeywords(
                          value.map((item) => ({
                            value: item.value,
                            label: item.label,
                          })),
                        );
                      }}
                      placeholder="Type to search or add keyword"
                      className="rounded-md bg-white px-2 text-text-dim placeholder:text-xs"
                    />
                    <div className="flex items-center justify-between gap-3">
                      <Text size="xs" className="text-text-muted">
                        Add a few specific terms readers would actually search for.
                      </Text>
                      <UploadSectionStatus
                        isComplete={selectedKeywords.length > 0}
                        label={
                          selectedKeywords.length > 0
                            ? `${selectedKeywords.length} selected`
                            : "Required"
                        }
                      />
                    </div>
                    {form.formState.isSubmitted && selectedKeywords.length === 0 && (
                      <Text className="text-xs text-rose-600">
                        Keywords are required
                      </Text>
                    )}
                  </div>
                </SectionCard>

                <SectionCard
                  title="Local relevance / application"
                  description="Optional, but useful. Explain how this research connects to your local context or practical application."
                >
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-bold text-text md:text-lg">
                          Notes
                        </Label>
                        <Textarea
                          variant="default"
                          size="sm"
                          placeholder="Share why this work matters, where it applies, or what context readers should know."
                          className="min-h-[150px] rounded-md border-0 bg-[#fffdfd] px-4 py-3 text-sm leading-6 ring-1 ring-[#edd5d5] placeholder:text-text-dim"
                          {...field}
                        />
                        <div className="flex justify-between gap-3">
                          <Text size="xs" className="text-text-muted">
                            This can help readers understand the paper&apos;s relevance faster.
                          </Text>
                          <Text size="xs" className="text-text-dim">
                            {watchedNotes.length}/2000
                          </Text>
                        </div>
                      </div>
                    )}
                  />
                </SectionCard>

                <SectionCard
                  title="Upload PDF"
                  description="Attach the paper file that readers will open from the platform."
                >
                  <div className="space-y-4">
                    <input
                      ref={fileUploadComponentRef}
                      type="file"
                      className="hidden"
                      id="file"
                      accept={ALLOWED_FILE_TYPES.join(", ")}
                      onChange={(e) => handleSelectFile(e.target.files?.[0])}
                    />

                    <button
                      type="button"
                      onClick={() => fileUploadComponentRef.current?.click()}
                      className="flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#e9c9c9] bg-[linear-gradient(180deg,#fffefe_0%,#fff7f6_100%)] px-6 py-10 text-center transition hover:border-[#d9abab] hover:bg-[#fffafa]"
                    >
                      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#f0dede]">
                        <Image
                          src="/assets/page-facing-up.png"
                          width={36}
                          height={36}
                          alt="page-facing-up"
                        />
                      </div>

                      <div className="space-y-2">
                        <Text as="p" weight="semibold" className="text-base text-text">
                          {selectedFile ? "Replace selected PDF" : "Upload your paper"}
                        </Text>
                        <Text size="sm" className="text-text-muted">
                          Click to select a PDF from your device. Maximum file size: 10MB.
                        </Text>
                      </div>
                    </button>

                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#f3dfdf] bg-[#fffafa] px-4 py-3">
                      <div>
                        <Text as="p" weight="medium" className="text-sm text-text">
                          {selectedFile ? selectedFile.name : "No file selected yet"}
                        </Text>
                        <Text size="sm" className="mt-1 text-text-muted">
                          {selectedFile
                            ? `${formatBytes(selectedFile.size)} • PDF ready for upload`
                            : "Choose a PDF to continue"}
                        </Text>
                      </div>

                      <UploadSectionStatus
                        isComplete={Boolean(selectedFile)}
                        label={selectedFile ? "Ready" : "Missing"}
                      />
                    </div>

                    {form.formState.isSubmitted && !selectedFile && (
                      <Text className="text-xs text-rose-600">Select a file</Text>
                    )}
                  </div>
                </SectionCard>

                <div className="flex items-center justify-center gap-4 pt-2 md:justify-start">
                  <Button
                    type="button"
                    className="min-w-28 cursor-pointer border-[#e7d4d4] bg-white text-xs text-text hover:bg-[#faf6f6] md:text-sm"
                    variant="outline"
                    disabled={isUploadingPaper}
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUploadingPaper}
                    variant="destructive"
                    className="min-w-36 cursor-pointer shadow-[0_14px_28px_-18px_rgba(181,34,33,0.75)] text-xs md:text-sm"
                  >
                    {isUploadingPaper ? (
                      <Loader2Icon size={16} className="animate-spin" />
                    ) : (
                      "Upload Paper"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </section>

          <UploadDesktopSummary
            steps={progressSteps}
          />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <RouteGuard>
      <UploadPaperContent />
    </RouteGuard>
  );
}
