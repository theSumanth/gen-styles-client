import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetching on tab switch
    },
  },
});

export const axiosApi = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 50000,
  withCredentials: true,
});

export const axiosAuthApi = axios.create({
  baseURL: "http://localhost:5501",
  timeout: 50000,
  withCredentials: true,
});

export const handleError = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      console.error("Response Status:", error.response.status);
    }
  } else {
    console.error("Unexpected Error:", error);
  }
  throw error;
};
