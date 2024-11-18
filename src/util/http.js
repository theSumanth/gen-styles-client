import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

export const axiosApi = axios.create({
  baseURL: "http://localhost:5501",
  timeout: 5000,
  withCredentials: true,
});

axiosApi.defaults.headers.post["Content-Type"] = "application/json";

export const handleError = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      console.error("Response Status:", error.response.status);
      throw new Error(`Server Error: ${error.response.status}`);
    } else if (error.request) {
      console.error("Request Error:", error.request);
      throw new Error("No response from the server.");
    } else {
      console.error("Error:", error.message);
      throw new Error(`Request Error: ${error.message}`);
    }
  } else {
    console.error("Unexpected Error:", error);
    throw new Error("An unexpected error occurred.");
  }
};
