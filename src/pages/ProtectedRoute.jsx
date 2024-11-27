import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../store/UserContextProvider";

import { getUserFromLocalStorage } from "../util/localStorage";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  const isAuthenticated = user?.id && getUserFromLocalStorage()?.id;

  if (!isAuthenticated) {
    return <Navigate to="/auth?mode=login" replace />;
  }
  return children;
};

export default ProtectedRoute;
