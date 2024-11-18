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

  console.log("root");
  useEffect(() => {
    if (data) {
      userContext.storeUser(data);
    }
  }, [data, userContext]);

  return (
    <>
      <div className="bg-customBackground h-screen">
        <Navbar isAuthenticated={userContext.isAuthenticated} />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
