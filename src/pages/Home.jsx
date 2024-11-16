import ProductList from "../components/Products/ProductList";
import CustomSquareButton from "../components/UI/CustomSquareButton";

const HomePage = () => {
  return (
    <section>
      <section className="relative bg-neutral-50 m-2 shadow-md rounded-md p-4">
        <ProductList listHeading={"Trending Products"} />
        <CustomSquareButton
          label={"more"}
          className={
            "absolute top-3 right-4 bg-white border border-customBlue !text-customBlue !text-xs hover:bg-customBlue hover:!text-white transition-all"
          }
        />
      </section>
      <section></section>
    </section>
  );
};

export default HomePage;
