"use client";
import React, { useEffect, useRef } from "react";
import { Text } from "../../components/ui/text";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import TextField from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useGetFields from "@/domains/fields/hooks/use-get-fields";
import useGetFieldCategories from "@/domains/fields/hooks/use-get-field-categories";
import useUploadPaper from "@/domains/paper/hooks/use-upload-paper";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ALLOWED_FILE_TYPES = ["application/pdf"];

const Page = () => {
  const router = useRouter();
  const fileUploadComponentRef = useRef<HTMLInputElement>(null);
  const uploadPaperSchema = z.object({
    title: z.string().trim().min(2, { error: "Title is required" }),
    abstract: z.string().min(1, { error: "Abstract is required" }),
    categoryId: z.number({ error: "Category is required" }),
    notes: z.string().optional(),
    fieldId: z.number({ error: "Field is required" }),
  });

  type UploadPaperFormFields = z.infer<typeof uploadPaperSchema>;

  const form = useForm<UploadPaperFormFields>({
    resolver: zodResolver(uploadPaperSchema),
    mode: "onBlur", // Validation will occur on blur
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
    const payload = {
      ...values,
      keywords: ["neuralink", "doings"],
      file: fileUploadComponentRef.current?.files[0],
    };

    console.log({ payload });

    uploadPaper(payload, {
      onSuccess: () => {
        form.reset();
        alert("Paper uploaded successfully");
      },
      onError: (err) => {
        alert(`Paper upload failed. ${err.message}`);
      },
    });
  };


  return (
    <div className="p-container-lg">
      <section className="bg-[#F3E7E780] h-full md:w-3/5 w-full mx-auto px-container-md py-container-base">
        <div className="mb-2">
          <Button
            onClick={() => router.back()}
            variant={'ghost'}
            className="px-0 hover:underline transition duration-150 flex items-center gap-1"
          >
            <ChevronLeft className="size-4" />
            <Text size={"sm"}>Back</Text>
          </Button>
        </div>

        <div className="flex justify-between">
          <Text size={"lg"} weight={"bold"}>
            Your Profile
          </Text>
          <div className="flex items-center gap-2">
            <div className="bg-[#B52221] h-5 w-1 rounded-md"></div>
            <Text size={"lg"} weight={"bold"}>
              Upload New Paper
            </Text>
          </div>

          <Text size={"lg"} weight={"bold"}>
            Manage Papers
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
                <Label className="text-lg text-text font-bold">Abstract</Label>
                <Textarea
                  variant={"noBorderAndFocus"}
                  size={"lg"}
                  name="abstract"
                  onChange={(e) =>
                    form.setValue("abstract", e.target.value.trim())
                  }
                  placeholder="0/2000 characters"
                  className="rounded-md bg-white py-2 placeholder:text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <Label className="text-lg text-text font-bold">Primary Field</Label>
                  <Select
                    onValueChange={(value: string) => {
                      fieldIdToNameMap &&
                        form.setValue("fieldId", fieldIdToNameMap[value]);
                    }}
                  >
                    <SelectTrigger>
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
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-lg text-text font-bold">Category</Label>
                  <Select
                    onValueChange={(value: string) => {
                      categoryIdToNameMap &&
                        form.setValue("categoryId", categoryIdToNameMap[value]);
                    }}
                  >
                    <SelectTrigger>
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
                </div>
              </div>

              <TextField
                control={form.control}
                name="keywords"
                label="Keywords (that describe your research)"
                placeholder="Keywords..."
                className="rounded-md bg-white py-2"
                disabled
              />

              <div className="flex flex-col gap-1">
                <Label className="text-lg text-text font-bold">Local relevance / Application</Label>
                <Textarea
                  variant={"noBorderAndFocus"}
                  size={"lg"}
                  name="notes"
                  onChange={(e) =>
                    form.setValue("notes", e.target.value.trim())
                  }
                  placeholder="0/2000 characters"
                  className="rounded-md bg-white py-2 placeholder:text-xs"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-lg text-text font-bold">Upload Paper</Label>
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
                  />
                  <Image
                    src="/assets/page-facing-up.png"
                    width={30}
                    height={30}
                    alt="page-facing-up"
                  />
                  <Text size={"xs"} variant={"secondary"}>
                    Click to select or drag and drop your paper (PDF)
                  </Text>

                  <Text size={"xs"} variant={"secondary"}>
                    (max. 10MB)
                  </Text>
                </div>
              </div>

              <div className="md:mt-8 flex gap-4 items-center justify-center">
                <Button
                  type="button"
                  className="bg-[#B52221CC]"
                  variant={"outline"}
                  onClick={() => router.back()}
                >
                  CANCEL
                </Button>
                <Button type="submit" variant={"destructive"}>
                  UPLOAD PAPER
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default Page;
