import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { getInstitutionLabel } from "@/domains/profile/server/get-public-profile-page-data";
import { PublicProfile } from "@/domains/profile/types";

interface ProfileHeadingSectionProps {
  profile: PublicProfile;
}

const getUserInitials = (name: string): string => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment.charAt(0).toUpperCase())
    .join("");
};

const getAreas = (areas: PublicProfile["areasOfInterest"]): string[] => {
  if (Array.isArray(areas)) {
    return areas;
  }

  if (typeof areas === "string") {
    try {
      const parsed = JSON.parse(areas);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (value): value is string => typeof value === "string",
        );
      }
    } catch {
      return [];
    }
  }

  return [];
};

const ProfileHeadingSection = ({ profile }: ProfileHeadingSectionProps) => {
  return (
    <div className="profile-page md:top-6">
      <Card className="profile-card p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar
              size="lg"
              className="border border-[#f3d9d8] bg-[#fff0ef] text-[#7a3a40]"
            >
              <AvatarFallback className="bg-[#fff0ef] text-base font-semibold">
                {getUserInitials(profile.name) || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <Text
                as="h1"
                size={"2xl"}
                weight={"semibold"}
                className="profile-title"
              >
                {profile.name}
              </Text>
              <Text size={"sm"} className="profile-subtitle">
                Public profile
              </Text>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Text
                size={"xs"}
                className="profile-label uppercase tracking-wide"
              >
                Verification
              </Text>
              <Text size={"sm"} className="profile-value">
                {profile.emailVerified
                  ? "Verified account"
                  : "Verification status unavailable"}
              </Text>
            </div>

            <div className="space-y-1">
              <Text
                size={"xs"}
                className="profile-label uppercase tracking-wide"
              >
                Institution
              </Text>
              <Text size={"sm"} className="profile-value">
                {getInstitutionLabel(profile)}
              </Text>
            </div>
          </div>

          <div className="space-y-2">
            <Text size={"xs"} className="profile-label uppercase tracking-wide">
              Areas of interest
            </Text>
            <div className="flex flex-wrap gap-2.5">
              <span className="profile-pill rounded-full px-3 py-1 text-xs">
                {profile.areasOfInterest}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileHeadingSection;
