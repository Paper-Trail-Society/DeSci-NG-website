export const HeroCard = ({
  image,
  title,
}: {
  image?: string;
  title: string;
}) => {
  return (
    <div className="flex flex-col w-[47%] sm:w-full gap-7">
      <div className="bg-[#fff] h-[362px] w-full"></div>
      <p className="text-left 2xs:text-center text-[25px] 2xs:text-[18px] sx:text-sm">
        {title}
      </p>
    </div>
  );
};
