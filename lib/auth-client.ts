import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { API_AUTH_URL } from "./constants";

export const authClient = createAuthClient({
  baseURL: API_AUTH_URL,
  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () => localStorage.getItem("bearer_token") || "",
    },
    onSuccess: (ctx) => {
      const authToken = ctx.response.headers.get("set-auth-token");
      if (authToken) {
        localStorage.setItem("bearer_token", authToken);
        // set auth token in cookies
        
      }
    },
  },
  plugins: [
    inferAdditionalFields({
      user: {
        institutionId: {
          type: "number",
          required: true, // the field always exists but can be null, so we set it as required
        },
        areasOfInterest: {
          type: "string[]",
          required: true, // the field always exists but can be an empty array, so we set it as required
        },
      },
    }),
  ],
});
