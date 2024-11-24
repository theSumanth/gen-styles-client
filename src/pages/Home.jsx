import { useContext } from "react";

import PersonalizedProducts from "../components/Products/PersonalizedProducts";
import TrendingProducts from "../components/Products/TrendingProducts";
import { UserContext } from "../store/UserContextProvider";
import { getUserFromLocalStorage } from "../util/localStorage";

const HomePage = () => {
  const { user } = useContext(UserContext);

  const localUser = getUserFromLocalStorage();
  const isAuthenticated = localUser?.id && user?.id;
  return (
    <section className="flex flex-col gap-2">
      <TrendingProducts />
      {isAuthenticated && <PersonalizedProducts />}
      <section></section>
    </section>
  );
};

export default HomePage;
