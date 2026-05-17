const BASE = import.meta.env.VITE_API_URL || "";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const { headers: extraHeaders, ...rest } = options ?? {};
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...extraHeaders },
    ...rest,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as any).error || res.statusText);
  }
  return res.json();
}

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("admin_token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ─── Public ────────────────────────────────────────────────────────────────────
export const api = {
  projects: {
    list: () => request<any[]>("/api/projects"),
    get: (id: string) => request<any>(`/api/projects/${id}`),
  },
  admin: {
    login: (password: string) =>
      request<{ token: string }>("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      }),
    projects: {
      list: () => request<any[]>("/api/admin/projects", { headers: authHeaders() }),
      get: (id: string) => request<any>(`/api/admin/projects/${id}`, { headers: authHeaders() }),
      create: (data: any) =>
        request<any>("/api/admin/projects", {
          method: "POST",
          body: JSON.stringify(data),
          headers: authHeaders(),
        }),
      update: (id: string, data: any) =>
        request<any>(`/api/admin/projects/${id}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: authHeaders(),
        }),
      toggleFeatured: (id: string) =>
        request<any>(`/api/admin/projects/${id}/featured`, {
          method: "PATCH",
          headers: authHeaders(),
        }),
      togglePublish: (id: string) =>
        request<any>(`/api/admin/projects/${id}/publish`, {
          method: "PATCH",
          headers: authHeaders(),
        }),
      duplicate: (id: string) =>
        request<any>(`/api/admin/projects/${id}/duplicate`, {
          method: "POST",
          headers: authHeaders(),
        }),
      archive: (id: string) =>
        request<any>(`/api/admin/projects/${id}/archive`, {
          method: "PATCH",
          headers: authHeaders(),
        }),
      delete: (id: string) =>
        request<any>(`/api/admin/projects/${id}`, {
          method: "DELETE",
          headers: authHeaders(),
        }),
    },
  },
};
