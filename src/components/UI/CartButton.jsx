import { useContext } from "react";
import { motion } from "framer-motion";

import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { CartContext } from "../../store/CartContextProvider";
import CustomSquareButton from "./CustomSquareButton";

const CartButton = ({
  label,
  productData,
  className,
  showCartQuantity,
  selectedSize,
  ...props
}) => {
  const cartContext = useContext(CartContext);

  const {
    addToCart,
    cart: { quantity },
  } = cartContext;

  function handleAddToCart() {
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    const productWithSize = { product: productData, size: selectedSize };
    addToCart(productWithSize);
  }

  const { onClick: propsOnClick, ...restProps } = props;
  return (
    <CustomSquareButton
      label={label}
      onClick={
        showCartQuantity && propsOnClick ? propsOnClick : handleAddToCart
      }
      LucideIcon={ShoppingBag}
      className={className}
      {...restProps}
    >
      {showCartQuantity && (
        <motion.span
          key={quantity}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.3 }}
          className="hidden md:block absolute text-xs right-[-2px] top-[-4px] font-medium bg-red-500 rounded-full px-1"
        >
          {quantity}
        </motion.span>
      )}
    </CustomSquareButton>
  );
};

export default CartButton;
