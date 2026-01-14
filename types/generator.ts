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
  /** Include tests/ with unit, integration, e2e (default true) */
  includeTests?: boolean;
}

export interface NestJsOptions {
  /** Include test/ with e2e (NestJS convention; default true) */
  includeTests?: boolean;
}

export type VueStateManagement = "none" | "pinia";

export interface VueOptions {
  stateManagement?: VueStateManagement;
  includeTests?: boolean;
}

export interface AngularOptions {
  /** Include e2e/ at root (Angular convention; default true) */
  includeTests?: boolean;
}

export interface SvelteKitOptions {
  /** Include tests/ (Playwright/Vitest; default true) */
  includeTests?: boolean;
}

export interface RemixOptions {
  /** Include tests folder (default true) */
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
