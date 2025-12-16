import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import React, { useState } from "react";
import { Paper } from "../types";
import Link from "next/link";
import { ABSTRACT_PREVIEW_LENGTH } from "../constants";
import { Button } from "@/components/ui/button";

const PaperCard = (props: Paper) => {
  const { title, abstract, user, id, slug, ipfsCid } = props;
  const [isAbstractExpanded, setIsAbstractExpanded] = useState(false);

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
          <b>Abstract</b>:{" "}
          <Text
            size={"sm"}
            className="leading-6 duration-300 transition-all ease-in-out"
          >
            {isAbstractExpanded
              ? abstract
              : abstract.length > ABSTRACT_PREVIEW_LENGTH
              ? `${abstract.slice(0, ABSTRACT_PREVIEW_LENGTH)}...`
              : abstract}
          </Text>{" "}
          {abstract.length > ABSTRACT_PREVIEW_LENGTH && (
            <Button
              variant={"primary"}
              onClick={() => setIsAbstractExpanded(!isAbstractExpanded)}
              className="hover:underline text-sm w-fit mx-auto text-text-link py-0 cursor-pointer"
            >
              {isAbstractExpanded ? "See less" : "See more"}
            </Button>
          )}
        </Text>
      </CardContent>
    </Card>
  );
};

export default PaperCard;
