import { createContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { getUserCart, storeUserCart } from "../util/http";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  deleteFromCart: () => {},
  increaseItemQuantity: () => {},
  decreaseItemQuantity: () => {},
  clearCart: () => {},
  syncCartFromBackend: () => {},
});

const CartContextProvider = ({ children }) => {
  const [cart, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { items: [], quantity: 0 };
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const { mutate: syncCartFromBackend } = useMutation({
    mutationFn: ({ signal, userId, cartItems }) => {
      //logic here
    },
    onSuccess: (backendCart) => {
      setCartItems(backendCart);
      localStorage.setItem("cart", JSON.stringify(backendCart));
    },
    onError: (error) => {
      console.log(error.code);
    },
  });

  function addToCart(item) {
    setCartItems((prevCart) => {
      const newCartItems = [...prevCart.items];
      const existingItemIndex = newCartItems.findIndex(
        (i) => i.product._id === item._id
      );

      if (existingItemIndex === -1) {
        newCartItems.push({ product: item, quantity: 1 });
      } else {
        newCartItems[existingItemIndex] = {
          ...newCartItems[existingItemIndex],
          quantity: newCartItems[existingItemIndex].quantity + 1,
        };
      }

      const newCart = {
        items: newCartItems,
        quantity: prevCart.quantity + 1,
      };

      toast.success("Added to the cart!", {
        description: item.title,
      });
      return newCart;
    });
  }

  function deleteFromCart(itemId) {
    setCartItems((prevCart) => {
      const newCartItems = prevCart.items.filter(
        (i) => i.product._id !== itemId
      );

      const removedItem = prevCart.items.find((i) => i.product._id === itemId);
      const removedQuantity = removedItem ? removedItem.quantity : 0;
      const newCartQuantity = prevCart.quantity - removedQuantity;

      const newCart = { items: newCartItems, quantity: newCartQuantity };
      return newCart;
    });
  }

  function increaseItemQuantity(itemId) {
    setCartItems((prevCart) => {
      const newCartItems = [...prevCart.items];

      const existingItemIndex = newCartItems.findIndex(
        (i) => i.product._id === itemId
      );
      if (existingItemIndex === -1) return prevCart;
      const existingItem = newCartItems[existingItemIndex];

      newCartItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      const newCartQuantity = prevCart.quantity + 1;
      const newCart = { items: newCartItems, quantity: newCartQuantity };
      return newCart;
    });
  }

  function decreaseItemQuantity(itemId) {
    setCartItems((prevCart) => {
      const newCartItems = [...prevCart.items];

      const existingItemIndex = newCartItems.findIndex(
        (i) => i.product._id === itemId
      );

      if (existingItemIndex === -1) return prevCart;
      const existingItem = newCartItems[existingItemIndex];

      if (existingItem.quantity <= 1) {
        newCartItems.splice(existingItemIndex, 1);
      } else {
        newCartItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
      }
      const newCartQuantity = prevCart.quantity - 1;
      const newCart = { items: newCartItems, quantity: newCartQuantity };
      return newCart;
    });
  }

  function clearCart() {
    setCartItems({
      items: [],
      quantity: 0,
    });
  }

  const cartContext = {
    cart: cart,
    addToCart,
    deleteFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
    syncCartFromBackend,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
