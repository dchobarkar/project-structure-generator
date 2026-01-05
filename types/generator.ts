type ProjectType = "frontend" | "fullstack" | "backend";

type Framework =
  | "nextjs"
  | "react"
  | "vue"
  | "angular"
  | "sveltekit"
  | "remix"
  | "node"
  | "nestjs";

type Architecture = "layered" | "feature" | "domain";

const FRAMEWORKS_BY_PROJECT_TYPE: Record<ProjectType, Framework[]> = {
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

interface NextJsOptions {
  useSrcDirectory?: boolean;
  routeGroups?: string[];
}

type ReactStateManagement = "none" | "redux" | "zustand" | "context";

interface ReactOptions {
  stateManagement?: ReactStateManagement;
  includeTests?: boolean;
}

interface NodeOptions {
  includeTests?: boolean;
}

interface NestJsOptions {
  includeTests?: boolean;
}

type VueStateManagement = "none" | "pinia";

interface VueOptions {
  stateManagement?: VueStateManagement;
  includeTests?: boolean;
}

interface AngularOptions {
  includeTests?: boolean;
}

interface SvelteKitOptions {
  includeTests?: boolean;
}

interface RemixOptions {
  includeTests?: boolean;
}

interface GeneratorConfig {
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

interface FolderTree {
  [key: string]: FolderTree | Record<string, never>;
}

export type {
  ProjectType,
  Framework,
  Architecture,
  NextJsOptions,
  ReactStateManagement,
  ReactOptions,
  NodeOptions,
  NestJsOptions,
  VueStateManagement,
  VueOptions,
  AngularOptions,
  SvelteKitOptions,
  RemixOptions,
  GeneratorConfig,
  FolderTree,
};
export { FRAMEWORKS_BY_PROJECT_TYPE };
