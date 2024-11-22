export function getCartFromLocalStorage() {
  const localCart = JSON.parse(localStorage.getItem("cart"));
  return localCart;
}

export function setCartToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeCartFromLocalStorage() {
  localStorage.removeItem("cart");
}

export function getUserFromLocalStorage() {
  const localUser = JSON.parse(localStorage.getItem("user"));
  if (!localUser) {
    return false;
  }
  return localUser;
}

export function setUserToLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function removeUserFromLocalStorage() {
  localStorage.removeItem("user");
}
