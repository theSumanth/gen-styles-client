import { axiosApi, handleError } from "./api";
import { getUserFromLocalStorage } from "./localStorage";

axiosApi.defaults.headers.post["Content-Type"] = "application/json";

export async function getTop20TrendProducts({ signal }) {
  try {
    const response = await axiosApi.get("/api/catalogue/trending-products", {
      signal,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function getPersonalizedProducts({ signal }) {
  try {
    const response = await axiosApi.get(
      "/api/openai/get-products/personalized?userId=1",
      { signal }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function getSingleProduct({ signal, productId, pid }) {
  const user = getUserFromLocalStorage();
  let url = `/api/catalogue/get-product?_id=${productId}`;
  if (user) {
    url = `&userId=${user.id}&productId=${pid}`;
  }
  try {
    const response = await axiosApi.get(url, {
      signal,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function getUserCart({ userId, signal }) {
  try {
    const response = await axiosApi.get(`/api/cart/get-cart?userId=${userId}`, {
      signal,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function storeUserCart({ cartObj, signal }) {
  try {
    const response = await axiosApi.post(`/api/cart/store-cart`, cartObj, {
      signal,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
