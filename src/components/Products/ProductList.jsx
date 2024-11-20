import { useQuery } from "@tanstack/react-query";

import { Flame, Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";
import {
  getTop20TrendProducts,
  getPersonalizedProducts,
} from "../../util/http";

function SectionHeader({ listHeading }) {
  const LucideIcons = {
    "Trending Products": Flame,
    "Personalized Products": Sparkles,
  };

  const Icon = LucideIcons[listHeading];

  return (
    <div className="relative flex items-center justify-center text-lg font-bold text-neutral-500 z-0">
      <h2 className="flex sm:bg-none md:bg-neutral-50 px-8">
        <Icon size={23} className="mx-2" /> {listHeading}
      </h2>
      <span className="sm:w-0 border-t-2 absolute md:w-[72%] z-[-10]"></span>
    </div>
  );
}

const ProductList = ({ listHeading }) => {
  const getProductsFn =
    listHeading === "Trending Products"
      ? getTop20TrendProducts
      : getPersonalizedProducts;

  const { data: fetchedData, isLoading } = useQuery({
    queryKey: [`products ${listHeading}`],
    queryFn: getProductsFn,
  });

  if (isLoading) return <>Loading...</>;
  const fetchedProducts = fetchedData.data;
  console.log(listHeading, fetchedProducts);

  return (
    <div className="mb-3">
      <SectionHeader listHeading={listHeading} />
      <ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-items-center p-4 px-11 md:px-0">
        {fetchedData &&
          fetchedProducts.map((product) => {
            return (
              <ProductCard
                key={product._id}
                productData={product}
                productFromQueryKey={`products ${listHeading}`}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default ProductList;
