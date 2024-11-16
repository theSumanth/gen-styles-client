import { Flame } from "lucide-react";

import { products } from "../../util/products";
import ProductCard from "./ProductCard";

const ProductList = ({ listHeading }) => {
  return (
    <div className="">
      <div className="relative flex items-center justify-center text-lg font-bold text-neutral-500 z-0">
        <h2 className="flex sm:bg-none md:bg-neutral-50 px-8">
          <Flame size={25} /> {listHeading}
        </h2>
        <span className="sm:w-0 border-t-2 absolute md:w-[72%] z-[-10]"></span>
      </div>
      <ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-items-center p-4 px-14 md:px-0">
        {products.map((product) => {
          return <ProductCard key={product.id} productData={product} />;
        })}
      </ul>
    </div>
  );
};

export default ProductList;
