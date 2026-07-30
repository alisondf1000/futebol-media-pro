// Cliente HTTP base para a futura API REST criada com Google Apps Script.
// Nenhuma chamada real é feita ainda — apenas a estrutura do cliente.

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...init } = options;

  const url = new URL(path, API_BASE_URL || window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, String(value))
    );
  }

  const isGet = !init.method || init.method === "GET";
  const response = await fetch(url.toString(), {
    headers: {
      ...(isGet ? {} : { "Content-Type": "application/json" }),
      ...init.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, params?: RequestOptions["params"]) =>
    request<T>(path, { method: "GET", params }),

  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),

  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),

  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
