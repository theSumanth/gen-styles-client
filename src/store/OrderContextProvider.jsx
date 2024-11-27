import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

import { getPurchaseHistory, storePurchaseHistory } from "../util/http";
import { getUserFromLocalStorage } from "../util/localStorage";
import { UserContext } from "./UserContextProvider";

// eslint-disable-next-line react-refresh/only-export-components
export const OrderContext = createContext({
  orders: [],
  storeOrderToApi: () => {},
});

const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const userId = getUserFromLocalStorage().id;
  const { user } = useContext(UserContext);

  useEffect(() => {
    const syncCart = async () => {
      if (userId) {
        try {
          const resData = await getPurchaseHistory({ userId });
          setOrders(resData.products);
        } catch (error) {
          if (
            error.status === 404 &&
            error.response.data.errors[0].msg === "Purchase history not found"
          ) {
            setOrders([]);
          }
        }
      }
    };

    if (userId && user) {
      syncCart();
    }
  }, [userId, user]);

  const { mutate } = useMutation({
    mutationFn: ({ signal, orderObj }) =>
      storePurchaseHistory({ signal, orderObj }),
  });

  function storeOrderToApi(cartObj) {
    const orderObj = {
      user_id: userId,
      purchased_products: [...cartObj.items].map((item) => ({
        product_id: item.product.product_id,
        quantity: item.quantity,
        size: item.size,
      })),
    };
    mutate({ orderObj });
    setOrders((prevOrders) => [...cartObj.items, ...prevOrders]);
  }

  const orderContext = { orders, storeOrderToApi };
  return (
    <OrderContext.Provider value={orderContext}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
