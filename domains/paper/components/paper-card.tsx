import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import React, { useState } from "react";
import { Paper } from "../types";
import Link from "next/link";
import { ABSTRACT_PREVIEW_LENGTH } from "../constants";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

const PaperCard = (props: Paper) => {
  const { title, abstract, user, id, slug, ipfsCid } = props;
  const [isAbstractExpanded, setIsAbstractExpanded] = useState(false);

  return (
    <Card className="border-none rounded-md shadow-md w-full">
      <CardHeader>
        <Text size={"xs"} className="hover:underline">
          <Link href={`/api/ipfs/${ipfsCid}`} target="_blank">
            desci.ng.1308.2025 [pdf]
          </Link>
        </Text>
        <CardTitle>
          <Link href={`/paper/${slug}`}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <Text className="text-xs md:text-sm">
          <b>Author(s)</b>: {user.name}
        </Text>
        <Text className="text-xs md:text-sm">
          <b>Abstract</b>{" "}
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

          <div className="flex flex-wrap gap-2 mt-1">
{abstract.length > ABSTRACT_PREVIEW_LENGTH && (
            <Button
              variant={"ghost"}
              onClick={() => setIsAbstractExpanded(!isAbstractExpanded)}
              className="hover:bg-[#F3E7E780] text-sm w-fit text-text-link p-1 cursor-pointer gap-1"
            >
              {isAbstractExpanded ? "See less" : "See more"}
              {isAbstractExpanded && <ChevronUp className="h-4 w-4" />}
            </Button>
          )}

          {isAbstractExpanded && (
            <Button variant={"link"} className="text-text-link px-1">
              <Link
                href={`/paper/${slug}`}
                className="hover:underline text-sm"
              >
                Read full paper
              </Link>
            </Button>
          )}
          </div>
          
        </Text>
      </CardContent>
    </Card>
  );
};

export default PaperCard;
