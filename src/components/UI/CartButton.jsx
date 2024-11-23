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
  ...props
}) => {
  const cartContext = useContext(CartContext);

  const {
    addToCart,
    cart: { quantity },
  } = cartContext;

  function handleAddToCart() {
    if (!props.selectedSize) {
      toast.warning("Please select a size!");
    } else {
      productData.sizes = [props.selectedSize];
      addToCart(productData);
    }
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
