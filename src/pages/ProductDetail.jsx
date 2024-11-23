import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { ChevronsLeft, ChevronsRight } from "lucide-react";

import CarouselButton from "../components/UI/CarouselButton";
import { queryClient } from "../util/api";
import { getSimilarProducts, getSingleProduct } from "../util/http";
import ErrorBoundary from "./Error";
import SkeletonProductDetail from "../components/Skeletons/SkeletonProductDetail";
import Sizes from "../components/Products/Sizes";
import CartButton from "../components/UI/CartButton";
import SimilarProducts from "../components/Products/SimilarProducts";

const ProductDetail = () => {
  window.scrollTo(0, 0);
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const queryKey = searchParams.get("productFromQueryKey");
  const product_id = searchParams.get("product_id");

  const [selectedSize, setSelectedSize] = useState(undefined);
  const [index, setIndex] = useState(0);

  const cachedProducts = queryKey
    ? queryClient.getQueryData([queryKey])
    : undefined;
  const cachedProduct = cachedProducts?.find((p) => p._id === productId);

  const {
    data: fetchedProduct,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: ({ signal }) =>
      getSingleProduct({ signal, productId, pid: product_id }),
    initialData: queryKey ? cachedProduct : null,
  });

  const { data: fetchedSimilarProducts, isFetchingSimilar } = useQuery({
    queryKey: ["Similar Products"],
    queryFn: ({ signal }) => getSimilarProducts({ signal, pid: product_id }),
    // cacheTime: 30 * 60 * 1000,
  });

  if (isError) {
    return (
      <ErrorBoundary
        title={"Failed to fetch the product"}
        message={error.message}
        className={"mt-32"}
      />
    );
  }

  if (isLoading) {
    return <SkeletonProductDetail />;
  }

  const product = fetchedProduct || cachedProduct;
  const { _id, title, description, price, images, sizes, fabric, style } =
    product;

  const imagesLen = images.length;
  function nextStep() {
    setIndex((prev) => (prev >= imagesLen - 1 ? 0 : prev + 1));
  }
  function prevStep() {
    setIndex((prev) => (prev <= 0 ? imagesLen - 1 : prev - 1));
  }

  const layoutId = `product-image-${queryKey}-id-${_id}`;

  return (
    <>
      <div className="flex p-4 flex-col md:flex-row items-center md:items-start">
        <aside className="md:h-full w-[95%] flex md:max-w-[35%] p-4 bg-white shadow-md rounded-md">
          <motion.div
            layoutId={layoutId}
            className="relative justify-center items-center w-full"
          >
            <motion.img
              src={images[index]}
              alt="product images"
              key={images[index]}
              className="rounded-md object-cover w-full"
            />
            <CarouselButton
              onClick={prevStep}
              className={"left-0 top-1/2 -translate-y-1/2"}
            >
              <ChevronsLeft />
            </CarouselButton>
            <CarouselButton
              onClick={nextStep}
              className={"right-0 top-1/2 -translate-y-1/2"}
            >
              <ChevronsRight />
            </CarouselButton>
          </motion.div>
        </aside>
        <section className="flex flex-col gap-2 w-[95%] md:w-[65%] items-start p-6 md:ml-6 my-2 bg-white shadow-md rounded-md md:my-0">
          <h4 className="text-lg font-medium">{title}</h4>
          <div className="flex flex-col">
            <p className="flex gap-2">
              <span className="text-sm font-semibold text-neutral-500 line-through">
                {`Rs. ${price + price * 0.2}`}
              </span>
              <span className="text-sm font-semibold text-red-500">{`(20% off)`}</span>
            </p>

            <h4 className="text-lg font-semibold text-neutral-700">
              Rs. {price}
            </h4>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-neutral-500">
              SELECT SIZE
            </span>
            <Sizes
              sizes={sizes}
              className={"!text-sm gap-4"}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>

          <motion.div className="w-full">
            <CartButton
              label={"Add to Cart"}
              selectedSize={selectedSize}
              key={_id}
              productData={product}
              className="flex w-full py-2 z-10 md:w-[50%] lg:w-[40%] items-center justify-center hover:bg-green-400 transition-all duration-300 "
            />
          </motion.div>

          <ul className="flex flex-col mt-2 text-neutral-500 list-disc marker:text-customBlue list-inside">
            <span className="font-semibold text-xs">PRODUCT DETAILS</span>
            <li>
              <span className="text-xs">{description}</span>
            </li>
            <li>
              <span className="text-xs">{fabric}</span>
            </li>
            <li>
              <span className="text-xs">{style}</span>
            </li>
          </ul>

          <ul className="flex flex-col mt-2 text-neutral-500 list-disc marker:text-customBlue list-inside ">
            <span className="font-semibold text-xs">SOLD BY</span>
            <h4 className="text-customBlue text-sm font-bold my-1">
              GenStyles Official
            </h4>
            <li>
              <span className="text-xs">90% Positive feedback</span>
            </li>
            <li>
              <span className="text-xs">69 brand products</span>
            </li>
            <li>
              <span className="text-xs">
                All products comes with 3 month Warranty
              </span>
            </li>
          </ul>
        </section>
      </div>
      <SimilarProducts
        fetchedProducts={fetchedSimilarProducts}
        isFetching={isFetchingSimilar}
      />
    </>
  );
};

export default ProductDetail;
