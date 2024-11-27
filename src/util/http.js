import { axiosApi, handleError } from "./api";
import { getUserFromLocalStorage } from "./localStorage";
import { getViewedProdIds, saveViewedProdIds } from "./sessionStorage";

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
  const viewedProdIds = getViewedProdIds();

  let url = `/api/catalogue/get-product?_id=${productId}`;
  if (user && !viewedProdIds.includes(productId)) {
    url += `&userId=${user.id}&productId=${pid}`;
    saveViewedProdIds([...viewedProdIds, productId]);
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

export async function getPurchaseHistory({ userId, signal }) {
  try {
    const response = await axiosApi.get(
      `/api/purchase-history/get-purchase-history?userId=${userId}`,
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
export async function storePurchaseHistory({ orderObj, signal }) {
  try {
    const response = await axiosApi.post(
      `/api/purchase-history/store-purchase-history`,
      orderObj,
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
