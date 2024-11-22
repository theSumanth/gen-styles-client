import { axiosAuthApi } from "./api";
import { handleError } from "./api";

axiosAuthApi.defaults.headers.post["Content-Type"] = "application/json";

export async function sigUp({ authData, signal }) {
  try {
    const response = await axiosAuthApi.post("/auth/register", authData, {
      signal: signal,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function logIn({ authData, signal }) {
  try {
    const response = await axiosAuthApi.post("/auth/login", authData, {
      signal: signal,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function logOut({ authData, signal }) {
  try {
    const resData = await axiosAuthApi.post("/auth/logout", authData, {
      signal: signal,
    });
    return resData.data;
  } catch (error) {
    handleError(error);
  }
}

export async function selfReq() {
  try {
    const response = await axiosAuthApi.get("/auth/self");
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
