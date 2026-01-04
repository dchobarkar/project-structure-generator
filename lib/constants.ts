/**
 * UI option arrays and labels for the config panel.
 * Used by SelectField options and framework-specific sections.
 */

import type {
  ProjectType,
  Framework,
  Architecture,
  ReactStateManagement,
  VueStateManagement,
} from "@/types/generator";

/** Project type dropdown: Frontend, Fullstack, Backend. */
const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: "frontend", label: "Frontend" },
  { value: "fullstack", label: "Fullstack" },
  { value: "backend", label: "Backend" },
];

/** All frameworks; filtered by project type in ConfigPanel. */
const FRAMEWORKS: { value: Framework; label: string }[] = [
  { value: "nextjs", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "remix", label: "Remix" },
  { value: "node", label: "Node" },
  { value: "nestjs", label: "NestJS" },
];

/** Architecture dropdown: Layered, Feature, Domain. */
const ARCHITECTURES: { value: Architecture; label: string }[] = [
  { value: "layered", label: "Layered" },
  { value: "feature", label: "Feature" },
  { value: "domain", label: "Domain" },
];

/** Preset feature modules (checkboxes); custom modules are added via EditableList. */
const MODULE_OPTIONS = [
  "auth",
  "billing",
  "analytics",
  "notifications",
] as const;

/** React state management select (Next.js not used; React template only). */
const REACT_STATE_OPTIONS: {
  value: ReactStateManagement;
  label: string;
}[] = [
  { value: "none", label: "None" },
  { value: "redux", label: "Redux (store/)" },
  { value: "zustand", label: "Zustand (store/)" },
  { value: "context", label: "Context (contexts/)" },
];

/** Vue state management select (Pinia, etc.). */
const VUE_STATE_OPTIONS: {
  value: VueStateManagement;
  label: string;
}[] = [
  { value: "none", label: "None" },
  { value: "pinia", label: "Pinia (stores/)" },
];

/** Next.js app route group checkboxes (e.g. (marketing), (shop)). */
const NEXTJS_ROUTE_GROUPS = ["(marketing)", "(shop)", "(dashboard)"];

export {
  PROJECT_TYPES,
  FRAMEWORKS,
  ARCHITECTURES,
  MODULE_OPTIONS,
  REACT_STATE_OPTIONS,
  VUE_STATE_OPTIONS,
  NEXTJS_ROUTE_GROUPS,
};
