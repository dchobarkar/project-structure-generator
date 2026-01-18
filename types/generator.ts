export type ProjectType = "frontend" | "fullstack" | "backend";

export type Framework = "nextjs" | "react" | "node" | "nestjs";

export type Architecture = "layered" | "feature" | "domain";

export interface NextJsOptions {
  useSrcDirectory?: boolean;
  routeGroups?: string[];
}

export type ReactStateManagement = "none" | "redux" | "zustand" | "context";

export interface ReactOptions {
  stateManagement?: ReactStateManagement;
  includeTests?: boolean;
}

export interface GeneratorConfig {
  projectType: ProjectType;
  framework: Framework;
  architecture: Architecture;
  modules: string[];
  options?: {
    nextjs?: NextJsOptions;
    react?: ReactOptions;
  };
}

export interface FolderTree {
  [key: string]: FolderTree | Record<string, never>;
}
