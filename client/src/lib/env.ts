const fallbackApiBaseUrl =
  import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL
    ? "http://localhost:3000"
    : undefined;

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? fallbackApiBaseUrl ?? "",
} as const;

if (!env.apiBaseUrl) {
  throw new Error("Missing VITE_API_BASE_URL environment variable");
}
