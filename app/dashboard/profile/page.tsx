"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useSignOut } from "@/domains/auth/hooks";
import { AreaOfInterestBadge } from "@/domains/user/components/area-of-interest-badge";
import { useAuthContext } from "@/lib/contexts/auth-context";
import { formatDate } from "date-fns";
import {
  ExternalLinkIcon,
  Loader2Icon,
  LogOutIcon,
  MailIcon,
  SchoolIcon,
} from "lucide-react";
import Link from "next/link";

function ProfileContent() {
  const { user } = useAuthContext();

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

  const userMembershipDate = formatDate(new Date(user.createdAt), "MMMM, yyyy");

  const userAvatarFallback = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("");

  return (
    <div className="min-h-screen bg-white">
      <div className="md:p-container-lg p-container-base">
        <section className="mx-auto sm:mx-0 flex h-full w-full max-w-4xl flex-col gap-8 rounded-2xl border border-gray-200 bg-white p-container-base shadow-sm">
          <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <Text size={"lg"} weight={"semibold"}>
                Profile
              </Text>
              <Text size={"sm"} className="text-gray-500">
                Personal information and account controls
              </Text>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                variant="outline"
                className="rounded-full px-4 py-2 text-sm font-light"
              >
                <Link href={`/profile/${user.id}`}>
                  <ExternalLinkIcon className="size-4" />
                  <span>View public profile</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-4 py-2 font-light"
              >
                <Link href="/dashboard/manage-papers">Manage papers</Link>
              </Button>
              <Button
                variant="destructive"
                asChild
                className="rounded-full px-4 py-2"
              >
                <Link href="/upload-paper">Upload paper</Link>
              </Button>
            </div>
          </header>

          <Card className="border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-center gap-4">
                <Avatar size="md">
                  <AvatarFallback className="text-xs rounded-full font-medium uppercase text-foreground/80">
                    {userAvatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Text size={"lg"} weight={"semibold"}>
                    {user.name}
                  </Text>
                  <Text size={"sm"} className="text-gray-500">
                    Member since {userMembershipDate}
                  </Text>
                </div>
              </div>

              <Button
                variant="outline"
                className="rounded-full border-gray-200 px-4 py-2 text-xs text-gray-700 transition hover:text-[#B52221]"
                disabled={signOutMutation.isPending}
                onClick={handleSignOut}
              >
                {signOutMutation.isPending ? (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogOutIcon className="mr-2 h-4 w-4" />
                )}
                <span className="hidden md:block">
                  {signOutMutation.isPending ? "Signing out..." : "Sign out"}
                </span>
              </Button>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="space-y-0.5 min-w-0">
                <Text
                  size={"sm"}
                  className="flex items-center gap-2 text-gray-500"
                >
                  <MailIcon className="h-4 w-4" /> Email
                </Text>

                <div className="flex flex-col min-w-0">
                  <Text className="wrap-break-word whitespace-normal text-sm max-w-full">
                    {user.email}
                  </Text>
                  <div className="mt-2">
                    {user.emailVerified ? (
                      <Text className="w-fit rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        Verified
                      </Text>
                    ) : (
                      <Text className="w-fit rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                        Unverified
                      </Text>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-0.5">
                <Text
                  size={"sm"}
                  className="flex items-center gap-2 text-gray-500"
                >
                  <SchoolIcon className="h-4 w-4" /> Institution
                </Text>
                <Text size="sm">
                  {user.institution?.name || "No institution selected"}
                </Text>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Text size={"sm"} className="text-gray-500">
                Areas of interest
              </Text>
              <div className="flex flex-wrap gap-2">
                {user.areasOfInterest && user.areasOfInterest.length > 0 ? (
                  user.areasOfInterest.map((area: string, index: number) => (
                    <AreaOfInterestBadge key={index} area={area} />
                  ))
                ) : (
                  <Text className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                    No area of interest selected
                  </Text>
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
