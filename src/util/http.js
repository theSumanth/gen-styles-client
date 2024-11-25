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

export async function getPersonalizedProducts({ signal, userId }) {
  try {
    const response = await axiosApi.get(
      `/api/openai/get-products/personalized?userId=${userId}`,
      { signal }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function getSimilarProducts({ signal, pid }) {
  try {
    const response = await axiosApi.get(
      `/api/openai/get-products/similar?productId=${pid}`,
      { signal }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function getAISearchProducts({ signal, queryText }) {
  try {
    const response = await axiosApi.get(`/api/openai/get-products/aisearch`, {
      signal,
      params: { query: queryText },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function getAIImageSearchProducts({ signal, formData }) {
  try {
    const response = await axiosApi.post(
      `/api/openai/get-products/image-search`,
      formData,
      {
        signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
    url += `&userId=${user.id}&productId=${pid}`;
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
