import { useContext } from "react";

import TrendingProducts from "../components/Products/TrendingProducts";
import PersonalizedProducts from "../components/Products/PersonalizedProducts";
import { UserContext } from "../store/UserContextProvider";
import { getUserFromLocalStorage } from "../util/localStorage";

const HomePage = () => {
  const { user } = useContext(UserContext);

  const localUser = getUserFromLocalStorage();
  const isAuthenticated = localUser?.id && user?.id;
  return (
    <section className="flex flex-col gap-2">
      <TrendingProducts />
      {/* <BrandsMarquee /> */}
      {isAuthenticated && <PersonalizedProducts showOnly10Prods />}
    </section>
  );
};

export default HomePage;
