"use client";

import { useMemo, useState } from "react";
import { Control, UseFormSetValue } from "react-hook-form";

import {
  SelectValueBase,
  SingleSelect,
} from "@/components/ui/createable-select";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { SignupFormData } from "@/domains/auth/schemas";
import { Institution } from "@/domains/institutions/hooks/use-get-institutions";

type SignupInstitutionFieldProps = {
  control: Control<SignupFormData>;
  institutions: Institution[];
  isLoading: boolean;
  hasError: boolean;
  setValue: UseFormSetValue<SignupFormData>;
};

const institutionFieldStyles = {
  controlStyles: {
    backgroundColor: "white",
    border: "none",
    borderRadius: "0.125rem",
    minHeight: "52px",
    paddingLeft: "13px",
    paddingRight: "13px",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05), 0 0 0 1px rgb(163 163 163)",
    "&:hover": {
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05), 0 0 0 1px rgb(163 163 163)",
    },
    "&:focus-within": {
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05), 0 0 0 1px #B52221",
    },
  },
  menuStyles: {
    backgroundColor: "white",
    border: "1px solid rgb(229 231 235)",
    borderRadius: "6px",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    zIndex: 50,
  },
  optionStyles: {
    padding: "12px 16px",
    "&:hover": {
      backgroundColor: "rgb(249 250 251)",
    },
    "&:focus": {
      backgroundColor: "rgba(181, 34, 33, 0.1)",
    },
  },
} as const;

export function SignupInstitutionField({
  control,
  institutions,
  isLoading,
  hasError,
  setValue,
}: SignupInstitutionFieldProps) {
  const [selectedInstitution, setSelectedInstitution] =
    useState<SelectValueBase | null>(null);
  const [typedInstitution, setTypedInstitution] = useState("");

  const institutionOptions = useMemo(
    () =>
      [...institutions]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((institution) => ({
          value: institution.id.toString(),
          label: institution.name,
        })),
    [institutions],
  );

  const findExactInstitutionMatch = (value: string) => {
    const normalizedValue = value.trim().toLowerCase();

    return institutionOptions.find(
      (institution) => institution.label.trim().toLowerCase() === normalizedValue,
    );
  };

  const loadInstitutionOptions = (
    searchValue: string,
    setOptions: (options: SelectValueBase[]) => void,
  ) => {
    setTypedInstitution(searchValue);

    const normalizedQuery = searchValue.trim().toLowerCase();

    if (!normalizedQuery) {
      setOptions([]);
      return;
    }

    const matches = institutionOptions.filter((institution) =>
      institution.label.toLowerCase().includes(normalizedQuery),
    );

    setOptions(matches.slice(0, 20));
  };

  return (
    <FormField
      control={control}
      name="institutionInput"
      render={({ field, fieldState }) => {
        const syncInstitutionValue = (value: string) => {
          const normalizedValue = value.trim();

          if (!normalizedValue) {
            setSelectedInstitution(null);
            setTypedInstitution("");
            field.onChange("");
            setValue("institutionId", undefined, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
            return;
          }

          const matchedInstitution = findExactInstitutionMatch(normalizedValue);
          const nextValue = matchedInstitution ?? {
            value: normalizedValue,
            label: normalizedValue,
          };

          setSelectedInstitution(nextValue);
          setTypedInstitution("");
          field.onChange(nextValue.label);
          setValue(
            "institutionId",
            matchedInstitution ? Number(matchedInstitution.value) : undefined,
            {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            },
          );
        };

        return (
          <FormItem className="pb-2">
            <Label className="text-sm font-bold text-text md:text-lg">
              Affiliated institution
            </Label>
            <FormControl>
              <div className="space-y-2">
                <SingleSelect
                  name="institution"
                  isCreatable
                  isAsync
                  isClearable
                  defaultOptions={false}
                  loadOptions={loadInstitutionOptions}
                  onInputChange={(value, meta) => {
                    if (meta.action !== "input-change") {
                      return;
                    }

                    setTypedInstitution(value);
                    field.onChange(value);

                    const matchedInstitution = findExactInstitutionMatch(value);

                    setValue(
                      "institutionId",
                      matchedInstitution
                        ? Number(matchedInstitution.value)
                        : undefined,
                      {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      },
                    );
                  }}
                  onCreateOption={syncInstitutionValue}
                  value={selectedInstitution}
                  handleBlur={() => {
                    if (typedInstitution.trim()) {
                      syncInstitutionValue(typedInstitution);
                    }
                  }}
                  handleChange={(option) => {
                    if (!option) {
                      syncInstitutionValue("");
                      return;
                    }

                    syncInstitutionValue(option.label);
                  }}
                  placeholder={
                    isLoading
                      ? "Loading institutions..."
                      : hasError
                        ? "Institution list unavailable"
                        : "Type to search or add institution"
                  }
                  className="bg-white text-text-dim placeholder:text-xs"
                  {...institutionFieldStyles}
                />
                {fieldState.error ? (
                  <Text className="text-xs text-rose-600">
                    {fieldState.error.message}
                  </Text>
                ) : null}
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
