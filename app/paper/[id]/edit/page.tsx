"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import useGetFieldCategories from "@/domains/fields/hooks/use-get-field-categories";
import useGetFields from "@/domains/fields/hooks/use-get-fields";
import useGetPaper from "@/domains/paper/hooks/use-get-paper";
import useUpdatePaper from "@/domains/paper/hooks/use-update-paper";
import { Keyword } from "@/domains/paper/types";
import { $http } from "@/lib/http";
import { paperKeys } from "@/lib/react-query/query-keys";
import { cn } from "@/lib/utils/css";

const editPaperSchema = z.object({
  title: z.string().trim().min(2, { message: "Title is required" }).max(250),
  abstract: z.string().min(1, { message: "Abstract is required" }).max(2000),
  categoryId: z
    .number({ message: "Category is required" })
    .positive({ message: "Category is required" }),
  notes: z.string().max(2000).optional(),
  fieldId: z
    .number({ message: "Field is required" })
    .positive({ message: "Field is required" }),
});

type EditPaperFormFields = z.infer<typeof editPaperSchema>;

type EditProgressStep = {
  id: string;
  title: string;
  description: string;
  complete: boolean;
};

type SectionCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <Card className="border-[#f0d8d8] bg-white shadow-[0_18px_48px_-34px_rgba(181,34,33,0.32)]">
      <CardHeader className="space-y-3 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-base text-text">{title}</CardTitle>
          {description ? (
            <CardDescription className="text-sm leading-6 text-text-muted">
              {description}
            </CardDescription>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

function StatusPill({
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

function EditDesktopSummary({ steps }: { steps: EditProgressStep[] }) {
  const completedSteps = steps.filter((step) => step.complete).length;
  const progressPercentage = Math.round((completedSteps / steps.length) * 100);

  return (
    <div className="sticky top-8 hidden h-fit lg:block">
      <Card className="overflow-hidden border-[#f0d8d8] bg-white shadow-[0_24px_60px_-38px_rgba(181,34,33,0.35)]">
        <div className="border-b border-[#f5e2e2] bg-[linear-gradient(180deg,#fffafa_0%,#fff7f6_100%)] px-6 py-5">
          <div className="flex items-center gap-2 text-text-link">
            <SparklesIcon className="h-4 w-4" />
            <Text
              size="xs"
              weight="medium"
              className="uppercase tracking-[0.18em]"
            >
              Edit Progress
            </Text>
          </div>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <Text as="p" weight="semibold" className="text-base text-text">
                {progressPercentage === 100
                  ? "Ready to save"
                  : "Updating your paper"}
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
                    {step.complete ? (
                      <CheckCircle2Icon className="h-3.5 w-3.5" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  {index < steps.length - 1 ? (
                    <div className="mt-1 h-8 w-px bg-[#f0dede]" />
                  ) : null}
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

function EditPaperSkeleton() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-[1440px] p-container-base md:p-container-lg">
        <div className="space-y-6">
          <div className="hidden h-14 animate-pulse rounded-2xl bg-[#f7ecec] md:block" />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_340px] xl:grid-cols-[minmax(0,1.15fr)_360px]">
            <div className="space-y-6">
              <div className="h-36 animate-pulse rounded-2xl bg-[#fbf1f1]" />
              <div className="h-64 animate-pulse rounded-2xl bg-white shadow-sm" />
              <div className="h-56 animate-pulse rounded-2xl bg-white shadow-sm" />
              <div className="h-48 animate-pulse rounded-2xl bg-white shadow-sm" />
            </div>
            <div className="hidden h-80 animate-pulse rounded-2xl bg-white shadow-sm lg:block" />
          </div>
        </div>
      </div>
    </div>
  );
}

function EditPaper() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: paper, isPending: isPaperLoading } = useGetPaper({ id });

  const [selectedKeywords, setSelectedKeywords] = useState<
    CreateableSelectValue[]
  >([]);
  const [newKeywords, setNewKeywords] = useState<CreateableSelectValue[]>([]);
  const [selectedFieldName, setSelectedFieldName] = useState<string>();
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>();
  const hasHydratedForm = useRef(false);
  const initialKeywordIdsRef = useRef<number[]>([]);
  const createdKeywordMapRef = useRef<Map<string, string>>(new Map());

  const form = useForm<EditPaperFormFields>({
    resolver: zodResolver(editPaperSchema),
    mode: "onChange",
  });

  const { data: fields } = useGetFields();
  const watchedFieldId = form.watch("fieldId");
  const watchedTitle = form.watch("title") ?? "";
  const watchedAbstract = form.watch("abstract") ?? "";
  const watchedNotes = form.watch("notes") ?? "";
  const {
    data: selectedFieldCategories,
    isPending: isLoadingSelectedFieldCategories,
  } = useGetFieldCategories({
    fieldId: watchedFieldId,
  });
  const { mutate: updatePaper, isPending: isUpdatingPaper } = useUpdatePaper();

  const fieldNameToIdMap = useMemo(() => {
    if (!fields) {
      return {} as Record<string, number>;
    }

    return fields.reduce((acc, field) => {
      acc[field.name] = field.id;
      return acc;
    }, {} as Record<string, number>);
  }, [fields]);

  const categoryNameToIdMap = useMemo(() => {
    if (!selectedFieldCategories) {
      return {} as Record<string, number>;
    }

    return selectedFieldCategories.reduce((acc, category) => {
      acc[category.name] = category.id;
      return acc;
    }, {} as Record<string, number>);
  }, [selectedFieldCategories]);

  useEffect(() => {
    if (!paper || hasHydratedForm.current) {
      return;
    }

    const fieldId = paper.field.id;
    const categoryId = paper.categoryId;

    initialKeywordIdsRef.current = Array.from(
      new Set((paper.keywords ?? []).map((keyword) => keyword.id)),
    );
    createdKeywordMapRef.current.clear();

    form.reset({
      title: paper.title,
      abstract: paper.abstract,
      notes: paper.notes ?? "",
      fieldId,
      categoryId,
    });

    setSelectedKeywords(
      (paper.keywords ?? []).map((keyword) => ({
        label: keyword.name,
        value: keyword.id.toString(),
      })),
    );
    setNewKeywords([]);
    setSelectedFieldName(paper.field.name);
    setSelectedCategoryName(paper.category.name);
    hasHydratedForm.current = true;
  }, [paper, form]);

  const progressSteps: EditProgressStep[] = [
    {
      id: "details",
      title: "Paper details",
      description: "Keep the title and abstract clear and up to date.",
      complete: Boolean(watchedTitle.trim() && watchedAbstract.trim()),
    },
    {
      id: "classification",
      title: "Classification",
      description: "Field and category help readers locate the paper quickly.",
      complete: Boolean(watchedFieldId && form.watch("categoryId")),
    },
    {
      id: "keywords",
      title: "Keywords",
      description: "Keywords improve search and related-paper discovery.",
      complete: selectedKeywords.length > 0,
    },
    {
      id: "notes",
      title: "Local relevance",
      description: "Notes help contextualize the paper for your audience.",
      complete: Boolean(watchedNotes.trim()),
    },
  ];

  const onSubmit = (values: EditPaperFormFields) => {
    if (!paper) return;

    if (selectedKeywords.length === 0) {
      toast.error("Add at least one keyword");
      return;
    }

    const initialKeywordIds = initialKeywordIdsRef.current;
    const selectedExistingKeywordIds = Array.from(
      new Set(
        selectedKeywords
          .filter((keyword) => !createdKeywordMapRef.current.has(keyword.value))
          .map((keyword) => Number(keyword.value))
          .filter((keywordId) => Number.isInteger(keywordId) && keywordId > 0),
      ),
    );

    const addedKeywords = selectedExistingKeywordIds.filter(
      (keywordId) => !initialKeywordIds.includes(keywordId),
    );

    const removedKeywords = initialKeywordIds.filter(
      (keywordId) => !selectedExistingKeywordIds.includes(keywordId),
    );

    const trimmedNewKeywords = Array.from(
      new Set(
        newKeywords
          .map((keyword) => keyword.label.trim())
          .filter((keyword) => keyword.length > 0),
      ),
    );

    updatePaper(
      {
        paperId: paper.id,
        ...values,
        notes: values.notes ?? undefined,
        addedKeywords,
        removedKeywords,
        newKeywords: trimmedNewKeywords.length ? trimmedNewKeywords : undefined,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: paperKeys.all });
          toast.success("Paper updated successfully");
          router.push(`/paper/${id}`);
        },
        onError: (err) => {
          if (isAxiosError(err)) {
            toast.error(`Paper update failed. ${String(err.response?.data)}`);
          } else {
            toast.error(
              `Paper update failed. ${
                err instanceof Error ? err.message : "Unknown error"
              }`,
            );
          }
        },
      },
    );
  };

  const handleKeywordSearch = async (
    searchVal: string,
    setOptions: (options: SelectValueBase[]) => void,
  ) => {
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

  if (isPaperLoading && !paper) {
    return <EditPaperSkeleton />;
  }

  if (!paper) {
    return <div>404</div>;
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-[1440px] p-container-base md:p-container-lg">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_340px] xl:grid-cols-[minmax(0,1.15fr)_360px]">
          <section className="space-y-6">
            <Card className="border-[#f0d8d8] bg-[linear-gradient(180deg,#fff9f8_0%,#ffffff_100%)] shadow-[0_22px_60px_-44px_rgba(181,34,33,0.45)]">
              <CardContent className="space-y-4 p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
                  <Link
                    href="/dashboard/manage-papers"
                    className="text-sm text-gray-600 transition-colors hover:text-[#B52221]"
                  >
                    ← Back to manage papers
                  </Link>

                  <div className="max-w-xl text-left">
                    <Text
                      size="lg"
                      weight="semibold"
                      className="leading-tight"
                    >
                      {paper.title}
                    </Text>
                    <Text
                      size="xs"
                      className="mt-1 uppercase tracking-wide text-gray-600"
                    >
                      Editing
                    </Text>
                  </div>

                  <Text className="text-sm font-semibold text-[#B52221]">
                    <Link href={`/paper/${id}`} className="hover:underline">
                      View published version
                    </Link>
                  </Text>
                </div>
              </CardContent>
            </Card>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <SectionCard
                  title="Paper details"
                  description="Update the title and abstract readers will see first."
                >
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-bold text-text md:text-lg">
                            Research Title
                          </Label>
                          <input
                            {...field}
                            required
                            placeholder="Use the full title"
                            className="flex h-11 w-full rounded-md border-0 bg-[#fffdfd] px-[13px] py-2 text-xs text-text shadow-sm ring-1 ring-[#edd5d5] placeholder:text-text-dim transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          />
                          <div className="flex justify-end">
                            <Text size="xs" className="text-text-dim">
                              {watchedTitle.length}/250
                            </Text>
                          </div>
                        </div>
                      )}
                    />

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
                            placeholder="Copy, paste, or type here"
                            className="min-h-[180px] rounded-md border-0 bg-[#fffdfd] px-4 py-3 text-sm leading-6 ring-1 ring-[#edd5d5] placeholder:text-text-dim"
                            required
                            {...field}
                          />
                          <div className="flex items-center justify-end gap-3">
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
                  description="Keep the paper grouped under the right field and category."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    {hasHydratedForm.current ? (
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-bold text-text md:text-lg">
                          Primary Field
                        </Label>
                        <Select
                          value={selectedFieldName}
                          onValueChange={(value: string) => {
                            setSelectedFieldName(value);
                            const fieldId = fieldNameToIdMap[value];

                            form.setValue("fieldId", fieldId, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                            setSelectedCategoryName(undefined);
                            form.setValue(
                              "categoryId",
                              undefined as unknown as number,
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              },
                            );
                          }}
                        >
                          <SelectTrigger className="h-11 border-0 bg-[#fffdfd] text-sm ring-1 ring-[#edd5d5]">
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[50vh] bg-white text-text md:max-h-96">
                            {fields?.map((field) => (
                              <SelectItem
                                key={field.id}
                                value={field.name}
                                className="py-2 text-sm hover:bg-[#F3E7E780] md:py-1.5"
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
                    ) : null}

                    {hasHydratedForm.current ? (
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-bold text-text md:text-lg">
                          Category
                        </Label>
                        <Select
                          value={selectedCategoryName}
                          onValueChange={(value: string) => {
                            setSelectedCategoryName(value);
                            const categoryId = categoryNameToIdMap[value];
                            form.setValue("categoryId", categoryId, {
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
                          <SelectContent className="max-h-[50vh] bg-white text-text md:max-h-96">
                            {isLoadingSelectedFieldCategories ? (
                              <Text size="xs" className="px-4 py-2 text-center">
                                Loading...
                              </Text>
                            ) : selectedFieldCategories ? (
                              selectedFieldCategories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.name}
                                  className="py-2 text-sm hover:bg-[#F3E7E780] md:py-1.5"
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
                    ) : null}
                  </div>
                </SectionCard>

                <SectionCard
                  title="Keywords"
                  description="Update the terms that help people discover this paper."
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
                      handleChange={(value, meta) => {
                        if (meta?.action === "create-option" && meta.option) {
                          createdKeywordMapRef.current.set(
                            meta.option.value,
                            meta.option.label,
                          );
                        }

                        const nextSelected = value.map((val) => ({
                          value: val.value,
                          label: val.label,
                        }));
                        setSelectedKeywords(nextSelected);

                        const createdSelections = value
                          .filter((option) =>
                            createdKeywordMapRef.current.has(option.value),
                          )
                          .map((option) => ({
                            value: option.value,
                            label:
                              createdKeywordMapRef.current.get(option.value) ??
                              option.label,
                          }));

                        setNewKeywords(createdSelections);
                      }}
                      placeholder="Type to search or add keyword"
                      className="rounded-md bg-white px-2 text-text-dim placeholder:text-xs"
                    />

                    <div className="flex items-center justify-between gap-3">
                      <Text size="xs" className="text-text-muted">
                        Keep the most relevant discovery terms attached to this paper.
                      </Text>
                      <StatusPill
                        isComplete={selectedKeywords.length > 0}
                        label={
                          selectedKeywords.length > 0
                            ? `${selectedKeywords.length} selected`
                            : "Required"
                        }
                      />
                    </div>

                    {form.formState.isSubmitted &&
                    selectedKeywords.length === 0 ? (
                      <Text className="text-xs text-rose-600">
                        Keywords are required
                      </Text>
                    ) : null}
                  </div>
                </SectionCard>

                <SectionCard
                  title="Local relevance / application"
                  description="Revise any context or practical notes tied to this paper."
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
                        <div className="flex justify-end gap-3">
                          <Text size="xs" className="text-text-dim">
                            {watchedNotes.length}/2000
                          </Text>
                        </div>
                      </div>
                    )}
                  />
                </SectionCard>

                <SectionCard title="PDF document">
                  <div className="rounded-xl border border-[#f3dfdf] bg-[#fffafa] p-4">
                    <Text as="p" weight="medium" className="text-sm text-text">
                      Need to update the PDF?
                    </Text>
                    <Text size="sm" className="mt-2 leading-6 text-text-muted">
                      Please email{" "}
                      <a
                        href="mailto:info.nubianresearch@gmail.com"
                        className="font-semibold text-primary hover:underline"
                      >
                        info.nubianresearch@gmail.com
                      </a>{" "}
                      and our team will help replace the document.
                    </Text>
                  </div>
                </SectionCard>

                <div className="flex items-center justify-start gap-4 pt-2">
                  <Button
                    type="button"
                    className="min-w-28 cursor-pointer border-[#e7d4d4] bg-white text-xs text-text hover:bg-[#faf6f6] md:text-sm"
                    variant="outline"
                    disabled={isUpdatingPaper}
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUpdatingPaper}
                    variant="destructive"
                    className="min-w-36 cursor-pointer shadow-[0_14px_28px_-18px_rgba(181,34,33,0.75)] text-xs md:text-sm"
                  >
                    {isUpdatingPaper ? (
                      <Loader2Icon size={16} className="animate-spin" />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </section>

          <EditDesktopSummary steps={progressSteps} />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <RouteGuard>
      <EditPaper />
    </RouteGuard>
  );
}
