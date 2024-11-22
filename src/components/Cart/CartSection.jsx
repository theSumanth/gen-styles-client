import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { CircleX } from "lucide-react";
import CustomSquareButton from "../UI/CustomSquareButton";
import { CartContext } from "../../store/CartContextProvider";
import CartProduct from "./CartProduct";

const CartSection = () => {
  const cartContext = useContext(CartContext);
  const { cart, clearCart } = cartContext;

  const cartIsEmpty = cart.items.length <= 0;

  console.log(cart);

  const variants = {
    hidden: { y: 90, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.section
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full overflow-y-auto lg:w-[60%] bg-white border border-neutral-300 rounded-xl not-mobile-view:rounded-3xl px-3 not-mobile-view:px-6 py-4 shadow-md"
    >
      <div className="flex flex-row justify-between mb-4">
        <h2 className="text-normal font-medium">
          Your Cart{" "}
          <span className="text-xs text-neutral-400">{`(${cart.items.length} products)`}</span>
        </h2>
        <CustomSquareButton
          LucideIcon={() => <CircleX size={12} />}
          label={"Clear cart"}
          onClick={clearCart}
          disabled={cartIsEmpty}
          className={
            "!bg-transparent !text-red-500 !text-xs border !font-medium hover:!bg-red-100 hover:border-red-400 disabled:opacity-50"
          }
        />
      </div>

      {cartIsEmpty && (
        <motion.span
          animate={{
            y: [-70, 0],
            opacity: [0, 1],
            transition: { duration: 0.5 },
          }}
          className="flex justify-center py-8 mt-4 text-sm text-neutral-500 border border-neutral-300 rounded-xl"
        >
          Cart is Empty!
        </motion.span>
      )}
      <AnimatePresence>
        {!cartIsEmpty && (
          <>
            <div className="hidden not-mobile-view:flex justify-between text-xs font-medium text-neutral-600">
              <p>Product</p>
              <p className="ml-20">Count</p>
              <p className="mr-12">Price</p>
            </div>
            <motion.ul
              variants={{
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              exit={{ y: -30, opacity: 0 }}
              className="flex flex-col gap-4 overflow-hidden"
            >
              <AnimatePresence>
                {cart.items.map((cartItem) => {
                  return (
                    <CartProduct key={cartItem.id} productData={cartItem} />
                  );
                })}
              </AnimatePresence>
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default CartSection;
