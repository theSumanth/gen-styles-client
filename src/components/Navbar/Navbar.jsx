import { NavLink } from "react-router-dom";

import Button from "../UI/Button";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import Burger from "./Burger";

const Navbar = () => {
  return (
    <nav className="flex flex-row w-full justify-between px-2 py-4 md:px-6 bg-neutral-100 border-b-2 border-neutral-200">
      <Logo />
      <Searchbar />
      <div className="flex flex-row md:gap-2 w-[10%] md:w-[20%] justify-end">
        <NavLink to={"/auth?mode=signup"} end>
          <Button
            className={
              "hidden md:block hover:bg-neutral-100 hover:border-neutral-200 text-base whitespace-nowrap rounded-full"
            }
          >
            Sign Up
          </Button>
        </NavLink>
        <NavLink to={"/auth?mode=login"} end>
          <Button
            className={
              "hidden md:block text-white bg-customBlue text-base whitespace-nowrap rounded-full"
            }
          >
            Log In
          </Button>
        </NavLink>

        <Burger />
      </div>
    </nav>
  );
};

export default Navbar;
