import SkeletonSimilarProductCard from "../Skeletons/SkeletonSimilarProductCard";
import SimilarProductCard from "./SimilarProductCard";

const SimilarProducts = ({ fetchedProducts, isFetching }) => {
  return (
    <section className="shadow-md rounded-md">
      <div className="bg-neutral-50 mb-3 rounded-md p-4">
        <h2 className="text-customBlue text-lg text-center font-bold">
          Similar Products
        </h2>
        <ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-items-center p-4 px-11 md:px-0">
          {isFetching && <SkeletonSimilarProductCard cardsCount={10} />}

          {fetchedProducts &&
            fetchedProducts.map((product) => (
              <SimilarProductCard
                key={product._id}
                productData={product}
                productFromQueryKey={"Similar Products"}
              />
            ))}
        </ul>
      </div>
    </section>
  );
};

export default SimilarProducts;
