"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/lib/hooks/use-auth";
import { validateSignupForm } from "@/lib/utils/validation";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const { signUp } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validation = validateSignupForm(
      formData.email,
      formData.password,
      formData.confirmPassword,
      formData.name
    );

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
        await signUp(formData.email, formData.password, formData.name);
        router.push("/dashboard");
      } catch (error: any) {
        setErrors({
          general: error.message || "An error occurred during signup",
        });
      }
    });
  };

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
          <Text className="text-center leading-6 text-3xl">Join Desci NG</Text>

          <Text className="text-center leading-2">
            Create your account to get started
          </Text>

          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <Text className="text-red-600 text-sm">{errors.general}</Text>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                required
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="p-6 ring-1 ring-neutral-400 border-[#F3E7E780]/50 focus:border-[#F3E7E780]/50"
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <Text id="name-error" className="text-red-600 text-sm">
                  {errors.name}
                </Text>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                required
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="p-6 ring-1 ring-neutral-400 border-[#F3E7E780]/50 focus:border-[#F3E7E780]/50"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <Text id="email-error" className="text-red-600 text-sm">
                  {errors.email}
                </Text>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
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
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
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
                "CREATE ACCOUNT"
              )}
            </Button>
          </form>

          {/* <SocialAuth mode="signup" /> */}

          <div className="text-center space-y-2">
            <Text className="text-sm text-gray-600">
              Already have an account?{" "}
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
