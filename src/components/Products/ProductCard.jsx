import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import CartButton from "../UI/CartButton";
import Sizes from "./Sizes";

const ProductCard = ({ productData, productFromQueryKey }) => {
  const { _id, title, images, price, sizes } = productData;

  const cartButtonVariants = {
    idle: { y: 8, opacity: 0, pointerEvents: "none" },
    hovered: { y: 8, opacity: 1, pointerEvents: "auto" },
  };

  const layoutId = `product-image-${productFromQueryKey}-id-${_id}`;

  return (
    <motion.li
      className="relative bg-white rounded-md shadow w-[14rem] m-2 hover:shadow-md transition-all"
      whileHover="hovered"
      initial="idle"
    >
      <div className="p-3">
        <motion.div>
          <motion.div layoutId={layoutId}>
            <img src={images[0]} alt="" className="rounded-md" />
          </motion.div>
          <div className="mt-2">
            <motion.div>
              <h5 className="text-xs font-semibold text-neutral-700">
                {title}
              </h5>
            </motion.div>
            <motion.div>
              <Sizes sizes={sizes} />
            </motion.div>
            <div>
              <p className="text-neutral-600">
                Rs.{" "}
                <span className="font-medium text-neutral-700">{price}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <NavLink
        to={`/${_id}?productFromQueryKey=${productFromQueryKey}`}
        className={"absolute top-0 left-0 right-0 bottom-0"}
      ></NavLink>

      {/* CartButton */}
      <motion.div variants={cartButtonVariants}>
        <CartButton
          label={"Add to Cart"}
          key={productData.id}
          productData={productData}
          className="absolute flex shadow left-1/2 -translate-x-1/2 bottom-28 z-10 hover:bg-green-400 transition-all duration-300 "
        />
      </motion.div>
    </motion.li>
  );
};

export default ProductCard;
