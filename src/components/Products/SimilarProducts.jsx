import { toast } from "sonner";
import ErrorBoundary from "../../pages/Error";
import SkeletonSimilarProductCard from "../Skeletons/SkeletonSimilarProductCard";
import SimilarProductCard from "./SimilarProductCard";
import { Sparkle } from "lucide-react";

const SimilarProducts = ({
  fetchedProducts,
  isFetching,
  isFetchSimilarError,
  similarFetchError,
}) => {
  if (isFetchSimilarError) {
    toast.error("Fetching similar products failed!", {
      description: "Please try again later.",
    });

    return (
      <ErrorBoundary
        title={"Could not fetch similar products"}
        message={similarFetchError.message}
      />
    );
  }

  return (
    <section className="shadow-md rounded-md">
      <div className="bg-neutral-50 mb-3 rounded-md p-4">
        <h2 className="flex justify-center items-center gap-2 text-customBlue text-lg  font-bold">
          <Sparkle size={18} /> <span>Similar Products</span>
        </h2>
        <ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-items-center p-4 px-11 md:px-0">
          {fetchedProducts && fetchedProducts.length === 0 && (
            <p className="text-neutral-500 text-sm">No products found :&#40;</p>
          )}
          {(isFetching || !fetchedProducts) && (
            <SkeletonSimilarProductCard cardsCount={10} />
          )}
          {!isFetching &&
            fetchedProducts &&
            fetchedProducts.map((product) => (
              <SimilarProductCard key={product._id} productData={product} />
            ))}
        </ul>
      </div>
    </section>
  );
};

export default SimilarProducts;
