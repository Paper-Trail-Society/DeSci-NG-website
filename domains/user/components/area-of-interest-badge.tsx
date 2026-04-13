import { Text } from "@/components/ui/text";

export const AreaOfInterestBadge = ({ area }: { area: string }) => (
  <Text
    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
    size={"xs"}
  >
    {area}
  </Text>
);
