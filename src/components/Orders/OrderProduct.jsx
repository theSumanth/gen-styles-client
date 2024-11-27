import { motion } from "framer-motion";

const OrderProduct = ({ itemData }) => {
  const { product, quantity, size: selectedSize } = itemData;

  return (
    <motion.li
      variants={{
        hidden: { y: 70, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
      transition={{ duration: 0.3 }}
      className="flex flex-col not-mobile-view:flex-row relative justify-between gap-3 items-center border border-neutral-300 rounded-2xl mt-2 p-2"
    >
      <div className="flex justify-start w-full items-center gap-3">
        <div className="rounded-lg w-14">
          <img
            src={product.images[0]}
            alt="product image"
            className="rounded-lg"
          />
        </div>
        <div>
          <p className="font-semibold text-sm text-neutral-700">
            {product.title}
          </p>
          <p className="text-xs text-neutral-400 font-semibold">
            {product.fabric && <span>{product.fabric}</span>} -{" "}
            {product.sizes.length >= 1 && <span>{selectedSize}</span>}
          </p>
        </div>
      </div>
      <div className="flex justify-between border rounded-md px-1">
        <p className="mr-1 text-neutral-700 font-semibold whitespace-nowrap">
          <span className="text-neutral-500 text-xs mr-3">
            {quantity} x {product.price}
          </span>
          Rs. {(product.price * quantity).toFixed(2)}
        </p>
      </div>
    </motion.li>
  );
};

export default OrderProduct;
