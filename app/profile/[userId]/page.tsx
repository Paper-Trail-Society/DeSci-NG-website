import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import ProfileHeadingSection from "@/domains/profile/components/profile-heading-section";
import ProfilePublishedPapersSection from "@/domains/profile/components/profile-published-papers-section";
import {
  getPublicProfileById,
  getPublishedPapersByUserId,
} from "@/domains/profile/server/get-public-profile-page-data";
import { Metadata } from "next";

interface ProfilePageProps {
  params: Promise<{ userId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const getPageNumber = (rawPage: string | string[] | undefined): number => {
  const page = Number(Array.isArray(rawPage) ? rawPage[0] : rawPage ?? "1");

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.floor(page);
};

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { userId } = await params;
  const profile = await getPublicProfileById(userId);

  if (!profile) {
    return {
      title: "Profile | Nubian",
      description: "Public researcher profile on Nubian.",
    };
  }

  return {
    title: `${profile.name} | Profile | Nubian`,
    description: `Public profile and published papers by ${profile.name}.`,
  };
}

const ProfilePage = async ({ params, searchParams }: ProfilePageProps) => {
  const [{ userId }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const currentPage = getPageNumber(resolvedSearchParams.page);

  const [profile, papers] = await Promise.all([
    getPublicProfileById(userId),
    getPublishedPapersByUserId(userId, currentPage),
  ]);

  if (!profile) {
    return (
      <div className="min-h-screen profile-page py-10">
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-4">
          <Card className="border-profile-cardBorder bg-profile-card p-6 shadow-profile-card">
            <Text as="h1" size={"xl"} weight={"semibold"} className="text-profile-title">
              Profile unavailable
            </Text>
            <Text size={"sm"} className="mt-2 text-profile-subtitle">
              This user doesn&apos;t exist.
            </Text>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen profile-page py-10">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <ProfileHeadingSection profile={profile} />
        <ProfilePublishedPapersSection
          papers={papers}
          currentPage={currentPage}
        />
      </section>
    </div>
  );
};

export default ProfilePage;
