import type {
  GeneratorConfig,
  ProjectType,
  Framework,
  Architecture,
} from "@/types/generator";

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: "frontend", label: "Frontend" },
  { value: "fullstack", label: "Fullstack" },
  { value: "backend", label: "Backend" },
];

const FRAMEWORKS: { value: Framework; label: string }[] = [
  { value: "nextjs", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "node", label: "Node" },
  { value: "nestjs", label: "NestJS" },
];

const ARCHITECTURES: { value: Architecture; label: string }[] = [
  { value: "layered", label: "Layered" },
  { value: "feature", label: "Feature" },
  { value: "domain", label: "Domain" },
];

const MODULE_OPTIONS = ["auth", "billing", "analytics", "notifications"];

interface ConfigPanelProps {
  config: GeneratorConfig;
  onConfigChange: (config: GeneratorConfig) => void;
}

const ConfigPanel = ({ config, onConfigChange }: ConfigPanelProps) => {
  const update = <K extends keyof GeneratorConfig>(
    key: K,
    value: GeneratorConfig[K],
  ) => {
    onConfigChange({ ...config, [key]: value });
  };

  const toggleModule = (module: string) => {
    const modules = config.modules.includes(module)
      ? config.modules.filter((m) => m !== module)
      : [...config.modules, module];
    update("modules", modules);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-foreground">Configuration</h2>

      <div>
        <label
          htmlFor="project-type"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Project type
        </label>
        <select
          id="project-type"
          value={config.projectType}
          onChange={(e) => update("projectType", e.target.value as ProjectType)}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-foreground focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
        >
          {PROJECT_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="framework"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Framework
        </label>
        <select
          id="framework"
          value={config.framework}
          onChange={(e) => update("framework", e.target.value as Framework)}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-foreground focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
        >
          {FRAMEWORKS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="architecture"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Architecture
        </label>
        <select
          id="architecture"
          value={config.architecture}
          onChange={(e) =>
            update("architecture", e.target.value as Architecture)
          }
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-foreground focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
        >
          {ARCHITECTURES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium text-foreground">
          Feature modules
        </span>
        <div className="flex flex-col gap-2">
          {MODULE_OPTIONS.map((module) => (
            <label
              key={module}
              className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
            >
              <input
                type="checkbox"
                checked={config.modules.includes(module)}
                onChange={() => toggleModule(module)}
                className="h-4 w-4 rounded border-neutral-300 text-neutral-600 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800"
              />
              {module}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ConfigPanel };
