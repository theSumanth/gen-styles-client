import { forwardRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ProductList from "./ProductList";
import ErrorBoundary from "../../pages/Error";
import { getTop20TrendProducts } from "../../util/http";
import CustomSquareButton from "../UI/CustomSquareButton";

// eslint-disable-next-line react/display-name
const TrendingProducts = forwardRef(({ showOnly10Prods }, ref) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!showOnly10Prods) {
      window.scrollTo(0, 0);
    }
  }, [showOnly10Prods]);

  const {
    data: fetchedProducts,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["Trending Products"],
    queryFn: getTop20TrendProducts,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  if (isError) {
    return (
      <ErrorBoundary
        title={"Could not fetch the trending products."}
        message={error.message}
      />
    );
  }

  return (
    <section
      ref={ref}
      className="relative bg-neutral-50 m-2 shadow-md rounded-md p-4"
    >
      <ProductList
        listHeading={"Trending Products"}
        fetchedProducts={fetchedProducts}
        isFetching={isFetching}
        showOnly10Prods
      />
      {showOnly10Prods && (
        <CustomSquareButton
          label={"show more"}
          onClick={() => navigate("/trending-products")}
          className={
            "absolute bottom-3 right-4 bg-white border border-customBlue !text-customBlue !text-xs hover:bg-customBlue hover:!text-white transition-all"
          }
        />
      )}
    </section>
  );
});

export default TrendingProducts;
