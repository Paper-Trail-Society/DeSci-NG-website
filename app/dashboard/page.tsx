"use client";

import AuthNav from "@/components/shared/auth-nav";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuthContext } from "@/lib/contexts/auth-context";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isLoading, isAuthenticated } = useAuthContext();
  const router = useRouter();

  // Handle redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="items-center justify-items-center ">
        <main className="flex flex-col items-center justify-center py-20 w-full">
          <Loader2 size={32} className="animate-spin" />
          <Text className="mt-4">Loading...</Text>
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="items-center justify-items-center ">
        <main className="flex flex-col items-center justify-center py-20 w-full">
          <Loader2 size={32} className="animate-spin" />
          <Text className="mt-4">Redirecting...</Text>
        </main>
      </div>
    );
  }

  // Mock data
  const profileData = {
    name: user?.name || "Mosadoluwa Fasasi",
    email: user?.email || "mosadoluwamorphing@gmail.com",
    institution: "University of Ilorin, Nigeria",
    areasOfInterest: [
      "Blockchain & Cryptography",
      "BioTech",
      "Artificial Intelligence",
    ],
    papersUploaded: 5,
    totalDownloads: 2025,
    avatar: "/assets/profile-avatar.jpg",
  };

  return (
    <div className="bg-white">
      <AuthNav />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <Text className="text-white text-2xl font-semibold">
                    {profileData.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </Text>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <Text className="text-3xl font-bold text-gray-900">
                {profileData.name}
              </Text>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Text className="text-sm font-medium text-gray-600 mb-1">
                    Affiliated Institution
                  </Text>
                  <Text className="text-gray-900">
                    {profileData.institution}
                  </Text>
                </div>

                <div>
                  <Text className="text-sm font-medium text-gray-600 mb-1">
                    Email Address
                  </Text>
                  <Text className="text-gray-900">{profileData.email}</Text>
                </div>
              </div>
            </div>
          </div>

          {/* Areas of Interest */}
          <div className="mb-8">
            <Text className="text-lg font-medium text-gray-900 mb-4">
              Areas of Interest
            </Text>
            <div className="flex flex-wrap gap-3">
              {profileData.areasOfInterest.map((area, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-300"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <Text className="text-4xl font-bold text-gray-900 mb-2">
                {profileData.papersUploaded}
              </Text>
              <Text className="text-gray-600">Papers uploaded</Text>
            </div>

            <div className="text-center">
              <Text className="text-4xl font-bold text-gray-900 mb-2">
                {profileData.totalDownloads.toLocaleString()}
              </Text>
              <Text className="text-gray-600">Total Downloads</Text>
            </div>
          </div>

          <Button
            asChild
            variant="destructive"
            className="px-8 py-3 w-sm text-white font-medium"
          >
            <Link href="/upload-paper">UPLOAD NEW PAPER</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
