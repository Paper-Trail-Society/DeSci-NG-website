"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import TextField from "@/components/ui/text-field";
import { useSignUp } from "@/domains/auth/hooks";
import { SignupFormData, signupSchema } from "@/domains/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Signup() {
  const [success, setSuccess] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUpMutation = useSignUp({
    onSuccess: (data) => {
      setSignupEmail(form.getValues("email"));
      setSuccess(true);
    },
    onError: (error) => {
      form.setError("root", {
        message: error.message || "An error occurred during signup",
      });
    },
  });

  const onSubmit = (data: SignupFormData) => {
    signUpMutation.mutate(data);
  };

  if (success) {
    return (
      <div className="font-sans items-center justify-items-center ">
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

            <div className="p-6 bg-blue-50 border border-blue-200 rounded-md">
              <Text className="text-blue-800">
                We've sent a verification link to <strong>{signupEmail}</strong>
              </Text>
              <Text className="text-blue-700 text-sm mt-2">
                Please check your email and click the verification link to
                activate your account.
              </Text>
            </div>

            <div className="space-y-4">
              <Text className="text-sm text-gray-600">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => {
                    setSuccess(false);
                    form.reset();
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
    <div className="font-sans items-center justify-items-center ">
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

          {form.formState.errors.root && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <Text className="text-red-600 text-sm">
                {form.formState.errors.root.message}
              </Text>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <TextField
                control={form.control}
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                type="text"
                className="p-6 ring-1 ring-neutral-400 border-[#F3E7E780]/50 focus:border-[#F3E7E780]/50"
                required
              />

              <TextField
                control={form.control}
                name="email"
                label="Email address"
                placeholder="Enter your email address"
                type="email"
                className="p-6 ring-1 ring-neutral-400 border-[#F3E7E780]/50 focus:border-[#F3E7E780]/50"
                required
              />

              <TextField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Create a password"
                type="password"
                autoComplete="new-password"
                className="p-6 ring-1 ring-neutral-400 border-[#F3E7E780]/50 focus:border-[#F3E7E780]/50"
                required
              />

              <TextField
                control={form.control}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                autoComplete="new-password"
                className="p-6 ring-1 ring-neutral-400 border-[#F3E7E780]/50 focus:border-[#F3E7E780]/50"
                required
              />

              <Button
                variant="destructive"
                className="mt-10 py-4 rounded-lg w-full"
                type="submit"
                disabled={signUpMutation.isPending}
              >
                {signUpMutation.isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "CREATE ACCOUNT"
                )}
              </Button>
            </form>
          </Form>

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
