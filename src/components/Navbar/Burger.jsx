import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Menu } from "lucide-react";
import { AuthActionButtons, LogoutActionButton } from "./Navbar";
import CartButton from "../UI/CartButton";

const Burger = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target) // Exclude clicks on the button itself
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative md:hidden w-full flex justify-center items-center">
      <button ref={buttonRef} onClick={toggleMenu}>
        <Menu color="#746eea" />
      </button>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-12 w-52 flex flex-col justify-center items-center gap-2 bg-white p-4 rounded-md shadow-md"
        >
          <h5 className="mb-2 text-customBlue font-bold text-sm py-1">
            GenStyles{" "}
            <span className="text-neutral-500 border-b border-neutral-400 py-1">
              Official
            </span>
          </h5>
          <div className="flex justify-center items-center gap-2">
            {!isAuthenticated && (
              <AuthActionButtons
                className={"!block"}
                burgerOnClick={() => setMenuOpen(false)}
              />
            )}
          </div>
          <div>
            {isAuthenticated && (
              <LogoutActionButton className={"!flex !ml-0"} />
            )}
          </div>
          <CartButton
            onClick={() => {
              setMenuOpen(false);
              navigate("/cart");
            }}
            label={"Cart"}
            showCartQuantity
            className={"relative md:flex"}
          />
        </div>
      )}
    </div>
  );
};

export default Burger;
