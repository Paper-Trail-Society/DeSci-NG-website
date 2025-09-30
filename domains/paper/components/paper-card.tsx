import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import React from "react";
import { Paper } from "../types";
import Link from "next/link";

const PaperCard = (props: Paper) => {
  const { title, abstract, user, id, slug, ipfsCid } = props;
  return (
    <Card className="border-none">
      <CardHeader>
        <Text size={"xs"} className="hover:underline">
          <Link href={`/api/ipfs/${ipfsCid}`} target="_blank">
            desci.ng.1308.2025 [pdf]
          </Link>
        </Text>
        <CardTitle>
          <Link href={`/paper/${slug ?? id}`}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text size={"sm"}>
          <b>Author(s)</b>: {user.name}
        </Text>
        <Text size={"sm"}>
          <b>Abstract</b>: {abstract}
        </Text>
      </CardContent>
    </Card>
  );
};

export default PaperCard;
