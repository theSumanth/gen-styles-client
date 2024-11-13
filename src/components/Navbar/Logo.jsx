import { NavLink } from "react-router-dom";

import { Sparkle } from "lucide-react";
import stars from "../../assets/stars.png";

const Logo = () => {
  return (
    <>
      <div className="flex justify-center mx-1 md:justify-start w-[10%] md:hidden items-center">
        <img src={stars} alt="AI icon" className="w-6 h-6 md:hidden" />
      </div>
      <NavLink
        to={"/"}
        end
        className="hidden md:flex w-[20%] justify-start items-center"
      >
        <span className="inline-block text-xs md:text-base">
          <Sparkle className="w-4 h-4 md:w-6 md:h-6" />
        </span>
        <span className="inline-block font-roboto text-xl md:text-3xl font-black">
          Gen
        </span>
        <span className="inline-block font-playwrite text-xs text-purple-800 font-medium md:text-base md:mt-1">
          Styles
        </span>
      </NavLink>
    </>
  );
};

export default Logo;
