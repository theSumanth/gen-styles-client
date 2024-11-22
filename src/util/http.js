import { axiosApi, handleError } from "./api";

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

export async function getSingleProduct({ signal, productId }) {
  try {
    const response = await axiosApi.get(
      `/api/catalogue/get-product?_id=${productId}`,
      {
        signal,
      }
    );
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
    const response = await axiosApi.get(`/api/cart/store-cart`, cartObj, {
      signal,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
