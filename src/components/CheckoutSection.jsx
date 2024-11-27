import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "./UI/Button";
import { CartContext } from "../store/CartContextProvider";
import { OrderContext } from "../store/OrderContextProvider";
import { toast } from "sonner";

const CheckoutSection = () => {
  const couponInputRef = useRef();
  const navigate = useNavigate();
  const [discountPrice, setDiscountPrice] = useState(0);
  const [isCouponValid, setIsCouponValid] = useState(undefined);

  const cartContext = useContext(CartContext);
  const orderContext = useContext(OrderContext);

  const { cart } = cartContext;

  const cartIsEmpty = cart.items.length <= 0;

  const subTotalPrice = cart.items.reduce((acc, item) => {
    const calculatedPrice = item.product.price * item.quantity;
    return acc + calculatedPrice;
  }, 0);

  const totalPrice = subTotalPrice - discountPrice;

  useEffect(() => {
    if (isCouponValid === undefined) return;
    if (couponInputRef.current.value === "GENSTYLES20") {
      setDiscountPrice(subTotalPrice * 0.2);
      setIsCouponValid(true);
    } else {
      setIsCouponValid(false);
    }
  }, [subTotalPrice, isCouponValid]);

  function handleApplyCoupon() {
    if (couponInputRef.current.value === "GENSTYLES20") {
      setDiscountPrice(subTotalPrice * 0.2);
      setIsCouponValid(true);
    } else {
      setIsCouponValid(false);
    }
  }

  function handleCheckout() {
    orderContext.storeOrderToApi(cart);
    cartContext.clearCart();
    toast.success("Purchase successfull");
    navigate("/orders");
  }

  const MotionButton = motion.create(Button);

  const variants = {
    hidden: { x: 90, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.section
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="top-[6rem] sticky w-full lg:w-[40%] bg-white border border-neutral-300 rounded-xl not-mobile-view:rounded-3xl px-3 not-mobile-view:px-6 py-4 shadow-md"
    >
      <div className="border-b border-neutral-300 pb-3">
        <h4 className="text-sm font-semibold">Coupon Code</h4>
        <div className="relative flex items-center">
          <input
            ref={couponInputRef}
            type="text"
            id="couponcode"
            name="couponcode"
            title="couponcode"
            placeholder="Type here..."
            className="py-3 px-4 pr-20 focus:outline-none focus:bg-slate-50 w-full rounded-full text-sm my-2 border border-neutral-300"
          />
          <Button
            onClick={handleApplyCoupon}
            className="absolute right-1 text-white bg-customBlue  rounded-full text-xs"
          >
            Apply
          </Button>
        </div>
        {isCouponValid !== undefined && isCouponValid && (
          <span className="text-green-500 text-xs">
            Coupon applied successfully
          </span>
        )}
        {isCouponValid !== undefined && !isCouponValid && (
          <span className="text-red-500 text-xs">Invalid Coupon</span>
        )}

        <p className="text-xs font-normal text-neutral-500 my-2">
          To apply your coupon, simply enter the code in the designated field.
          Your discount will be automatically calculated and applied to your
          order total.
          <br />
          <br />
          <span className="text-green-600">
            Use GENSTYLES20 to avail instant 20% discount.
          </span>
        </p>
      </div>
      <div className="flex flex-col mt-3 gap-1">
        <h4 className="text-sm font-semibold mb-1">Checkout</h4>
        <p className="flex justify-between text-sm text-neutral-500">
          <span>Subtotal</span>
          <span>Rs. {subTotalPrice.toFixed(2)}</span>
        </p>
        <p className="flex justify-between text-sm text-neutral-500">
          <span>Discount</span>
          <span>- Rs. {discountPrice.toFixed(2)}</span>
        </p>
        <p className="flex justify-between text-base text-neutral-700 font-semibold">
          <span>Total</span>
          <span className="text-neutral-800">Rs. {totalPrice.toFixed(2)}</span>
        </p>
        <MotionButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          disabled={cartIsEmpty}
          onClick={handleCheckout}
          className={
            "text-white bg-customBlue w-full rounded-md text-xs disabled:bg-opacity-60 mt-2"
          }
        >
          Checkout
        </MotionButton>
      </div>
    </motion.section>
  );
};

export default CheckoutSection;
