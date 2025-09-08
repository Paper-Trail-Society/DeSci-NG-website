"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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

import {
  MultiSelect,
  SelectValueBase,
  type SelectValue as CreateableSelectValue,
} from "@/components/ui/createable-select";
import { Keyword } from "@/domains/paper/types";
import { $http } from "@/lib/http";

import { useDebouncedCallback } from "use-debounce";

import { RouteGuard } from "@/components/auth/route-guard";
import PublicNav from "@/components/shared/public-nav";
import useGetFieldCategories from "@/domains/fields/hooks/use-get-field-categories";
import useGetFields from "@/domains/fields/hooks/use-get-fields";
import useUploadPaper from "@/domains/paper/hooks/use-upload-paper";

const ALLOWED_FILE_TYPES = ["application/pdf"];

const uploadPaperSchema = z.object({
  title: z.string().trim().min(2, { message: "Title is required" }).max(250),
  abstract: z.string().min(1, { message: "Abstract is required" }).max(2000),
  categoryId: z.number({ message: "Category is required" }),
  notes: z.string().max(2000).optional(),
  fieldId: z.number({ message: "Field is required" }),
});

function UploadPaperContent() {
  const router = useRouter();
  const [selectedKeywords, setSelectedKeywords] = useState<
    CreateableSelectValue[]
  >([]);
  const [newKeywords, setNewKeywords] = useState<CreateableSelectValue[]>([]);

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const fileUploadComponentRef = useRef<HTMLInputElement>(null);

  type UploadPaperFormFields = z.infer<typeof uploadPaperSchema>;

  const form = useForm<UploadPaperFormFields>({
    resolver: zodResolver(uploadPaperSchema),
    mode: "onChange", // Validation will occur on blur
  });

  const { data: fields } = useGetFields();
  const {
    data: selectedFieldCategories,
    isLoading: isLoadingSelectedFieldCategories,
  } = useGetFieldCategories({
    fieldId: form.watch("fieldId"),
  });
  const { mutate: uploadPaper } = useUploadPaper();

  const fieldIdToNameMap = fields?.reduce((acc, field) => {
    acc[field.name] = field.id;
    return acc;
  }, {} as Record<string, number>);

  const categoryIdToNameMap = selectedFieldCategories?.reduce(
    (acc, category) => {
      acc[category.name] = category.id;
      return acc;
    },
    {} as Record<string, number>
  );

  const onSubmit = async (values: UploadPaperFormFields) => {
    if (!fileUploadComponentRef.current?.files) {
      alert("No file selected");
      return;
    }

    const selectedKeywordsArr: string[] = [];
    const newKeywordsArr = newKeywords.map((keyword) => keyword.value.trim());

    selectedKeywords.forEach((keyword) => {
      if (!newKeywordsArr.includes(keyword.value.trim())) {
        selectedKeywordsArr.push(keyword.value.trim());
      }
    });

    const payload = {
      ...values,
      keywords: selectedKeywordsArr,
      newKeywords: newKeywords.map((keyword) => keyword.value),
      file: fileUploadComponentRef.current?.files[0],
    };

    uploadPaper(payload, {
      onSuccess: () => {
        form.reset();
        fileUploadComponentRef.current?.files == null;
        setSelectedKeywords([]);
        setNewKeywords([]);
        setSelectedFile(null);

        alert("Paper uploaded successfully");
      },
      onError: (err) => {
        alert(`Paper upload failed. ${err.message}`);
      },
    });
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

  return (
    <div>
      <PublicNav />

      <div className="md:p-container-lg p-container-base">
        <section className="bg-[#F3E7E780] h-full md:w-3/5 w-full mx-auto md:px-container-md md:py-container-base p-container-base">
          <div className="flex flex-wrap justify-between">
            <Text className="md:text-lg text-md" weight={"bold"}>
              <Link
                href="/dashboard/profile"
                className="hover:text-[#B52221] transition-colors"
              >
                Your Profile
              </Link>
            </Text>
            <div className="flex items-center gap-2">
              <div className="bg-[#B52221] h-5 w-1 rounded-md"></div>
              <Text className="md:text-lg text-md" weight={"bold"}>
                Upload New Paper
              </Text>
            </div>

            <Text className="md:text-lg text-md" weight={"bold"}>
              <Link
                href="/dashboard/manage-papers"
                className="hover:text-[#B52221] transition-colors"
              >
                Manage Papers
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

                <div className="flex flex-col gap-1">
                  <Label className="md:text-lg text-sm text-text font-bold">
                    Abstract
                  </Label>
                  <Textarea
                    variant={"noBorderAndFocus"}
                    size={"lg"}
                    name="abstract"
                    onChange={(e) =>
                      form.setValue("abstract", e.target.value.trim())
                    }
                    value={form.watch("abstract")}
                    placeholder="0/2000 characters"
                    className="rounded-md bg-white py-2 placeholder:text-xs"
                    required
                  />
                </div>

                <div className="md:grid md:grid-cols-2 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Label className="md:text-lg text-sm text-text font-bold">
                      Primary Field
                    </Label>
                    <Select
                      onValueChange={(value: string) => {
                        fieldIdToNameMap &&
                          form.setValue("fieldId", fieldIdToNameMap[value]);
                      }}
                    >
                      <SelectTrigger className="text-text ring-1 ring-neutral-300">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-text">
                        {fields?.map((field) => {
                          return (
                            <SelectItem
                              key={crypto.randomUUID()}
                              value={field.name}
                              className="text-xs hover:bg-[#F3E7E780]"
                            >
                              {field.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <Text className="text-xs text-rose-600">
                      {form.formState.errors["fieldId"]?.message}
                    </Text>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label className="md:text-lg text-sm text-text font-bold">
                      Category
                    </Label>
                    <Select
                      onValueChange={(value: string) => {
                        categoryIdToNameMap &&
                          form.setValue(
                            "categoryId",
                            categoryIdToNameMap[value]
                          );
                      }}
                    >
                      <SelectTrigger className="text-text">
                        <SelectValue
                          placeholder={
                            selectedFieldCategories
                              ? "Select category"
                              : "Select a field to choose a category"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-text">
                        {selectedFieldCategories ? (
                          selectedFieldCategories.map((category) => {
                            return (
                              <SelectItem
                                key={crypto.randomUUID()}
                                value={category.name}
                                className="text-xs hover:bg-[#F3E7E780]"
                              >
                                {category.name}
                              </SelectItem>
                            );
                          })
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
                  </div>
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
                      if (meta?.action === "create-option") {
                        // add the value to the newKeywords state
                        setNewKeywords((prev) => [
                          ...prev,
                          ...value.map((val) => ({
                            value: val.value,
                            label: val.label,
                          })),
                        ]);
                      }
                      setSelectedKeywords(
                        value.map((val) => ({
                          value: val.value,
                          label: val.label,
                        }))
                      );
                    }}
                    placeholder="Keywords..."
                    className="rounded-md bg-white px-2 text-text-dim placeholder:text-xs"
                  />

                  {form.formState.isSubmitted && selectedKeywords.length === 0 && (
                    <Text className="text-xs text-rose-600">
                      Keywords are required
                    </Text>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="md:text-lg text-sm text-text font-bold">
                    Local relevance / Application
                  </Label>
                  <Textarea
                    variant={"noBorderAndFocus"}
                    size={"lg"}
                    name="notes"
                    onChange={(e) =>
                      form.setValue("notes", e.target.value.trim())
                    }
                    value={form.watch("notes")}
                    placeholder="0/2000 characters"
                    className="rounded-md bg-white py-2 placeholder:text-xs"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="md:text-lg text-sm text-text font-bold">
                    Upload Paper
                  </Label>
                  <div
                    className="bg-white p-10 flex flex-col items-center rounded-md"
                    onClick={() => fileUploadComponentRef.current?.click()}
                  >
                    <input
                      ref={fileUploadComponentRef}
                      type="file"
                      className="hidden"
                      id="file"
                      accept={ALLOWED_FILE_TYPES.join(", ")}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && file.size > 10 * 1024 * 1024) {
                          alert(
                            "File size should be less than or equal to 10MB"
                          );
                          e.target.value = "";
                        } else {
                          file && setSelectedFile(file);
                        }
                      }}
                    />
                    <Image
                      src="/assets/page-facing-up.png"
                      width={30}
                      height={30}
                      alt="page-facing-up"
                    />

                    <div className="text-center">
                      {selectedFile && (
                        <Text
                          variant={"secondary"}
                          className="cursor-default hover:text-text transition"
                        >
                          {selectedFile.name}
                        </Text>
                      )}

                      <Text size={"xs"} variant={"secondary"}>
                        Click to select or drag and drop your paper (PDF)
                      </Text>

                      {!selectedFile && (
                        <Text size={"xs"} variant={"secondary"}>
                          (max. 10MB)
                        </Text>
                      )}
                    </div>
                  </div>
                  {form.formState.isSubmitted && !selectedFile && (
                    <Text className="text-xs text-rose-600">
                      Select a file
                    </Text>
                  )}
                </div>

                <div className="md:mt-8 flex gap-4 items-center justify-center">
                  <Button
                    type="button"
                    className="bg-[#B52221CC] w-24 text-xs md:text-sm"
                    variant={"outline"}
                    onClick={() => router.back()}
                  >
                    CANCEL
                  </Button>
                  <Button
                    type="submit"
                    variant={"destructive"}
                    className="text-xs md:text-sm"
                  >
                    UPLOAD PAPER
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
    <RouteGuard requireAuth>
      <UploadPaperContent />
    </RouteGuard>
  );
}
