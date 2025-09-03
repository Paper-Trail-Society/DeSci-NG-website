import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import React from "react";

const PaperCard = () => {
  return (
    <Card className="border-none">
      <CardHeader>
        <Text>desci.ng.1308.2025 [pdf]</Text>
        <CardTitle>
          Memecoins on Solana: A Cultural, Economical and Technical
          Investigation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text><b>Author(s)</b>: Mosadoluwa Fasasi</Text>
        <Text size={"sm"}>
          <b>Abstract</b>: This study investigates meme coins on the Solana blockchain
          through the triad lens of culture, economics and technical
          architecture. Drawing on anthropological frameworks of memetics,
          market dynamics and network performance data, this research
          investigates how internet culture materializes into real-world
          financial instruments and the impact it has on the technical
          infrastructures it is built upon. The cultural dimension explores the
          origin of memes and meme-based cryptocurrencies vis-a-vis their
          function as vehicles for collective and social identity, spreading
          through digital networks into real-world nodes. Economically, this
          study analyzes the speculative dynamics and value creation mechanisms
          that distinguish meme coins from utility-focused cryptocurrencies
          (citing exemptions), drawing insights from how social sentiment
          translates into market behavior and economic empowerment. From a
          technical perspective, this research takes a cursory look at how
          memecoins serve as an unintentional stress test for Solana’s consensus
          architecture, revealing current infrastructural bottlenecks and
          evolution.
        </Text>
      </CardContent>
    </Card>
  );
};

export default PaperCard;
