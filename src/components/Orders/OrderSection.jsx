import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import OrderProduct from "./OrderProduct";
import { OrderContext } from "../../store/OrderContextProvider";

const OrderSection = () => {
  const navigate = useNavigate();

  const orderContext = useContext(OrderContext);
  const { orders } = orderContext;

  const ordersIsEmpty = orders?.length <= 0;

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
      className="w-full overflow-y-auto bg-white border border-neutral-300 rounded-xl not-mobile-view:rounded-3xl px-3 not-mobile-view:px-6 py-4 shadow-md"
    >
      <button
        onClick={() => navigate(-1)}
        className=" hover:bg-customBlue hover:text-white transition-all border border-customBlue text-customBlue text-xs px-2 py-1 rounded-md"
      >
        Go back
      </button>
      <div className="flex flex-row justify-between my-4">
        <h2 className="text-normal font-medium">
          Your Orders{" "}
          <span className="text-xs text-neutral-400">{`(${orders.length} orders)`}</span>
        </h2>
      </div>

      {ordersIsEmpty && (
        <motion.span
          animate={{
            y: [-70, 0],
            opacity: [0, 1],
            transition: { duration: 0.5 },
          }}
          className="flex justify-center py-8 mt-4 text-sm text-neutral-500 border border-neutral-300 rounded-xl"
        >
          No orders!
        </motion.span>
      )}
      <AnimatePresence>
        {!ordersIsEmpty && (
          <>
            <div className="hidden not-mobile-view:flex justify-between text-xs font-medium text-neutral-600">
              <p>Product</p>
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
                {orders.map((orderItem) => {
                  return (
                    <OrderProduct
                      key={`${orders._id}-${orderItem.product._id}`}
                      itemData={orderItem}
                    />
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

export default OrderSection;
