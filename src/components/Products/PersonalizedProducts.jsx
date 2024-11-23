import { useQuery } from "@tanstack/react-query";

import ProductList from "./ProductList";
import CustomSquareButton from "../UI/CustomSquareButton";
import { getPersonalizedProducts } from "../../util/http";

const PersonalizedProducts = () => {
  const { data: fetchedProducts, isFetching } = useQuery({
    queryKey: ["Personalized products"],
    queryFn: getPersonalizedProducts,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  return (
    <section className="relative bg-neutral-50 m-2 shadow-md rounded-md p-4">
      <ProductList
        listHeading={"Personalized Products"}
        fetchedProducts={fetchedProducts}
        isFetching={isFetching}
      />
      <CustomSquareButton
        label={"show more"}
        className={
          "absolute bottom-3 right-4 bg-white border border-customBlue !text-customBlue !text-xs hover:bg-customBlue hover:!text-white transition-all"
        }
      />
    </section>
  );
};

export default PersonalizedProducts;
