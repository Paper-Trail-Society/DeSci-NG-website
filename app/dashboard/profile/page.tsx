"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import PublicNav from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSignOut } from "@/domains/auth/hooks";
import useGetInstitutions from "@/domains/institutions/hooks/use-get-institutions";
import { useAuthContext } from "@/lib/contexts/auth-context";
import { Loader2, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ProfileContent() {
  const { user } = useAuthContext();
  const router = useRouter();
  const { data: institutions } = useGetInstitutions();

  const signOutMutation = useSignOut({
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("Sign out error:", error);
    },
  });

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  // Get user's institution name
  const userInstitution = institutions?.find(
    (inst) => inst.id === user?.institutionId
  );

  // Parse areas of interest from JSON string if it exists
  const parseAreasOfInterest = (
    areasOfInterest: string | null | undefined
  ): string[] => {
    if (!areasOfInterest) return [];
    try {
      const parsed = JSON.parse(areasOfInterest);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error parsing areas of interest:", error);
      return [];
    }
  };

  const profileData = {
    name: user?.name || "User",
    email: user?.email || "",
    emailVerified: user?.emailVerified || false,
    institution:
      userInstitution?.name ||
      (user?.institutionId
        ? "Institution not found"
        : "No institution selected"),
    areasOfInterest: parseAreasOfInterest(user?.areasOfInterest),
    papersUploaded: 5, // TODO: Get from API
    totalDownloads: 2025, // TODO: Get from API
  };

  return (
    <div>
      <PublicNav />
      <div className="md:p-container-lg p-container-base min-h-screen">
        <section className="bg-[#F3E7E780] h-full md:w-3/5 w-full mx-auto md:px-container-md md:py-container-base p-container-base">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-[#B52221] h-5 w-1 rounded-md"></div>
              <Text className="md:text-lg text-md" weight={"bold"}>
                Your Profile
              </Text>
            </div>

            <Text className="md:text-lg text-md" weight={"bold"}>
              <Link
                href="/upload-paper"
                className="hover:text-[#B52221] transition-colors"
              >
                Upload New Paper
              </Link>
            </Text>

            <Text className="md:text-lg text-md" weight={"bold"}>
              <Link
                href="/dashboard/manage-papers"
                className="hover:text-[#B52221] transition-colors"
              >
                Manage Papers
              </Link>
            </Text>
          </div>

          {/* Profile Content */}
          <div className="flex flex-col lg:flex-row gap-8 mt-8 py-8">
            {/* Left Side - Avatar */}
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
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

            {/* Right Side - Profile Info */}
            <div className="flex-1 space-y-6">
              {/* Name */}
              <Text className="text-3xl font-bold text-gray-900">
                {profileData.name}
              </Text>

              {/* Institution and Email */}
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
                  <div className="flex items-center gap-2">
                    <Text className="text-gray-900">{profileData.email}</Text>
                    {profileData.emailVerified ? (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Verified
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        Unverified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Areas of Interest */}
              <div>
                <Text className="text-md font-medium text-gray-900 mb-4 pt-4">
                  Areas of Interest
                </Text>
                <div className="flex flex-wrap gap-3">
                  {profileData.areasOfInterest.length > 0 ? (
                    profileData.areasOfInterest.map(
                      (area: string, index: number) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full text-sm border border-primary"
                        >
                          {area}
                        </span>
                      )
                    )
                  ) : (
                    <span className="px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-500 border border-gray-300">
                      No areas of interest selected
                    </span>
                  )}
                </div>
              </div>

              {/* Statistics */}
              {/* <div className="grid md:grid-cols-2 gap-8 py-6">
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
            </div> */}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <Button
                  asChild
                  variant="destructive"
                  className="px-8 py-3 text-white font-medium"
                >
                  <Link href="/upload-paper">UPLOAD NEW PAPER</Link>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  disabled={signOutMutation.isPending}
                  className="flex items-center space-x-2 px-6 py-3"
                >
                  {signOutMutation.isPending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <LogOut size={16} />
                  )}
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <RouteGuard requireAuth>
      <ProfileContent />
    </RouteGuard>
  );
}
