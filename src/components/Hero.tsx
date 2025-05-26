import { HeroCard } from "./HeroCard";
import desciCase from "../../public/A case for decentralized science.png";
import whitePaper from "../../public/whitepaper thumbnail.png";
import convo from "../../public/convo.jpg";
import desciRising from "../../public/desci-rising.jpeg";

export const Hero = () => {
  return (
    <div className="flex-1 py-20 2xs:py-14 flex flex-col items-center justify-center layout__container text-center">
      <p className="text-[55px] 2xs:text-[40px] xs:text-[24px] xs:w-[85%] leading-tight font-times-new-roman">
        Nigeria's First Decentralised <br className="sm:hidden" /> Research Repository{" "}
      </p>
      <p className="text-[25px] xs:text-sm mt-[72px] 2xs:mt-[50px]">
        Inspired by Sci-hub and the global $scihub community.{" "}
        <br className="xs:hidden" />
        An unstoppable force for education, innovation and humanity.
      </p>

      <div className="flex flex-wrap gap-y-[40px] justify-between mt-[125px] 2xs:mt-[65px] w-full">
        <HeroCard
          link="/a-case-for-desci"
          title="Read “A Case for Decentralized Science”"
          image={desciCase}
        />
        <HeroCard
          link="https://www.scihub.fans/scihub_paradigm.pdf"
          title="Read “The $scihub Whitepaper”"
          image={whitePaper}
        />
        <HeroCard
          link="https://x.com/i/spaces/1eaKbareqnRxX"
          title="Join the conversation, “Unlocking Public Good with Vitamin C: Health, Impact and Big Ideas”"
          image={convo}
          imageClassName="object-cover"
        />
        <HeroCard
          link="https://x.com/i/spaces/1lPJqMRLzMnJb"
          title="DeSci Rising (Ep 8) ft. DeSci Nigeria"
          image={desciRising}
          imageClassName="object-cover object-right"
        />
      </div>
    </div>
  );
};
