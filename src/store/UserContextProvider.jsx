import { createContext, useState } from "react";
import CartContextProvider from "./CartContextProvider";
import {
  removeUserFromLocalStorage,
  setUserToLocalStorage,
} from "../util/localStorage";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({
  user: {},
  isAuthenticated: false,
  storeUser: () => {},
  clearUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

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
      <CartContextProvider>{children}</CartContextProvider>
    </UserContext.Provider>
  );
};

export default UserContextProvider;
