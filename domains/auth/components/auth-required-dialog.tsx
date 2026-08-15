"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import PasswordField from "@/components/ui/password-field";
import { Text } from "@/components/ui/text";
import TextField from "@/components/ui/text-field";
import { useSignIn } from "@/domains/auth/hooks";
import { LoginFormData, loginSchema } from "@/domains/auth/schemas";
import { fetchUser } from "@/domains/auth/hooks/use-user";
import { userKeys } from "@/lib/react-query/query-keys";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface AuthRequiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: string;
  onAuthenticated?: () => void;
}

const AuthRequiredDialog = ({
  open,
  onOpenChange,
  description,
  onAuthenticated,
}: AuthRequiredDialogProps) => {
  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInMutation = useSignIn({
    onSuccess: async () => {
      const user = await queryClient.fetchQuery({
        queryKey: userKeys.current(),
        queryFn: fetchUser,
      });

      queryClient.setQueryData(userKeys.current(), user);
      await queryClient.invalidateQueries({ queryKey: userKeys.current() });
      form.reset();
      setGeneralError("");
      onOpenChange(false);
      onAuthenticated?.();
    },
    onError: (error) => {
      let errorMessage = error.message || "An error occurred during login";

      if (
        error.message?.includes("verify") ||
        error.message?.includes("verification")
      ) {
        errorMessage =
          "Please verify your email address before signing in. Check your email for a verification link.";
      }

      setGeneralError(errorMessage);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setGeneralError("");
    signInMutation.mutate(data);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      form.reset();
      setGeneralError("");
    }

    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="space-y-3 text-center">
          <DialogTitle className="text-center text-2xl">Welcome back!</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        {generalError && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <Text className="text-sm text-red-600">{generalError}</Text>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <TextField
              control={form.control}
              name="email"
              label="Email address"
              placeholder="Enter your email address"
              type="email"
              className="p-6 ring-1 ring-neutral-400 border-[#F3E7E780]/50 focus:border-[#F3E7E780]/50"
              required
            />

            <PasswordField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              className="p-6 ring-1 ring-neutral-400 border-[#F3E7E780]/50 focus:border-[#F3E7E780]/50"
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              required
            />

            <Button
              variant="destructive"
              className="mt-2 w-full rounded-lg py-4"
              type="submit"
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending ? (
                <Loader2Icon size={16} className="animate-spin" />
              ) : (
                "SIGN IN"
              )}
            </Button>
          </form>
        </Form>

        <div className="flex justify-between text-sm text-gray-600">
          <Link href="/signup" className="text-primary hover:underline">
            Create an account
          </Link>
          <Link href="/forgot-password" className="hover:underline">
            Forgot password?
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthRequiredDialog;
