import { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import debounce from "lodash.debounce";

import { getUserCart, storeUserCart } from "../util/http";
import {
  getCartFromLocalStorage,
  getUserFromLocalStorage,
  removeCartFromLocalStorage,
  setCartToLocalStorage,
} from "../util/localStorage";
import { UserContext } from "./UserContextProvider";

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
  const { user } = useContext(UserContext);

  useEffect(() => {
    const existingCart = getCartFromLocalStorage();
    if (JSON.stringify(existingCart) !== JSON.stringify(cart)) {
      setCartToLocalStorage(cart);
    }
  }, [cart]);

  useEffect(() => {
    const syncCart = async () => {
      if (userId) {
        try {
          const resData = await getUserCart({ userId });
          const fetchedCart = transformCartForClient(resData);
          setCartItems(fetchedCart);
        } catch (error) {
          console.error("Error syncing cart:", error);
        }
      }
    };

    if (userId && user) {
      syncCart();
    }
  }, [userId, user]);

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
        size: item.size,
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

    backendCart.items.forEach((item) => {
      const key = `${item.product._id}-${item.size}`;
      productMap.set(key, item);
    });

    localCart.items.forEach((item) => {
      const key = `${item.product._id}-${item.size}`;
      if (productMap.has(key)) {
        productMap.get(key).quantity += item.quantity;
      } else {
        productMap.set(key, item);
      }
    });

    const mergedItems = Array.from(productMap.values());
    const totalQuantity = mergedItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

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
    const { product, size } = item;

    setCartItems((prevCart) => {
      const newCartItems = [...prevCart.items];
      const existingItemIndex = newCartItems.findIndex(
        (i) => i.product._id === product._id && i.size === size
      );

      if (existingItemIndex === -1) {
        newCartItems.push({ product, size, quantity: 1 });
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
        description: `${product.title} (${size})`,
      });
      return newCart;
    });
  }

  function deleteFromCart(productId, size) {
    setCartItems((prevCart) => {
      const newCartItems = prevCart.items.filter(
        (i) => i.product._id !== productId || i.size !== size
      );

      const removedItem = prevCart.items.find(
        (i) => i.product._id === productId && i.size === size
      );
      const removedQuantity = removedItem ? removedItem.quantity : 0;
      const newCartQuantity = prevCart.quantity - removedQuantity;

      const newCart = { items: newCartItems, quantity: newCartQuantity };

      updateCartOnBackend(newCart);
      return newCart;
    });
  }

  function increaseItemQuantity(productId, size) {
    setCartItems((prevCart) => {
      const newCartItems = [...prevCart.items];
      const existingItemIndex = newCartItems.findIndex(
        (i) => i.product._id === productId && i.size === size
      );

      if (existingItemIndex === -1) return prevCart;

      newCartItems[existingItemIndex] = {
        ...newCartItems[existingItemIndex],
        quantity: newCartItems[existingItemIndex].quantity + 1,
      };

      const newCart = {
        items: newCartItems,
        quantity: prevCart.quantity + 1,
      };

      updateCartOnBackend(newCart);
      return newCart;
    });
  }

  function decreaseItemQuantity(productId, size) {
    setCartItems((prevCart) => {
      const newCartItems = [...prevCart.items];
      const existingItemIndex = newCartItems.findIndex(
        (i) => i.product._id === productId && i.size === size
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

      const newCart = {
        items: newCartItems,
        quantity: prevCart.quantity - 1,
      };

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
    // cartQueryState: { isCartLoading, isCartError, cartError },
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
