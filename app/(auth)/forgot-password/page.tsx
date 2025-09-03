"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/lib/hooks/use-auth";
import { validateResetPasswordForm } from "@/lib/utils/validation";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, startTransition] = useTransition();
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validation = validateResetPasswordForm(email);

    if (!validation.isValid) {
      const errorMap: Record<string, string> = {};
      validation.errors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    startTransition(async () => {
      try {
        await resetPassword(email);
        setSuccess(true);
        setErrors({});
      } catch (error: any) {
        setErrors({
          general:
            error.message || "An error occurred while sending reset email",
        });
      }
    });
  };

  if (success) {
    return (
      <div className="font-sans items-center justify-items-center min-h-screen">
        <main className="flex flex-col items-center py-20 w-full">
          <Link href="/">
            <Image
              src="/assets/desci-ng-logo.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>

          <section className="md:w-1/3 w-full mx-auto my-10 space-y-6 px-8 text-center">
            <Text className="text-center leading-6 text-3xl">
              Check Your Email
            </Text>

            <div className="p-6 bg-green-50 border border-green-200 rounded-md">
              <Text className="text-green-800">
                We've sent a password reset link to <strong>{email}</strong>
              </Text>
              <Text className="text-green-700 text-sm mt-2">
                Please check your email and follow the instructions to reset
                your password.
              </Text>
            </div>

            <div className="space-y-4">
              <Text className="text-sm text-gray-600">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => {
                    setSuccess(false);
                    setEmail("");
                  }}
                  className="text-[#B52221] hover:underline"
                >
                  try again
                </button>
              </Text>

              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="font-sans items-center justify-items-center min-h-screen">
      <main className="flex flex-col items-center py-20 w-full">
        <Link href="/">
          <Image
            src="/assets/desci-ng-logo.png"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>

        <section className="md:w-1/3 w-full mx-auto my-10 space-y-6 px-8">
          <Text className="text-center leading-6 text-3xl">
            Reset Your Password
          </Text>

          <Text className="text-center">
            Enter your email address and we'll send you a link to reset your
            password
          </Text>

          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <Text className="text-red-600 text-sm">{errors.general}</Text>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }
                }}
                className="p-6 ring-1 ring-neutral-400 border-[#F3E7E780]/50 focus:border-[#F3E7E780]/50"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <Text id="email-error" className="text-red-600 text-sm">
                  {errors.email}
                </Text>
              )}
            </div>

            <Button
              variant="destructive"
              className="mt-10 py-4 rounded-lg w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "SEND RESET LINK"
              )}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <Text className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link href="/login" className="text-[#B52221] hover:underline">
                Sign in
              </Link>
            </Text>
          </div>
        </section>
      </main>
    </div>
  );
}
