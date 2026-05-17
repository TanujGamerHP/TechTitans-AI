import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => api.projects.list(),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => api.projects.get(id),
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: false,
  });
}

export function useInvalidateProjects() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ["projects"] });
}
