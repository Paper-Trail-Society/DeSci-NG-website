import { Link } from "react-router";

import logo from "../../public/descing.png";
import x from "../../public/twitter.png";
import instagram from "../../public/instagram.svg";
import linkedIn from "../../public/linkedin.png";
import youtube from "../../public/yt.png";

export const Header = () => {
  return (
    <div className="sticky top-0 right-0 z-[999999999]">
      <nav className="layout__container h-[7vh] py-[45px] 2xs:py-[30px] mx-auto my-0 flex gap-x-2 items-center justify-between z-999 bg-primary-black">
        <a href="/">
          <img
            src={logo}
            alt="logo"
            className="w-[169px] h-10 2xs:w-[95px] object-contain"
          />
        </a>

        <div className="flex gap-x-[34px] 2xs:gap-x-4">
          <Link target="_blank" to="https://x.com/DeSci_NG">
            <img
              src={x}
              alt="x icon"
              className="w-[24px] h-[24px] 2xs:h-5 2xs:w-5 object-contain cursor-pointer"
            />
          </Link>
          <Link target="_blank" to="https://www.instagram.com/desci__ng/ ">
            <img
              src={instagram}
              alt="instagram icon"
              className="w-[24px] h-[24px] 2xs:h-5 2xs:w-5 object-contain cursor-pointer"
            />
          </Link>
          <Link target="_blank" to="https://www.linkedin.com/company/desci-ng/">
            <img
              src={linkedIn}
              alt="linkedin icon"
              className="w-[24px] h-[24px] 2xs:h-5 2xs:w-5 object-contain cursor-pointer"
            />
          </Link>
          <Link target="_blank" to="https://www.youtube.com/@DeSci_NG">
            <img
              src={youtube}
              alt="youtube icon"
              className="w-[30px] h-[24px] bg-[#fff] rounded-[3px] 2xs:h-5 2xs:w-[26px] object-contain cursor-pointer"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};
