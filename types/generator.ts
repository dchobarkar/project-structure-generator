/**
 * Types and constants for the folder structure generator.
 * Defines project type, framework, architecture, config shape, and folder tree structure.
 */

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

/** Frameworks allowed for each project type (e.g. backend only allows nextjs, node, nestjs). */
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

/** Next.js-specific options: src directory, route groups. */
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

/** Full config for the generator: type, framework, architecture, modules, custom folders, framework options. */
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

/** Nested object representing a folder tree; keys are folder names, values are children or empty object. */
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
