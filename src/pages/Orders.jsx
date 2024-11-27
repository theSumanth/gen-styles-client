import { useEffect } from "react";
import OrderSection from "../components/Orders/OrderSection";

const OrdersLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full px-4 md:px-40 py-6 gap-4 items-start">
      <OrderSection />
    </div>
  );
};

export default OrdersLayout;
