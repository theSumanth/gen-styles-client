import { NavLink } from "react-router-dom";

import Button from "../UI/Button";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import Burger from "./Burger";
import CartButton from "../UI/CartButton";

const Navbar = () => {
  return (
    <nav className="flex flex-row w-full justify-between px-2 py-2 md:px-6 bg-customBackground border-b-2 border-neutral-200">
      <Logo />
      <Searchbar />
      <div className="flex flex-row md:gap-2 w-[10%] md:w-[25%] justify-end items-center">
        <NavLink to={"/auth?mode=signup"} end>
          <Button
            className={
              "hidden md:block hover:bg-customBackground hover:border-neutral-200 text-base whitespace-nowrap rounded-full"
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
        <CartButton
          label={"Cart"}
          showCartQuantity
          className={"relative hidden md:flex ml-2"}
        />
        <Burger />
      </div>
    </nav>
  );
};

export default Navbar;
