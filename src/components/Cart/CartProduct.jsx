import { useContext } from "react";
import { motion } from "framer-motion";

import { CircleMinus, CirclePlus, X } from "lucide-react";
import { CartContext } from "../../store/CartContextProvider";

function QuantityActions({
  productId,
  quantity,
  increaseQuantity,
  decreaseQuantity,
}) {
  return (
    <div className="flex gap-2 items-center">
      <CircleMinus
        onClick={quantity > 1 ? () => decreaseQuantity(productId) : null}
        strokeWidth={1.2}
        size={18}
        className="text-neutral-600 hover:text-customBlue cursor-pointer"
      />
      <p className="text-sm">{quantity}</p>
      <CirclePlus
        onClick={() => increaseQuantity(productId)}
        strokeWidth={1.2}
        size={18}
        className="text-neutral-600 hover:text-customBlue cursor-pointer"
      />
    </div>
  );
}

const CartProduct = ({ productData }) => {
  const cartContext = useContext(CartContext);
  const { deleteFromCart, increaseItemQuantity, decreaseItemQuantity } =
    cartContext;

  const { product, quantity } = productData;

  return (
    <motion.li
      layout
      variants={{
        hidden: { y: 70, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { x: -30, opacity: 0 },
      }}
      exit={{ x: -30, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col not-mobile-view:flex-row relative justify-start not-mobile-view:justify-between gap-3 items-center border border-neutral-300 rounded-2xl mt-2 p-2"
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
            {product && <span>{"White"}</span>} -{" "}
            {product && <span>{"M"}</span>}
            {/* {product.color && <span>{product.color[0]}</span>} -{" "}
          {product.size && <span>{product.size[0]}</span>} */}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between not-mobile-view:mr-6">
        <QuantityActions
          productId={product.id}
          quantity={quantity}
          increaseQuantity={increaseItemQuantity}
          decreaseQuantity={decreaseItemQuantity}
        />
        <p className="mr-1 text-neutral-700 font-semibold">
          <span className="text-neutral-500 text-xs mr-3">
            {quantity} x {product.price}
          </span>
          Rs. {(product.price * quantity).toFixed(2)}
        </p>
      </div>

      {/* clear cart item */}
      <div className="absolute right-3 top-5 bg-white rounded-full text-red-500 cursor-pointer not-mobile-view:top-1/2 not-mobile-view:-translate-y-1/2">
        <X onClick={() => deleteFromCart(product.id)} size={13} />
      </div>
    </motion.li>
  );
};

export default CartProduct;
