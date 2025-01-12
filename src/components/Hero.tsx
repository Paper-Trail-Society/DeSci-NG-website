import { HeroCard } from "./HeroCard";

export const Hero = () => {
  return (
    <div className="flex-1 py-20 flex flex-col items-center justify-center layout__container text-center">
      <p className="text-[60px] 2xs:text-[45px] xs:text-[28px] leading-tight">
        Accelerating the Ideals of <br className="sm:hidden" /> DeSci in Nigeria{" "}
      </p>
      <p className="text-[25px] xs:text-sm mt-[72px] 2xs:mt-[50px]">
        Inspired by Sci-hub and the global $scihub community.{" "}
        <br className="xs:hidden" />
        An unstoppable force for education, innovation and humanity.
      </p>

      <div className="flex flex-wrap gap-y-[40px] justify-between mt-[125px] 2xs:mt-[65px] w-full">
        <HeroCard title="Read “A Case for Decentralized Science”" />
        <HeroCard title="Read “The $scihub Whitepaper”" />
      </div>
    </div>
  );
};
