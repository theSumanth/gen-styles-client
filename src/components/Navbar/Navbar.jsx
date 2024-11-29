import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Button from "../UI/Button";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import Burger from "./Burger";
import CartButton from "../UI/CartButton";
import CustomSquareButton from "../UI/CustomSquareButton";
import { UserContext } from "../../store/UserContextProvider";
import { LogOut } from "lucide-react";
import { logOut as logOutHttpFn } from "../../util/authHttp";
import { CartContext } from "../../store/CartContextProvider";
import { queryClient } from "../../util/api";

export function AuthActionButtons({ className, burgerOnClick }) {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => {
          if (burgerOnClick) burgerOnClick();
          navigate("/auth?mode=signup");
        }}
        className={`hidden md:block hover:bg-customBackground hover:border-neutral-200 text-base whitespace-nowrap rounded-full ${className}`}
      >
        Sign Up
      </Button>
      <Button
        onClick={() => {
          if (burgerOnClick) burgerOnClick();
          navigate("/auth?mode=login");
        }}
        className={`hidden md:block text-white bg-customBlue text-base whitespace-nowrap rounded-full ${className}`}
      >
        Log In
      </Button>
    </>
  );
}

export function LogoutActionButton({ className }) {
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: ({ authData, signal }) => logOutHttpFn({ authData, signal }),
    onSuccess: () => {
      console.log("logged out");
      userContext.clearUser();
      cartContext.clearCart();
      navigate("/");
      queryClient.resetQueries(["auth-self"]);
    },
  });

  function handleLogoutClick() {
    mutate({ authData: userContext.user });
  }

  return (
    <CustomSquareButton
      label={"Log Out"}
      LucideIcon={LogOut}
      onClick={handleLogoutClick}
      className={`hidden ml-3 md:flex !bg-transparent !text-red-500 border !text-xs border-red-400 !font-xs !py-1 hover:!bg-red-500 hover:!text-white transition-all ${className}`}
    />
  );
}

const Navbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed z-50 flex flex-row w-full justify-between px-2 py-2 md:px-6 bg-customBackground border-b-2 border-neutral-200">
      <Logo />
      <Searchbar />
      <div className="flex flex-row md:gap-2 w-[10%] md:w-[25%] justify-end items-center">
        {!isAuthenticated && <AuthActionButtons />}

        {isAuthenticated && (
          <Button
            onClick={() => navigate("/orders")}
            className={`hidden md:block text-white bg-customBlue text-base whitespace-nowrap rounded-full`}
          >
            Orders
          </Button>
        )}

        <CartButton
          onClick={() => navigate("/cart")}
          // label={"Cart"}
          showCartQuantity
          className={"relative hidden md:flex ml-2 !px-2 py-2 !rounded-full"}
        />

        {isAuthenticated && <LogoutActionButton />}
        <Burger isAuthenticated={isAuthenticated} />
      </div>
    </nav>
  );
};

export default Navbar;
