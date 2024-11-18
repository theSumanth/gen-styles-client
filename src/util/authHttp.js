import { axiosApi, handleError } from "./http";

export async function sigUp({ authData, signal }) {
  try {
    const resData = await axiosApi.post("/auth/register", authData, {
      signal: signal,
    });
    return resData.data;
  } catch (error) {
    handleError(error);
  }
}

export async function logIn({ authData, signal }) {
  try {
    const resData = await axiosApi.post("/auth/login", authData, {
      signal: signal,
    });
    return resData.data;
  } catch (error) {
    handleError(error);
  }
}

export async function logOut({ authData, signal }) {
  try {
    const resData = await axiosApi.post("/auth/logout", authData, {
      signal: signal,
    });
    return resData.data;
  } catch (error) {
    handleError(error);
  }
}

export async function selfReq() {
  try {
    const resData = await axiosApi.get("/auth/self");
    return resData.data;
  } catch (error) {
    handleError(error);
  }
}
