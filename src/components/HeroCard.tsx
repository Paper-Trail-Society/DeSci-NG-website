import { Link } from "react-router";

export const HeroCard = ({
  image,
  title,
  link,
  imageClassName,
}: {
  image: string;
  title: string;
  link: string;
  imageClassName?: string;
}) => {
  return (
    <Link
      to={link}
      target="_blank"
      className="flex flex-col w-[31%] sm:w-full gap-7 cursor-pointer"
    >
      <img
        src={image}
        alt="paper"
        className={`h-[400px] sm:h-[350px] 2xs:h-[210px] w-full ${
          imageClassName ?? "object-cover object-top"
        }`}
      />
      <p className="text-left 2xs:text-center xs:text-sm hover:text-primary-red">
        {title}
      </p>
    </Link>
  );
};
