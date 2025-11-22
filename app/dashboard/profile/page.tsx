"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import PublicNav from "@/components/shared/public-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useSignOut } from "@/domains/auth/hooks";
import useGetInstitutions from "@/domains/institutions/hooks/use-get-institutions";
import { useAuthContext } from "@/lib/contexts/auth-context";
import { Loader2, LogOut, Mail, School } from "lucide-react";
import Link from "next/link";

function ProfileContent() {
  const { user } = useAuthContext();
  const { data: institutions, isLoading: isInstitutionsLoading } =
    useGetInstitutions();

  const signOutMutation = useSignOut({
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: (error) => {
      console.error("Sign out error:", error);
    },
  });

  const handleSignOut = () => {
    if (!signOutMutation.isPending) {
      signOutMutation.mutate();
    }
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
    <div className="min-h-screen bg-white">
      <PublicNav />
      <div className="md:p-container-lg p-container-base">
        <section className="mx-auto flex h-full w-full max-w-4xl flex-col gap-8 rounded-2xl border border-gray-200 bg-white p-container-base shadow-sm">
          <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <Text size={"lg"} weight={"semibold"}>
                Profile
              </Text>
              <Text size={"sm"} className="text-gray-500">
                Personal information and account controls
              </Text>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-full px-4 py-2">
                <Link href="/dashboard/manage-papers">Manage papers</Link>
              </Button>
              <Button variant="destructive" asChild className="rounded-full px-4 py-2">
                <Link href="/upload-paper">Upload paper</Link>
              </Button>
            </div>
          </header>

          <Card className="border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold text-gray-700">
                  {profileData.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>
                <div>
                  <Text size={"lg"} weight={"semibold"}>
                    {profileData.name}
                  </Text>
                  <Text size={"sm"} className="text-gray-500">
                    Member since 2024
                  </Text>
                </div>
              </div>

              <Button
                variant="outline"
                className="rounded-full border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:text-[#B52221]"
                disabled={signOutMutation.isPending}
                onClick={handleSignOut}
              >
                {signOutMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                {signOutMutation.isPending ? "Signing out..." : "Sign out"}
              </Button>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Text size={"sm"} className="flex items-center gap-2 text-gray-500">
                  <Mail className="h-4 w-4" /> Email
                </Text>
                <div className="flex items-center gap-2">
                  <Text>{profileData.email}</Text>
                  {profileData.emailVerified ? (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Verified
                    </span>
                  ) : (
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                      Unverified
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Text size={"sm"} className="flex items-center gap-2 text-gray-500">
                  <School className="h-4 w-4" /> Institution
                </Text>
                <Text>
                  {isInstitutionsLoading ? "Loading..." : profileData.institution}
                </Text>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Text size={"sm"} className="text-gray-500">
                Areas of interest
              </Text>
              <div className="flex flex-wrap gap-2">
                {profileData.areasOfInterest.length > 0 ? (
                  profileData.areasOfInterest.map((area: string, index: number) => (
                    <span
                      key={index}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {area}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                    No areas of interest selected
                  </span>
                )}
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <RouteGuard>
      <ProfileContent />
    </RouteGuard>
  );
}
