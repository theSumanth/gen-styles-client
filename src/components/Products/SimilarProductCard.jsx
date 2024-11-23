import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const SimilarProductCard = ({ productData, productFromQueryKey }) => {
  const { _id, product_id, title, images, price } = productData;

  const layoutId = `product-image-${productFromQueryKey}-id-${_id}`;

  return (
    <motion.li
      className="bg-white rounded-md shadow w-[14rem] h-[21rem] m-2 hover:shadow-md transition-all"
      whileHover="hovered"
      initial="idle"
    >
      <div className="p-3">
        <NavLink
          to={`/${_id}?productFromQueryKey=${productFromQueryKey}&product_id=${product_id}`}
          className="block"
        >
          <motion.div>
            <motion.div layoutId={layoutId} className="h-full">
              <img src={images[0]} alt="" className="rounded-md" />
            </motion.div>
          </motion.div>
        </NavLink>

        <div className="mt-2">
          <motion.div>
            <h5 className="text-xs font-semibold text-neutral-700">{title}</h5>
          </motion.div>
          <div>
            <p className="text-neutral-600">
              Rs. <span className="font-medium text-neutral-700">{price}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default SimilarProductCard;
