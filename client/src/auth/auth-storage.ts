import type { AuthSession } from "@/types/types";

const AUTH_STORAGE_KEY = "habit-tracker.auth";

export const readStoredSession = (): AuthSession | null => {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as AuthSession;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const writeStoredSession = (session: AuthSession): void => {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
};

export const clearStoredSession = (): void => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
};
