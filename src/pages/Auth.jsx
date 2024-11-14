import { motion } from "framer-motion";
import { NavLink, useSearchParams } from "react-router-dom";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

const Auth = () => {
  const [searchParams] = useSearchParams();

  const MotionButton = motion.create(Button);

  const authMode = searchParams.get("mode");

  const authHeading = authMode === "login" ? "Log In" : "Sign Up";

  return (
    <div className="bg-neutral-100 pt-20 md:pt-32">
      <motion.main
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="m-auto flex flex-col gap-2 justify-center items-center bg-white w-80 md:w-[22rem] py-4 px-6 rounded-md shadow-lg"
      >
        <h1 className="font-bold text-xl text-customBlue pb-2">
          {authHeading}
        </h1>
        {authMode !== "login" && (
          <Input
            label="Full Name"
            labelCssClass={"text-xs font-semibold text-neutral-500"}
            id="fullname"
            type="text"
          />
        )}

        <Input
          label="Email or username"
          labelCssClass={"text-xs font-semibold text-neutral-500"}
          id="email"
          type="text"
        />
        <Input
          label="Password"
          labelCssClass={"text-xs font-semibold text-neutral-500"}
          id="password"
          type="password"
        />
        <MotionButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          className={"text-white bg-customBlue w-full rounded-md text-xs"}
        >
          {authHeading}
        </MotionButton>
        <p className="text-xs font-normal pt-4">
          {authMode !== "login" ? (
            <>
              Already have an account?{" "}
              <NavLink
                to={"/auth?mode=login"}
                className={"text-customBlue font-medium underline"}
              >
                Log In here.
              </NavLink>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <NavLink
                to={"/auth?mode=signup"}
                className={"text-customBlue font-medium underline"}
              >
                Sign Up here.
              </NavLink>
            </>
          )}
        </p>
      </motion.main>
    </div>
  );
};

export default Auth;
