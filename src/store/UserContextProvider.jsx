import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserToLocalStorage,
} from "../util/localStorage";
import { selfReq } from "../util/authHttp";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({
  user: {},
  isAuthenticated: false,
  storeUser: () => {},
  clearUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const isUserLoggedInPreviously = getUserFromLocalStorage();

  const { data } = useQuery({
    queryKey: ["auth-self"],
    queryFn: isUserLoggedInPreviously ? selfReq : null,
    enabled: isUserLoggedInPreviously ? true : false,
  });

  useEffect(() => {
    if (data) {
      storeUser(data);
    } else {
      clearUser(data);
    }
  }, [data]);

  function storeUser(userObj) {
    setUserToLocalStorage(userObj);
    setUserData(userObj);
  }

  function clearUser() {
    removeUserFromLocalStorage();
    setUserData(null);
  }

  const userContext = {
    user: userData,
    isAuthenticated: userData ? true : false,
    storeUser,
    clearUser,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
