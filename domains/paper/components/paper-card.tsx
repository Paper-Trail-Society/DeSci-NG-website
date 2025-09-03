import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import React from "react";
import { Paper } from "../types";

const PaperCard = (props: Paper) => {
    const { title, abstract, user} = props
  return (
    <Card className="border-none">
      <CardHeader>
        <Text>desci.ng.1308.2025 [pdf]</Text>
        <CardTitle>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text><b>Author(s)</b>: {user.name}</Text>
        <Text size={"sm"}>
          <b>Abstract</b>: {abstract}
        </Text>
      </CardContent>
    </Card>
  );
};

export default PaperCard;
