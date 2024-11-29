import { useContext, useRef } from "react";

import { EmblaCarousel } from "../components/EmblaCarousel";
import TrendingProducts from "../components/Products/TrendingProducts";
import PersonalizedProducts from "../components/Products/PersonalizedProducts";
import { UserContext } from "../store/UserContextProvider";
import { getUserFromLocalStorage } from "../util/localStorage";

const HomePage = () => {
  const trendingRef = useRef();
  const { user } = useContext(UserContext);

  const localUser = getUserFromLocalStorage();
  const isAuthenticated = localUser?.id && user?.id;

  function handleShopnowClick() {
    trendingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section className="flex flex-col gap-2">
      <EmblaCarousel onShopnowClick={handleShopnowClick} />
      <TrendingProducts ref={trendingRef} showOnly10Prods />
      {/* <BrandsMarquee /> */}
      {isAuthenticated && <PersonalizedProducts showOnly10Prods />}
    </section>
  );
};

export default HomePage;
