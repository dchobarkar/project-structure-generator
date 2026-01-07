export type ProjectType = "frontend" | "fullstack" | "backend";

export type Framework =
  | "nextjs"
  | "react"
  | "vue"
  | "angular"
  | "sveltekit"
  | "remix"
  | "node"
  | "nestjs";

export type Architecture = "layered" | "feature" | "domain";

export const FRAMEWORKS_BY_PROJECT_TYPE: Record<ProjectType, Framework[]> = {
  frontend: ["nextjs", "react", "vue", "angular"],
  fullstack: [
    "nextjs",
    "react",
    "vue",
    "angular",
    "sveltekit",
    "remix",
    "node",
    "nestjs",
  ],
  backend: ["nextjs", "node", "nestjs"],
};

export interface NextJsOptions {
  useSrcDirectory?: boolean;
  routeGroups?: string[];
}

export type ReactStateManagement = "none" | "redux" | "zustand" | "context";

export interface ReactOptions {
  stateManagement?: ReactStateManagement;
  includeTests?: boolean;
}

export interface NodeOptions {
  includeTests?: boolean;
}

export interface NestJsOptions {
  includeTests?: boolean;
}

export type VueStateManagement = "none" | "pinia";

export interface VueOptions {
  stateManagement?: VueStateManagement;
  includeTests?: boolean;
}

export interface AngularOptions {
  includeTests?: boolean;
}

export interface SvelteKitOptions {
  includeTests?: boolean;
}

export interface RemixOptions {
  includeTests?: boolean;
}

export interface GeneratorConfig {
  projectType: ProjectType;
  framework: Framework;
  architecture: Architecture;
  modules: string[];
  customFolders?: string[];
  options?: {
    nextjs?: NextJsOptions;
    react?: ReactOptions;
    node?: NodeOptions;
    nestjs?: NestJsOptions;
    vue?: VueOptions;
    angular?: AngularOptions;
    sveltekit?: SvelteKitOptions;
    remix?: RemixOptions;
  };
}

export interface FolderTree {
  [key: string]: FolderTree | Record<string, never>;
}
