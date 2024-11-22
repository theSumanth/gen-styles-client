import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "sonner";
import debounce from "lodash.debounce";

import { getUserCart, storeUserCart } from "../util/http";
import {
  getCartFromLocalStorage,
  getUserFromLocalStorage,
  removeCartFromLocalStorage,
  setCartToLocalStorage,
} from "../util/localStorage";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({
  cart: [],
  cartQueryState: {},
  addToCart: () => {},
  deleteFromCart: () => {},
  increaseItemQuantity: () => {},
  decreaseItemQuantity: () => {},
  clearCart: () => {},
  syncCartFromBackend: () => {},
});

const CartContextProvider = ({ children }) => {
  const [cart, setCartItems] = useState(() => {
    const storedCart = getCartFromLocalStorage();
    return storedCart ? storedCart : { items: [], quantity: 0 };
  });

  const userId = getUserFromLocalStorage().id;

  const {
    isLoading: isCartLoading,
    isError: isCartError,
    error: cartError,
  } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User not authenticated");
      const resData = await getUserCart({ userId });
      return transformCartForClient(resData);
    },
    enabled: sessionStorage.getItem("tabRefreshed") === "true",
    onSuccess: (data) => {
      setCartItems(data);
      sessionStorage.setItem("tabRefreshed", "false");
    },
    onError: (error) => {
      console.error("Error fetching cart:", error);
    },
  });

  useEffect(() => {
    const existingCart = getCartFromLocalStorage();
    if (JSON.stringify(existingCart) !== JSON.stringify(cart)) {
      setCartToLocalStorage(cart);
    }

    if (!sessionStorage.getItem("tabRefreshed")) {
      sessionStorage.setItem("tabRefreshed", "true");
    }
  }, [cart]);

  // useEffect(() => {
  //   const syncCart = async () => {
  //     if (userId) {
  //       try {
  //         console.log("fetch cart");
  //         const resData = await getUserCart({ userId });
  //         const fetchedCart = transformCartForClient(resData);
  //         setCartItems(fetchedCart);
  //       } catch (error) {
  //         console.error("Error syncing cart:", error);
  //       }
  //     }
  //   };

  //   syncCart();
  // }, [userId]);

  const { mutate: syncCartFromBackend } = useMutation({
    mutationFn: async ({ signal, userId }) => {
      const localCart = cart;
      try {
        const backendCart = await getUserCart({ signal, userId });
        const transformedBackendCart = transformCartForClient(backendCart);
        if (localCart.items.length <= 0) {
          return transformedBackendCart;
        }

        const mergedCart = mergeCarts(localCart, transformedBackendCart);
        const cartObj = transformCartForAPI(mergedCart, userId);
        await storeUserCart({ signal, cartObj });
        return mergedCart;
      } catch (error) {
        if (error.response?.status === 404) {
          // First-time user, store local cart as backend cart
          const cartObj = transformCartForAPI(localCart, userId);
          await storeUserCart({ signal, cartObj });
          return cart;
        } else {
          throw error;
        }
      }
    },
    onSuccess: (mergedCart) => {
      setCartItems(mergedCart);
    },
    onError: (error) => {
      console.log(error.code);
      setCartItems(getCartFromLocalStorage);
    },
  });

  function transformCartForAPI(cart, userId) {
    return {
      user_id: userId,
      products: cart.items.map((item) => ({
        product_id: item.product.product_id,
        quantity: item.quantity,
      })),
    };
  }

  function transformCartForClient(cart) {
    return {
      items: cart.products,
      quantity: cart.products.reduce((sum, item) => sum + item.quantity, 0),
    };
  }

  const mergeCarts = (localCart, backendCart) => {
    const productMap = new Map();

    // Add backend cart items to the map
    backendCart.items.forEach((item) => productMap.set(item.product._id, item));

    // Merge with local cart items
    localCart.items.forEach((item) => {
      if (productMap.has(item.product._id)) {
        productMap.get(item.product._id).quantity += item.quantity;
      } else {
        productMap.set(item.product._id, item);
      }
    });

    const mergedItems = Array.from(productMap.values());
    const totalQuantity = localCart.quantity + backendCart.quantity;

    return { items: mergedItems, quantity: totalQuantity };
  };

  const updateCartOnBackend = debounce(async (updatedCart) => {
    try {
      const userId = getUserFromLocalStorage()?.id;
      if (userId) {
        const cartObj = transformCartForAPI(updatedCart, userId);
        await storeUserCart({ cartObj });
      }
    } catch (error) {
      console.error("Error updating cart on backend:", error);
    }
  }, 2500);

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

      updateCartOnBackend(newCart);
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

      updateCartOnBackend(newCart);
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

      updateCartOnBackend(newCart);
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

      updateCartOnBackend(newCart);
      return newCart;
    });
  }

  function clearCart() {
    const emptyCart = { items: [], quantity: 0 };
    removeCartFromLocalStorage();
    setCartItems(emptyCart);
    updateCartOnBackend(emptyCart);
  }

  const cartContext = {
    cart: cart,
    cartQueryState: { isCartLoading, isCartError, cartError },
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
