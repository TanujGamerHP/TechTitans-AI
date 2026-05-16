import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { projects as staticProjects } from "@/data/projects";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const data = await api.projects.list();
        return data.length > 0 ? data : staticProjects;
      } catch {
        return staticProjects;
      }
    },
    staleTime: 30_000,
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      try {
        return await api.projects.get(id);
      } catch {
        return staticProjects.find((p) => p.id === id) ?? null;
      }
    },
    staleTime: 30_000,
  });
}
