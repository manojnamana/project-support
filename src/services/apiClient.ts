import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import {
  clearAuthSession,
  getValidAccessToken,
  refreshAccessToken,
} from "./auth";

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

function getApiBase() {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    ""
  ).replace(/\/$/, "");
}

/** Authenticated Axios client — attaches Bearer token and refreshes on 401. */
const apiClient = axios.create({
  baseURL: getApiBase(),
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getValidAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;
    if (!original || error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;
    const token = await refreshAccessToken();

    if (!token) {
      clearAuthSession();
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.assign("/login");
      }
      return Promise.reject(error);
    }

    original.headers.Authorization = `Bearer ${token}`;
    return apiClient(original);
  }
);

export default apiClient;
