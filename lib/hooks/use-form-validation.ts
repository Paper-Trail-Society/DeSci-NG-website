import { ValidationResult } from "@/lib/utils/validation";
import { useCallback, useState } from "react";

interface UseFormValidationOptions<T> {
  initialValues: T;
  validate: (values: T) => ValidationResult;
  onSubmit: (values: T) => Promise<void> | void;
}

export function useFormValidation<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormValidationOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field as string]) {
        setErrors((prev) => ({ ...prev, [field as string]: "" }));
      }
    },
    [errors]
  );

  const setFieldTouched = useCallback((field: keyof T, isTouched = true) => {
    setTouched((prev) => ({ ...prev, [field as string]: isTouched }));
  }, []);

  const validateField = useCallback(
    (field: keyof T) => {
      const validation = validate(values);
      const fieldError = validation.errors.find(
        (error) => error.field === field
      );

      if (fieldError) {
        setErrors((prev) => ({
          ...prev,
          [field as string]: fieldError.message,
        }));
        return false;
      } else {
        setErrors((prev) => ({ ...prev, [field as string]: "" }));
        return true;
      }
    },
    [values, validate]
  );

  const validateForm = useCallback(() => {
    const validation = validate(values);

    if (!validation.isValid) {
      const errorMap: Record<string, string> = {};
      validation.errors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return false;
    }

    setErrors({});
    return true;
  }, [values, validate]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error: any) {
        // Handle submission errors
        if (error.message) {
          setErrors({ general: error.message });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validateForm, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setGeneralError = useCallback((message: string) => {
    setErrors((prev) => ({ ...prev, general: message }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    validateField,
    validateForm,
    handleSubmit,
    resetForm,
    setGeneralError,
    isValid: Object.keys(errors).length === 0,
  };
}
