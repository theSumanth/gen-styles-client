import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import CartButton from "../UI/CartButton";

const ProductCard = ({ productData }) => {
  const { id, title, category, images } = productData;

  const cartButtonVariants = {
    idle: { y: 8, opacity: 0, pointerEvents: "none" },
    hovered: { y: 8, opacity: 1, pointerEvents: "auto" },
  };

  return (
    <motion.li
      className="relative bg-white rounded-md shadow w-[15rem] m-2 hover:shadow-md transition-all"
      whileHover="hovered"
      initial="idle"
    >
      <div className="p-3">
        <motion.div>
          <motion.div layoutId={`product-image-${id}`}>
            <img src={images[0]} alt="" className="rounded-md" />
          </motion.div>
          <div className="mt-2">
            <motion.div layoutId={`product-title-${id}`}>
              <h4 className="text-sm font-medium">{category.name}</h4>
            </motion.div>
            <motion.div layoutId={`product-description-${id}`}>
              <span className="text-xs text-neutral-500">{title}</span>
            </motion.div>
            <div>
              <p className="text-neutral-600">
                Rs. <span className="font-medium text-neutral-700">499</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <NavLink
        to={`/${id}`}
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
