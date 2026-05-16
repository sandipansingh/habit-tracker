import axios from "axios";
import { readStoredSession } from "@/auth/auth-storage";
import { env } from "@/lib/env";

const apiUrl = `${env.apiBaseUrl}/api/habits`;

export const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((req) => {
  const token = readStoredSession()?.token;

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event("app:unauthorized"));
    }

    const message =
      error.response?.data?.error?.message ??
      error.response?.data?.error ??
      error.message ??
      "Something went wrong";

    return Promise.reject(new Error(message));
  },
);
