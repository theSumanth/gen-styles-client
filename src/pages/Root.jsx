import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Navbar from "../components/Navbar";
import { UserContext } from "../store/UserContextProvider";
import { selfReq } from "../util/authHttp";

const RootLayout = () => {
  const userContext = useContext(UserContext);

  const { data } = useQuery({
    queryKey: ["auth-self"],
    queryFn: selfReq,
  });

  useEffect(() => {
    if (data) {
      userContext.storeUser(data);
    }
  }, [data, userContext]);

  return (
    <div className="bg-customBackground min-h-screen flex flex-col">
      <Navbar isAuthenticated={userContext.isAuthenticated} />
      <div className="mt-[4.5rem] flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
