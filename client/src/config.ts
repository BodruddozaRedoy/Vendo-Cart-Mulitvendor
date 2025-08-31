export const API_BASE_URL: string = (
  (import.meta as any).env?.VITE_BACKEND_URL ||
  (import.meta as any).env?.BACKEND_URL ||
  'http://localhost:5000'
);

