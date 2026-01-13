"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Control, useFormState } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./form";
import { Input, InputProps } from "./input";
import { Label } from "./label";
import { Button } from "./button";

export interface PasswordFieldProps extends InputProps {
  control: Control<any, any>;
  name: string;
  label?: string;
  placeholder?: string;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  enableStrengthCheck?: boolean;
}


function PasswordField({
  control,
  name,
  label,
  placeholder = name,
  showPassword,
  setShowPassword,
  ...rest
}: PasswordFieldProps) {
  const [touched, setTouched] = useState(false);
    const { touchedFields, errors } = useFormState({ control });
  

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {

        return (
          <FormItem>
            {label && <Label className="md:text-lg text-sm text-text font-bold">{label}</Label>}
            <div className="relative mb-3">
              <FormControl>
                <div>
                  <Input
                    {...rest}
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    data-testid={`${name}-input`}
                    aria-describedby="password-strength"
                    onChange={(e) => {
                      if (!touched) setTouched(true); // Mark as interacted
                      field.onChange(e);
                    }}
                    onBlur={(e) => {
                      field.onBlur();
                    }}
                  />
                  <Button
                    variant={"ghost"}
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform p-0 hover:bg-transparent"
                    data-testid="toggle-password-visibility"
                    onClick={() =>
                      setShowPassword && setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="text-gray-400" size={16} />
                    ) : (
                      <Eye className="text-gray-400" size={16} />
                    )}
                  </Button>
                </div>
              </FormControl>
            </div>

            {touchedFields[name] && errors[name] && (
            <FormMessage className="text-xs text-rose-600" />
          )}
          </FormItem>
        );
      }}
    />
  );
}

export default PasswordField;