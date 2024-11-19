import { useContext } from "react";
import { motion } from "framer-motion";

import { ShoppingBag } from "lucide-react";

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

  const { onClick: propsOnClick, ...restProps } = props;
  return (
    <CustomSquareButton
      label={label}
      onClick={
        showCartQuantity && propsOnClick
          ? propsOnClick
          : () => addToCart(productData)
      }
      LucideIcon={ShoppingBag}
      className={className}
      {...restProps}
    >
      {showCartQuantity && (
        <motion.span
          layout
          key={quantity}
          className="hidden md:block absolute text-xs right-[-2px] top-[-4px] font-medium bg-red-500 rounded-full px-1"
        >
          {quantity}
        </motion.span>
      )}
    </CustomSquareButton>
  );
};

export default CartButton;
