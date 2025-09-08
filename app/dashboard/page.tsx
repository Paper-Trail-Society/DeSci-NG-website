"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { Text } from "@/components/ui/text";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function DashboardContent() {
  const router = useRouter();

  // Redirect to profile page
  useEffect(() => {
    router.push("/dashboard/profile");
  }, [router]);

  // Show loading while redirecting
  return (
    <div className="items-center justify-items-center min-h-screen">
      <main className="flex flex-col items-center justify-center py-20 w-full">
        <Loader2 size={32} className="animate-spin" />
        <Text className="mt-4">Redirecting...</Text>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <RouteGuard>
      <DashboardContent />
    </RouteGuard>
  );
}
