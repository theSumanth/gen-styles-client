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
      <NavLink
        to={"/"}
        end
        className="hidden md:flex w-[25%] custom-range:w-[10%] justify-start items-center"
      >
        <span className="inline-block text-xs md:text-base">
          <Sparkle className="w-4 h-4 md:w-6 md:h-6" />
        </span>
        <span className="inline-block font-roboto text-xl md:text-3xl font-black">
          Gen
        </span>
        <span className="inline-block font-playwrite text-xs text-customBlue font-semibold md:text-base md:mt-1">
          Styles
        </span>
      </NavLink>
    </>
  );
};

export default Logo;
