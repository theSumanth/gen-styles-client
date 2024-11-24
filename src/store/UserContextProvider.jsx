import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { SkeletonTheme } from "react-loading-skeleton";

import CartContextProvider from "./CartContextProvider";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserToLocalStorage,
} from "../util/localStorage";
import { selfReq } from "../util/authHttp";
import SearchContextProvider from "./SearchContextProvider";

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
    <UserContext.Provider value={userContext}>
      <SkeletonTheme baseColor="#D5D3E5" highlightColor="#F1F0F6">
        <SearchContextProvider>
          <CartContextProvider>{children}</CartContextProvider>
        </SearchContextProvider>
      </SkeletonTheme>
    </UserContext.Provider>
  );
};

export default UserContextProvider;
