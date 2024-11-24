import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const SimilarProductCard = ({ productData }) => {
  const { _id, product_id, title, images, price } = productData;

  return (
    <motion.li
      className="bg-white rounded-md shadow w-[14rem] h-[21rem] m-2 hover:shadow-md transition-all"
      whileHover="hovered"
      initial="idle"
    >
      <div className="p-3">
        <NavLink to={`/${_id}?product_id=${product_id}`} className="block">
          <div>
            <div className="h-full">
              <img src={images[0]} alt="" className="rounded-md" />
            </div>
          </div>
        </NavLink>

        <div className="mt-2">
          <div>
            <h5 className="text-xs font-semibold text-neutral-700">{title}</h5>
          </div>
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
