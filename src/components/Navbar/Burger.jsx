import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// import { Menu, X } from "lucide-react";
import Button from "../UI/Button";
import CartButton from "../UI/CartButton";
import { UserContext } from "../../store/UserContextProvider";
import { CircleUserRound } from "lucide-react";
import { AuthActionButtons, LogoutActionButton } from "./Navbar";

const Burger = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const { user } = useContext(UserContext);

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

  const topBarVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 9 },
  };

  const middleBarVariants = {
    closed: { opacity: 1, scaleX: 1 },
    open: { opacity: 0, scaleX: 0 },
  };

  const bottomBarVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -9 },
  };

  return (
    <div className="relative md:hidden w-full flex justify-center items-center">
      <button ref={buttonRef} onClick={toggleMenu}>
        {/* {isMenuOpen ? <X color="#746eea" /> : <Menu color="#746eea" />} */}
        <motion.div className="w-5 h-5 flex flex-col justify-between items-center">
          <motion.span
            variants={topBarVariants}
            initial="closed"
            animate={isMenuOpen ? "open" : "closed"}
            className="block w-full h-0.5 bg-customBlue"
          ></motion.span>
          <motion.span
            variants={middleBarVariants}
            initial="closed"
            animate={isMenuOpen ? "open" : "closed"}
            className="block w-full h-0.5 bg-customBlue"
          ></motion.span>
          <motion.span
            variants={bottomBarVariants}
            initial="closed"
            animate={isMenuOpen ? "open" : "closed"}
            className="block w-full h-0.5 bg-customBlue"
          ></motion.span>
        </motion.div>
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            animate={{ x: [100, -10, 0], opacity: [0, 1] }}
            exit={{ x: [0, -10, 100], opacity: [1, 0] }}
            transition={{ duration: 0.5 }}
            ref={menuRef}
            className="absolute right-0 top-12 w-52 flex flex-col justify-center items-center gap-2 bg-white p-4 rounded-md shadow-md"
          >
            <div className="flex justify-center items-center gap-2">
              {isAuthenticated && (
                <main>
                  <div className="flex gap-2 justify-center items-center">
                    <CircleUserRound size={18} className="text-neutral-500" />
                    <span className="text-sm text-neutral-500">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400">{user.email}</span>
                </main>
              )}

              {!isAuthenticated && (
                <AuthActionButtons
                  className={"!block"}
                  burgerOnClick={() => setMenuOpen(false)}
                />
              )}
            </div>

            {isAuthenticated && (
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/orders");
                }}
                className={`flex md:hidden text-white bg-customBlue text-base whitespace-nowrap rounded-full`}
              >
                Orders
              </Button>
            )}

            {isAuthenticated && (
              <LogoutActionButton className={"!flex !ml-0"} />
            )}
            <CartButton
              onClick={() => {
                setMenuOpen(false);
                navigate("/cart");
              }}
              label={"Cart"}
              showCartQuantity
              className={"relative flex md:hidden"}
            />

            <h5 className="text-customBlue font-bold text-sm py-1 mt-4">
              GenStyles{" "}
              <span className="text-neutral-500 border-b border-neutral-400 py-1">
                Official
              </span>
            </h5>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Burger;
