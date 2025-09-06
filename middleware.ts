// Re-export middleware from lib/middleware for better organization
// Next.js requires middleware.ts to be at the project root, but we can keep
// the actual logic organized in lib/middleware/middleware.ts
export { config, middleware } from "./lib/middleware/middleware";
