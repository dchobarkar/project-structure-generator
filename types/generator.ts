export type ProjectType = "frontend" | "fullstack" | "backend";

export type Framework = "nextjs" | "react" | "node" | "nestjs";

export type Architecture = "layered" | "feature" | "domain";

export interface GeneratorConfig {
  projectType: ProjectType;
  framework: Framework;
  architecture: Architecture;
  modules: string[];
}

export interface FolderTree {
  [key: string]: FolderTree | Record<string, never>;
}
