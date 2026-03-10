import { API_URL } from "@/lib/constants";
import { $http } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

async function fetchUser() {
  const token = localStorage.getItem("bearer_token");
  if (!token) return null;

  try {
    const response = await $http.get(`${API_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem("bearer_token");
      }
    }
    throw error;
  }
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: typeof window !== "undefined",
    retry: false, // don’t retry on 401
  });
}
