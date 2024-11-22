import { useEffect } from "react";

import CartSection from "../components/Cart";
import CheckoutSection from "../components/CheckoutSection";

const CartLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full px-4 md:px-28 py-6 gap-4 items-start">
      <CartSection />
      <CheckoutSection />
    </div>
  );
};

export default CartLayout;
