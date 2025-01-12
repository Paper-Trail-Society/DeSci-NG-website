import logo from "../../public/descing.png";
import x from "../../public/twitter.png";

export const Header = () => {
  return (
    <div className="sticky top-0 right-0 z-[999999999]">
      <nav className="layout__container h-[7vh] py-[45px] 2xs:py-[30px] mx-auto my-0 flex items-center justify-between z-999 bg-primary-black">
        <a href="/">
          <img
            src={logo}
            alt="logo"
            className="w-[169px] h-10 2xs:w-[95px] object-contain"
          />
        </a>

        <div className="flex gap-x-[34px] 2xs:hidden">
          <img src={x} alt="x icon" className="w-[24px] h-[24px] cursor-pointer" />
          <img src={x} alt="x icon" className="w-[24px] h-[24px] cursor-pointer" />
          <img src={x} alt="x icon" className="w-[24px] h-[24px] cursor-pointer" />
        </div>

        {/* <div className="hamburger">
          <img src={hamburgerIcon} alt="menu" className="hamburger-icon" />
        </div> */}
      </nav>
    </div>
  );
};
