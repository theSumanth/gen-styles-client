import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import { ChevronsLeft, ChevronsRight } from "lucide-react";

import CarouselButton from "../components/UI/CarouselButton";
import { queryClient } from "../util/api";

const ProductDetail = () => {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const queryKey = searchParams.get("productFromQueryKey");

  const { data: cachedProducts } = queryClient.getQueryData([queryKey]);

  const product = cachedProducts.find((p) => p._id === productId);

  const { _id, title, description, images } = product;

  const [index, setIndex] = useState(0);

  const imagesLen = images.length;
  function nextStep() {
    setIndex((prev) => (prev >= imagesLen - 1 ? 0 : prev + 1));
  }
  function prevStep() {
    setIndex((prev) => (prev <= 0 ? imagesLen - 1 : prev - 1));
  }

  return (
    <div className="flex p-4 flex-col md:flex-row items-center md:items-start">
      <aside className="md:h-full w-[95%] flex md:max-w-[45%] p-4 bg-white shadow-md rounded-md">
        <motion.div
          layoutId={`product-image-${_id}`}
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
      <section className="flex flex-col w-[95%] items-start p-6 md:ml-6 my-2 bg-white shadow-md rounded-md md:my-0">
        <div>
          <h4 className="text-xl font-medium">{title}</h4>
        </div>
        <div>
          <span className="text-xs text-neutral-500">{description}</span>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
