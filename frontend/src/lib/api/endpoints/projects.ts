import { mockResponse, type Paginated } from "../client";
import { projects, type ProjectSummary } from "@/features/projects/data";

/**
 * Project endpoint signatures. NO real implementation — resolves dummy data
 * until the Django API ships. Call sites stay unchanged when it does.
 */

/** GET /projects/ */
export function listProjects(): Promise<Paginated<ProjectSummary>> {
  return mockResponse({
    count: projects.length,
    next: null,
    previous: null,
    results: projects,
  });
}

/** GET /projects/:id/ */
export function getProject(id: string): Promise<ProjectSummary | undefined> {
  return mockResponse(projects.find((p) => p.id === id));
}

/** POST /projects/ */
export function createProject(
  input: Pick<ProjectSummary, "name" | "address" | "budget">
): Promise<ProjectSummary> {
  return mockResponse({
    ...projects[0],
    id: `prj_${Math.random().toString(36).slice(2, 8)}`,
    ...input,
    status: "planning",
    progressPercent: 0,
    spent: 0,
  });
}
