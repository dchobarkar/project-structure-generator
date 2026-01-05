import type {
  ProjectType,
  Framework,
  Architecture,
  ReactStateManagement,
  VueStateManagement,
} from "@/types/generator";

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: "frontend", label: "Frontend" },
  { value: "fullstack", label: "Fullstack" },
  { value: "backend", label: "Backend" },
];

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

const ARCHITECTURES: { value: Architecture; label: string }[] = [
  { value: "layered", label: "Layered" },
  { value: "feature", label: "Feature" },
  { value: "domain", label: "Domain" },
];

const MODULE_OPTIONS = [
  "auth",
  "billing",
  "analytics",
  "notifications",
] as const;

const REACT_STATE_OPTIONS: {
  value: ReactStateManagement;
  label: string;
}[] = [
  { value: "none", label: "None" },
  { value: "redux", label: "Redux (store/)" },
  { value: "zustand", label: "Zustand (store/)" },
  { value: "context", label: "Context (contexts/)" },
];

const VUE_STATE_OPTIONS: {
  value: VueStateManagement;
  label: string;
}[] = [
  { value: "none", label: "None" },
  { value: "pinia", label: "Pinia (stores/)" },
];

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
