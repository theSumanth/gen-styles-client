import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import CartButton from "../UI/CartButton";
import Sizes from "./Sizes";
import { useState } from "react";

const ProductCard = ({ productData }) => {
  const [selectedSize, setSelectedSize] = useState(undefined);

  const { _id, product_id, title, images, price, sizes } = productData;

  const cartButtonVariants = {
    idle: { y: 8, opacity: 0, pointerEvents: "none" },
    hovered: { y: 8, opacity: 1, pointerEvents: "auto" },
  };

  return (
    <motion.li
      className="relative bg-white rounded-md shadow w-[14rem] h-[23rem] m-2 hover:shadow-md transition-all"
      whileHover="hovered"
      initial="idle"
    >
      <div className="p-3">
        <NavLink to={`/${_id}?product_id=${product_id}`} className="block">
          <div>
            <div className="h-full">
              <img src={images[0]} alt="Product card" className="rounded-md" />
            </div>
          </div>
        </NavLink>

        <div className="mt-2">
          <div>
            <h5 className="text-xs font-semibold text-neutral-700">{title}</h5>
          </div>
          <div>
            <Sizes
              sizes={sizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>
          <div>
            <p className="text-neutral-600">
              Rs. <span className="font-medium text-neutral-700">{price}</span>
            </p>
          </div>
        </div>
      </div>

      {/* CartButton */}
      <motion.div variants={cartButtonVariants}>
        <CartButton
          label={"Add to Cart"}
          selectedSize={selectedSize}
          key={productData.id}
          productData={productData}
          className="absolute flex shadow left-1/2 -translate-x-1/2 bottom-32 z-10 hover:bg-green-400 transition-all duration-300 "
        />
      </motion.div>
    </motion.li>
  );
};

export default ProductCard;
