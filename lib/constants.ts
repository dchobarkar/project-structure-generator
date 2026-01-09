import type {
  ProjectType,
  Framework,
  Architecture,
  ReactStateManagement,
  VueStateManagement,
} from "@/types/generator";

export const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: "frontend", label: "Frontend" },
  { value: "fullstack", label: "Fullstack" },
  { value: "backend", label: "Backend" },
];

export const FRAMEWORKS: { value: Framework; label: string }[] = [
  { value: "nextjs", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "remix", label: "Remix" },
  { value: "node", label: "Node" },
  { value: "nestjs", label: "NestJS" },
];

export const ARCHITECTURES: { value: Architecture; label: string }[] = [
  { value: "layered", label: "Layered" },
  { value: "feature", label: "Feature" },
  { value: "domain", label: "Domain" },
];

export const MODULE_OPTIONS = [
  "auth",
  "billing",
  "analytics",
  "notifications",
] as const;

export const REACT_STATE_OPTIONS: {
  value: ReactStateManagement;
  label: string;
}[] = [
  { value: "none", label: "None" },
  { value: "redux", label: "Redux (store/)" },
  { value: "zustand", label: "Zustand (store/)" },
  { value: "context", label: "Context (contexts/)" },
];

export const VUE_STATE_OPTIONS: {
  value: VueStateManagement;
  label: string;
}[] = [
  { value: "none", label: "None" },
  { value: "pinia", label: "Pinia (stores/)" },
];

export const NEXTJS_ROUTE_GROUPS = ["(marketing)", "(shop)", "(dashboard)"];
