import { createAuthClient } from "better-auth/react";
import { API_AUTH_URL } from "./constants";

export const authClient = createAuthClient({
  baseURL: API_AUTH_URL,
});
