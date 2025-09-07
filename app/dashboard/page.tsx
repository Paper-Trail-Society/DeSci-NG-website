"use client";

import { Text } from "@/components/ui/text";
import { useAuthContext } from "@/lib/contexts/auth-context";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { isLoading, isAuthenticated } = useAuthContext();
  const router = useRouter();

  // Handle redirect to login if not authenticated, or to profile if authenticated
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        router.push("/dashboard/profile");
      }
    }
  }, [isLoading, isAuthenticated, router]);

  // This will redirect to profile, so we just show loading
  return (
    <div className="items-center justify-items-center min-h-screen">
      <main className="flex flex-col items-center justify-center py-20 w-full">
        <Loader2 size={32} className="animate-spin" />
        <Text className="mt-4">Redirecting...</Text>
      </main>
    </div>
  );
}
