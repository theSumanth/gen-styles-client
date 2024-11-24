import { useContext } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import { UserContext } from "../store/UserContextProvider";
import { getUserFromLocalStorage } from "../util/localStorage";

const RootLayout = () => {
  const { isAuthenticated } = useContext(UserContext);
  const userId = getUserFromLocalStorage().id;

  return (
    <div className="bg-customBackground min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated && userId} />
      <div className="mt-[4.5rem] flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
