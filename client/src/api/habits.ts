import type { ApiResponse, Habit, HabitFormRequest } from "@/types/types";
import { api } from "./axios-config";

export const fetchHabits = async (): Promise<Habit[]> => {
  const response = await api.get<ApiResponse<Habit[]>>("/get");
  return response.data.data;
};

export const createHabit = async (payload: HabitFormRequest): Promise<Habit> => {
  const response = await api.post<ApiResponse<Habit>>("/post", payload);
  return response.data.data;
};

export const deleteHabit = async (id: number): Promise<void> => {
  await api.delete(`/del/${id}`);
};
