"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { Loader2, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../components/ui/button";
import { Text } from "../components/ui/text";

export default function Dashboard() {
  const { user, isLoading, isAuthenticated, signOut } = useAuth();
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await signOut();
        router.push("/");
      } catch (error) {
        console.error("Sign out error:", error);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="font-sans items-center justify-items-center min-h-screen">
        <main className="flex flex-col items-center justify-center py-20 w-full">
          <Loader2 size={32} className="animate-spin" />
          <Text className="mt-4">Loading...</Text>
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/assets/desci-ng-logo.png"
                  alt="Desci NG Logo"
                  width={40}
                  height={40}
                />
              </Link>
              <Text className="ml-3 text-xl font-semibold">Dashboard</Text>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User size={20} className="text-gray-600" />
                <Text className="text-sm text-gray-700">
                  {user?.email || "User"}
                </Text>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                disabled={loading}
                className="flex items-center space-x-2"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <LogOut size={16} />
                )}
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center">
            <User size={48} className="mx-auto text-gray-400 mb-4" />
            <Text className="text-2xl font-semibold text-gray-900 mb-2">
              Welcome to Desci NG Dashboard
            </Text>
            <Text className="text-gray-600 mb-6">
              You have successfully signed in to your account.
            </Text>

            <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
              <Text className="text-lg font-medium text-gray-900 mb-4">
                Account Information
              </Text>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text className="text-sm text-gray-600">Email:</Text>
                  <Text className="text-sm font-medium text-gray-900">
                    {user?.email || "Not available"}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-sm text-gray-600">Name:</Text>
                  <Text className="text-sm font-medium text-gray-900">
                    {user?.name || "Not provided"}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-sm text-gray-600">Status:</Text>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
