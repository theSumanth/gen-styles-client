import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  deleteFromCart: () => {},
});

const CartContextProvider = ({ children }) => {
  const [cart, setCartItems] = useState({
    items: [],
    quantity: 0,
  });

  function addToCart(item) {
    setCartItems((prevCart) => {
      const newCartItems = [...prevCart.items];
      const existingItemIndex = newCartItems.findIndex(
        (i) => i.product.id === item.id
      );
      if (existingItemIndex < 0) {
        newCartItems.push({ product: item, quantity: 1 });
      } else {
        const existingItem = newCartItems[existingItemIndex];
        newCartItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
      }

      const newCart = { items: newCartItems, quantity: prevCart.quantity++ };
      return newCart;
    });
  }

  function deleteFromCart(itemId) {
    setCartItems((prevCart) => {
      const newCartItems = [...prevCart.items].filter((i) => i.id !== itemId);
      const newCart = { items: newCartItems, quantity: prevCart.quantity-- };
      return newCart;
    });
  }

  const cartContext = {
    cart: cart,
    addToCart,
    deleteFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
