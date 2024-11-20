import { axiosApi } from "./api";

axiosApi.defaults.headers.post["Content-Type"] = "application/json";

export async function getTop20TrendProducts({ signal }) {
  const resData = axiosApi.get("/api/catalogue/trending-products", { signal });
  return resData;
}

export async function getPersonalizedProducts({ signal }) {
  const resData = axiosApi.get(
    "http://localhost:5000/api/openai/get-products/personalized?userId=1",
    { signal }
  );
  return resData;
}