import PersonalizedProducts from "../components/Products/PersonalizedProducts";
import TrendingProducts from "../components/Products/TrendingProducts";

const HomePage = () => {
  return (
    <section className="flex flex-col gap-2">
      <TrendingProducts />
      <PersonalizedProducts />
      <section></section>
    </section>
  );
};

export default HomePage;
