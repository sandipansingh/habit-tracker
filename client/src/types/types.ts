export interface Habit {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  createdAt?: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export interface AuthPayload extends AuthSession {}

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthFormRequest {
  email: string;
  password: string;
}

export interface HabitFormRequest {
  name: string;
  description: string;
}

export type PlanNode = {
  id: string;
  label: string;
};

export type PlanEdge = {
  source: string;
  target: string;
  label?: string;
};

export type Plan = {
  nodes: PlanNode[];
  edges: PlanEdge[];
};
