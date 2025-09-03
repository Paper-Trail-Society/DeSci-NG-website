"use client";

import { authClient } from "@/lib/auth-client";
import {
  validateConfirmPassword,
  validatePassword,
} from "@/lib/utils/validation";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Text } from "../../components/ui/text";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.push("/forgot-password");
    }
  }, [token, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setErrors({ general: "Invalid reset token" });
      return;
    }

    // Validate form
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    const validationErrors: Record<string, string> = {};
    if (passwordError)
      validationErrors[passwordError.field] = passwordError.message;
    if (confirmPasswordError)
      validationErrors[confirmPasswordError.field] =
        confirmPasswordError.message;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    startTransition(async () => {
      try {
        await authClient.resetPassword({
          token,
          password: formData.password,
        });
        setSuccess(true);
        setErrors({});
      } catch (error: any) {
        setErrors({
          general:
            error.message || "An error occurred while resetting password",
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
              Password Reset Successful
            </Text>

            <div className="p-6 bg-green-50 border border-green-200 rounded-md">
              <Text className="text-green-800">
                Your password has been successfully reset!
              </Text>
              <Text className="text-green-700 text-sm mt-2">
                You can now sign in with your new password.
              </Text>
            </div>

            <Link href="/login">
              <Button variant="destructive" className="w-full py-4">
                SIGN IN
              </Button>
            </Link>
          </section>
        </main>
      </div>
    );
  }

  if (!token) {
    return null; // Will redirect to forgot-password
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
            Set New Password
          </Text>

          <Text className="text-center leading-2">
            Enter your new password below
          </Text>

          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <Text className="text-red-600 text-sm">{errors.general}</Text>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your new password"
                autoComplete="new-password"
                value={formData.password}
                required
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="p-6 ring-1 ring-neutral-400 border-[#F3E7E780]/50 focus:border-[#F3E7E780]/50"
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />
              {errors.password && (
                <Text id="password-error" className="text-red-600 text-sm">
                  {errors.password}
                </Text>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                required
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className="p-6 ring-1 ring-neutral-400 border-[#F3E7E780]/50 focus:border-[#F3E7E780]/50"
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
              />
              {errors.confirmPassword && (
                <Text
                  id="confirm-password-error"
                  className="text-red-600 text-sm"
                >
                  {errors.confirmPassword}
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
                "RESET PASSWORD"
              )}
            </Button>
          </form>

          <div className="text-center">
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
