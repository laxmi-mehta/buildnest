/**
 * Public surface of the API layer. Features import from "@/lib/api" —
 * never from fetch/axios directly — so backend integration is contained here.
 */
export { apiClient, ApiError, type Paginated } from "./client";
export * as authApi from "./endpoints/auth";
export * as projectsApi from "./endpoints/projects";
