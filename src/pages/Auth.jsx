import { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { UserContext } from "../store/UserContextProvider";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { Eye, EyeClosed } from "lucide-react";
import { sigUp, logIn } from "../util/authHttp";

const CustomPasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Input
      label="Password"
      id="password"
      name="password"
      type={showPassword ? "text" : "password"}
      inputCssClass={"!pr-8"}
    >
      <button
        className="absolute right-2 bottom-4 text-neutral-500"
        type="button"
      >
        {!showPassword ? (
          <EyeClosed
            onClick={() => setShowPassword(true)}
            size={18}
            className="text-neutral-500"
          />
        ) : (
          <Eye
            onClick={() => setShowPassword(false)}
            size={18}
            color="#746eea"
          />
        )}
      </button>
    </Input>
  );
};

const Auth = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const userContext = useContext(UserContext);

  const { mutate, status } = useMutation({
    mutationFn: ({ signal, authData }) => authHttpFn({ authData, signal }),
    onSuccess: (resData) => {
      console.log("Sign In/Log In success");
      userContext.storeUser(resData);
      navigate("/");
    },
    onError: () => console.log("error"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const authData = Object.fromEntries(formData.entries());
    mutate({ authData });
  };

  const MotionButton = motion.create(Button);

  const isAuthSubmitting = status === "pending";

  const authMode = searchParams.get("mode");
  const authHeading = authMode === "login" ? "Log In" : "Sign In";
  const authActionBtnLabel =
    authMode === "login"
      ? isAuthSubmitting
        ? "Logging In..."
        : "Log In"
      : isAuthSubmitting
      ? "Signing Up..."
      : "Sign Up";

  const authHttpFn = authMode === "login" ? logIn : sigUp;

  return (
    <div className="bg-customBackground pt-16">
      <motion.form
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        ref={formRef}
        onSubmit={handleSubmit}
        method="POST"
        className="m-auto flex flex-col gap-2 justify-center items-center bg-white w-80 md:w-[22rem] py-4 px-6 rounded-md shadow-lg"
      >
        <h1 className="font-bold text-xl text-customBlue pb-2">
          {authHeading}
        </h1>
        {authMode !== "login" && (
          <>
            <Input
              label="First Name"
              id="firstName"
              type="text"
              name="firstName"
              title="firstName"
            />
            <Input
              label="Last Name"
              id="lastName"
              type="text"
              name="lastName"
              title="lastName"
            />
            <div className="flex gap-3 justify-start items-center w-full">
              <span className="text-xs font-semibold text-neutral-500">
                Gender
              </span>
              <Input
                type="radio"
                label={"Male"}
                isRadio
                name={"gender"}
                title={"male"}
                value={"male"}
                id={"male"}
              />
              <Input
                type="radio"
                label={"Female"}
                isRadio
                name={"gender"}
                title={"female"}
                value={"female"}
                id={"female"}
              />
            </div>
          </>
        )}

        <Input
          label="Email"
          id="email"
          type="text"
          name="email"
          title="email"
        />
        <CustomPasswordInput />

        <MotionButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          disabled={isAuthSubmitting}
          className={
            "text-white bg-customBlue w-full rounded-md text-xs disabled:bg-opacity-80"
          }
        >
          {authActionBtnLabel}
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
      </motion.form>
    </div>
  );
};

export default Auth;
