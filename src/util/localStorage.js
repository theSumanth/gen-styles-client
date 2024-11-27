const CART_KEY = "cart";
const USER_KEY = "user";

export function getCartFromLocalStorage() {
  const localCart = JSON.parse(localStorage.getItem(CART_KEY));
  return localCart;
}

export function setCartToLocalStorage(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function removeCartFromLocalStorage() {
  localStorage.removeItem(CART_KEY);
}

export function getUserFromLocalStorage() {
  const localUser = JSON.parse(localStorage.getItem(USER_KEY));
  if (!localUser) {
    return false;
  }
  return localUser;
}

export function setUserToLocalStorage(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeUserFromLocalStorage() {
  localStorage.removeItem(USER_KEY);
}
