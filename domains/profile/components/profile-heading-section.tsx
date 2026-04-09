import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { AreaOfInterestBadge } from "@/domains/user/components/area-of-interest-badge";
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
              <Text size={"sm"}>
                {profile.emailVerified
                  ? "Verified account"
                  : "Unverified account"}
              </Text>
            </div>

            <div className="space-y-1">
              <Text
                size={"xs"}
                className="profile-label uppercase tracking-wide"
              >
                Institution
              </Text>
              <Text size={"sm"}>{getInstitutionLabel(profile)}</Text>
            </div>
          </div>

          <div className="space-y-2">
            <Text size={"xs"} className="profile-label uppercase tracking-wide">
              Areas of interest
            </Text>
            <div className="flex flex-wrap gap-2">
              {profile.areasOfInterest && profile.areasOfInterest.length > 0 ? (
                profile.areasOfInterest.map((area: string, index: number) => (
                  <AreaOfInterestBadge key={index} area={area} />
                ))
              ) : (
                <Text className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                  No area of interest selected
                </Text>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileHeadingSection;
