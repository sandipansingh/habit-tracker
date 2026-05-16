import type {
  ApiResponse,
  AuthFormRequest,
  AuthPayload,
  AuthUser,
} from "@/types/types";
import { api } from "./axios-config";

export const registerAPI = async (data: AuthFormRequest): Promise<AuthUser> => {
  const response = await api.post<ApiResponse<{ user: AuthUser }>>("/auth/register", data);
  return response.data.data.user;
};

export const loginAPI = async (data: AuthFormRequest): Promise<AuthPayload> => {
  const response = await api.post<ApiResponse<AuthPayload>>("/auth/login", data);
  return response.data.data;
};
