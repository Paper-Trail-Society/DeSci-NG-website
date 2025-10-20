"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useDebouncedCallback } from "use-debounce";

import { RouteGuard } from "@/components/auth/route-guard";
import PublicNav from "@/components/shared/public-nav";
import {
  MultiSelect,
  SelectValueBase,
  type SelectValue as CreateableSelectValue,
} from "@/components/ui/createable-select";
import useGetFieldCategories from "@/domains/fields/hooks/use-get-field-categories";
import useGetFields from "@/domains/fields/hooks/use-get-fields";
import useGetPaper from "@/domains/paper/hooks/use-get-paper";
import useUpdatePaper from "@/domains/paper/hooks/use-update-paper";
import { Keyword } from "@/domains/paper/types";
import { paperKeys } from "@/lib/react-query/query-keys";
import { $http } from "@/lib/http";
import { toast } from "sonner";

const uploadPaperSchema = z.object({
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

function EditPaperSkeleton() {
  return (
    <div>
      <PublicNav />
      <div className="md:p-container-lg p-container-base">
        <section className="mx-auto flex h-full w-full max-w-4xl flex-col gap-8 rounded-2xl border border-gray-200 bg-white p-container-base shadow-sm">
          <div className="space-y-8 animate-pulse">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
              <div className="h-5 w-40 rounded-full bg-gray-200" />
              <div className="h-10 w-2/3 rounded-lg bg-gray-200" />
              <div className="h-5 w-40 rounded-full bg-gray-200" />

            <div className="space-y-6">
              <div className="h-12 w-full rounded-xl bg-gray-100" />

              <div className="flex flex-col gap-4">
                <div className="h-5 w-24 rounded bg-gray-100" />
                <div className="h-12 w-full rounded-lg bg-gray-100" />
              </div>

              <div className="flex flex-col gap-4">
                <div className="h-5 w-24 rounded bg-gray-100" />
                <div className="h-36 w-full rounded-lg bg-gray-100" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[...Array(2)].map((_, idx) => (
                  <div key={idx} className="flex flex-col gap-3">
                    <div className="h-5 w-32 rounded bg-gray-100" />
                    <div className="h-12 w-full rounded-lg bg-gray-100" />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <div className="h-5 w-56 rounded bg-gray-100" />
                <div className="h-11 w-full rounded-lg bg-gray-100" />
              </div>

              <div className="flex flex-col gap-3">
                <div className="h-5 w-48 rounded bg-gray-100" />
                <div className="h-28 w-full rounded-lg bg-gray-100" />
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="h-10 w-24 rounded-full bg-gray-100" />
                <div className="h-10 w-32 rounded-full bg-gray-100" />
              </div>
            </div>
            </div>
          </div>
        </section>
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

  type UploadPaperFormFields = z.infer<typeof uploadPaperSchema>;

  const form = useForm<UploadPaperFormFields>({
    resolver: zodResolver(uploadPaperSchema),
    mode: "onChange",
  });

  const { data: fields } = useGetFields();
  const watchedFieldId = form.watch("fieldId");
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
      new Set(paper.keywords.map((keyword) => keyword.id))
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
      paper.keywords.map((keyword) => ({
        label: keyword.name,
        value: keyword.id.toString(),
      }))
    );
    setNewKeywords([]);
    setSelectedFieldName(paper.field.name);
    setSelectedCategoryName(paper.category.name);
    hasHydratedForm.current = true;
  }, [paper]);

  const onSubmit = (values: UploadPaperFormFields) => {
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
          .filter((keywordId) => Number.isInteger(keywordId) && keywordId > 0)
      )
    );

    const addedKeywords = selectedExistingKeywordIds.filter(
      (keywordId) => !initialKeywordIds.includes(keywordId)
    );

    const removedKeywords = initialKeywordIds.filter(
      (keywordId) => !selectedExistingKeywordIds.includes(keywordId)
    );

    const trimmedNewKeywords = Array.from(
      new Set(
        newKeywords
          .map((keyword) => keyword.label.trim())
          .filter((keyword) => keyword.length > 0)
      )
    );
    updatePaper(
      {
        paperId: id,
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
              }`
            );
          }
        },
      }
    );
  };

  const handleKeywordSearch = async (
    searchVal: string,
    setOptions: (options: SelectValueBase[]) => void
  ) => {
    const res = await $http.get<Keyword[]>("/keywords", {
      params: { query: searchVal },
    });

    setOptions(
      res.data.map((keyword) => ({
        label: keyword.name,
        value: keyword.id.toString(),
      }))
    );
  };

  const loadKeywordOptions = useDebouncedCallback(
    (searchVal: string, setOptions: (options: SelectValueBase[]) => void) => {
      handleKeywordSearch(searchVal, setOptions);
    },
    500
  );

  if (isPaperLoading && !paper) {
    return <EditPaperSkeleton />;
  }

  if (!paper) {
    return <div>404</div>;
  }

  return (
    <div>
      <PublicNav />

      <div className="md:p-container-lg p-container-base">
        <section className="bg-[#F3E7E780] h-full md:w-3/5 w-full mx-auto md:px-container-md md:py-container-base p-container-base">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
            <Link
              href="/dashboard/manage-papers"
              className="text-sm text-gray-600 transition-colors hover:text-[#B52221]"
            >
              ← Back to manage papers
            </Link>

            <div className="text-center md:text-left max-w-xl">
              <Text size={"lg"} weight={"semibold"} className="leading-tight">
                {paper.title}
              </Text>
              <Text
                size={"xs"}
                className="uppercase tracking-wide text-gray-600 mt-1"
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

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 flex flex-col gap-4"
              >
                <TextField
                  control={form.control}
                  name="title"
                  label="Research Title"
                  placeholder="0/250 characters"
                  className="rounded-md bg-white py-2"
                  required
                />

                <FormField
                  control={form.control}
                  name="abstract"
                  render={({ field }) => (
                    <div className="flex flex-col gap-1">
                      <Label className="md:text-lg text-sm text-text font-bold">
                        Abstract
                      </Label>
                      <Textarea
                        variant={"noBorderAndFocus"}
                        size={"lg"}
                        placeholder="0/2000 characters"
                        className="rounded-md bg-white py-2 placeholder:text-xs"
                        required
                        {...field}
                      />
                    </div>
                  )}
                />

                <div className="md:grid md:grid-cols-2 flex flex-col gap-4">
                  {hasHydratedForm.current && (
                    <div className="flex flex-col gap-1">
                      <Label className="md:text-lg text-sm text-text font-bold">
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
                            }
                          );
                        }}
                      >
                        <SelectTrigger className="text-text text-xs ring-1 ring-neutral-300">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-text">
                          {fields?.map((field) => (
                            <SelectItem
                              key={field.id}
                              value={field.name}
                              className="text-xs hover:bg-[#F3E7E780]"
                            >
                              {field.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Text className="text-xs text-rose-600">
                        {form.formState.errors["fieldId"]?.message}
                      </Text>
                    </div>
                  )}

                  {hasHydratedForm.current && (<div className="flex flex-col gap-1">
                    <Label className="md:text-lg text-sm text-text font-bold">
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
                      <SelectTrigger className="text-text text-xs">
                        <SelectValue
                          placeholder={
                            selectedFieldCategories
                              ? "Select category"
                              : "Select a field to choose a category"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-text">
                        {isLoadingSelectedFieldCategories ? (
                          <Text size={"xs"} className="text-center">
                            Loading...
                          </Text>
                        ) : selectedFieldCategories ? (
                          selectedFieldCategories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.name}
                              className="text-xs hover:bg-[#F3E7E780]"
                            >
                              {category.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="text-xs opacity-50 px-4 py-2 text-center">
                            Select a field to choose a category
                          </div>
                        )}
                      </SelectContent>
                    </Select>

                    <Text className="text-xs text-rose-600">
                      {form.formState.errors["categoryId"]?.message}
                    </Text>
                  </div>)}
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="md:text-lg text-sm text-text font-bold">
                    Keywords (that describe your research)
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
                          meta.option.label
                        );
                      }

                      const nextSelected = value.map((val) => ({
                        value: val.value,
                        label: val.label,
                      }));
                      setSelectedKeywords(nextSelected);

                      const createdSelections = value
                        .filter((option) =>
                          createdKeywordMapRef.current.has(option.value)
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

                  {form.formState.isSubmitted &&
                    selectedKeywords.length === 0 && (
                      <Text className="text-xs text-rose-600">
                        Keywords are required
                      </Text>
                    )}
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <div className="flex flex-col gap-1">
                      <Label className="md:text-lg text-sm text-text font-bold">
                        Local relevance / Application
                      </Label>
                      <Textarea
                        variant={"noBorderAndFocus"}
                        size={"lg"}
                        placeholder="0/2000 characters"
                        className="rounded-md bg-white py-2 placeholder:text-xs"
                        required
                        {...field}
                      />
                    </div>
                  )}
                />

                <div className="rounded-md bg-white p-4 text-center">
                  <Text size={"sm"} className="text-text font-semibold">
                    Need to update the PDF?
                  </Text>
                  <Text size={"sm"} className="text-text-dim">
                    Please email{" "}
                    <a
                      href="mailto:info@desci.ng"
                      className="font-semibold text-primary hover:underline"
                    >
                     info.descing@gmail.com
                    </a>{" "}
                    and our team will help replace the document.
                  </Text>
                </div>

                <div className="md:mt-8 flex gap-4 items-center justify-center">
                  <Button
                    type="button"
                    className="bg-[#B52221CC] w-24 text-xs md:text-sm"
                    variant={"outline"}
                    disabled={isUpdatingPaper}
                    onClick={() => router.back()}
                  >
                    CANCEL
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUpdatingPaper}
                    variant={"destructive"}
                    className="text-xs md:text-sm"
                  >
                    SAVE CHANGES
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
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
