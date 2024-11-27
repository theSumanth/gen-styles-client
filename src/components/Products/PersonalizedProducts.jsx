import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ProductList from "./ProductList";
import CustomSquareButton from "../UI/CustomSquareButton";
import { UserContext } from "../../store/UserContextProvider";
import { getPersonalizedProducts } from "../../util/http";
import { getUserFromLocalStorage } from "../../util/localStorage";
import ErrorBoundary from "../../pages/Error";
import { toast } from "sonner";

const PersonalizedProducts = ({ showOnly10Prods }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const isAuthenticated = getUserFromLocalStorage()?.id && user?.id;

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
    queryKey: ["Personalized products", user?.id],
    queryFn: ({ signal }) =>
      isAuthenticated
        ? getPersonalizedProducts({ signal, userId: user.id })
        : null,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  if (isError && error.status !== 200) {
    toast.error("OpenAi limit exceeded!", {
      description: "Fetching personalized products failed. Try again later.",
    });
  }

  if (isError) {
    return (
      <ErrorBoundary
        title={"Could not fetch the personalized products."}
        message={error.message}
      />
    );
  }

  return (
    <section className="relative bg-neutral-50 m-2 shadow-md rounded-md p-4">
      <ProductList
        listHeading={"Personalized Products"}
        fetchedProducts={fetchedProducts}
        isFetching={isFetching}
      />
      {showOnly10Prods && (
        <CustomSquareButton
          label={"show more"}
          onClick={() => navigate("/personalized-products")}
          className={
            "absolute bottom-3 right-4 bg-white border border-customBlue !text-customBlue !text-xs hover:bg-customBlue hover:!text-white transition-all"
          }
        />
      )}
    </section>
  );
};

export default PersonalizedProducts;
