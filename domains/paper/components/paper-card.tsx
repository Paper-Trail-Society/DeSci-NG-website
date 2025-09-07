import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import React from "react";
import { Paper } from "../types";
import Link from "next/link";

const PaperCard = (props: Paper) => {
  const { title, abstract, user, id } = props;
  return (
    <Card className="border-none">
      <CardHeader>
        <Text>desci.ng.1308.2025 [pdf]</Text>
        <CardTitle>
          <Link href={`/paper/${id}`}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text>
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
