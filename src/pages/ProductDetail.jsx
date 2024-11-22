import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { ChevronsLeft, ChevronsRight } from "lucide-react";

import CarouselButton from "../components/UI/CarouselButton";
import { queryClient } from "../util/api";
import { getSingleProduct } from "../util/http";
import ErrorBoundary from "./Error";
import SkeletonProductDetail from "../components/Skeletons/SkeletonProductDetail";

const ProductDetail = () => {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const queryKey = searchParams.get("productFromQueryKey");

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
    queryFn: ({ signal }) => getSingleProduct({ signal, productId }),
    initialData: cachedProduct,
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
  const { _id, title, description, images } = product;

  const imagesLen = images.length;
  function nextStep() {
    setIndex((prev) => (prev >= imagesLen - 1 ? 0 : prev + 1));
  }
  function prevStep() {
    setIndex((prev) => (prev <= 0 ? imagesLen - 1 : prev - 1));
  }

  const layoutId = `product-image-${queryKey}-id-${_id}`;

  return (
    <div className="flex p-4 flex-col md:flex-row items-center md:items-start">
      <aside className="md:h-full w-[95%] flex md:max-w-[35%] p-4 bg-white shadow-md rounded-md">
        <motion.div
          layoutId={layoutId}
          className="relative justify-center items-center w-[100%]"
        >
          <motion.img
            src={images[index]}
            alt="product images"
            key={images[index]}
            className="rounded-md object-cover"
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
      <section className="flex flex-col w-[95%] md:w-[65%] items-start p-6 md:ml-6 my-2 bg-white shadow-md rounded-md md:my-0">
        <div>
          <h4 className="text-lg font-medium">{title}</h4>
        </div>
        <div>
          <span className="text-xs text-neutral-500">{description}</span>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
