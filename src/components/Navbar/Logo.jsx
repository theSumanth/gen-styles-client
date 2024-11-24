import { NavLink } from "react-router-dom";

import gslogo from "../../assets/gsLogo.png";
import { Sparkle } from "lucide-react";

const Logo = () => {
  return (
    <>
      <NavLink
        to={"/"}
        className="flex justify-center mx-1 md:justify-start w-[10%] md:hidden items-center"
      >
        <img
          src={gslogo}
          alt="AI icon"
          className="w-9 h-9 sm:w-10 sm:h-10 md:hidden"
        />
      </NavLink>
      <div className="hidden md:flex w-[25%] custom-range:w-[10%] justify-start items-center">
        <div className="relative flex items-center justify-center">
          <span className="inline-block text-xs md:text-base">
            <Sparkle className="w-4 h-4 md:w-6 md:h-6" />
          </span>
          <span className="inline-block font-roboto text-2xl lg:text-3xl font-black">
            Gen
          </span>
          <span className="inline-block font-playwrite text-[0.8rem] lg:text-base text-customBlue font-semibold md:mt-1">
            Styles
          </span>{" "}
          <NavLink
            to={"/"}
            className={"absolute top-0 left-0 right-0 bottom-0"}
          />
        </div>
      </div>
    </>
  );
};

export default Logo;
