import { useState, useEffect } from "react";
import type {
  GeneratorConfig,
  ProjectType,
  Framework,
  Architecture,
  ReactStateManagement,
  VueStateManagement,
} from "@/types/generator";
import { FRAMEWORKS_BY_PROJECT_TYPE } from "@/types/generator";

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

const MODULE_OPTIONS = ["auth", "billing", "analytics", "notifications"];

const REACT_STATE_OPTIONS: { value: ReactStateManagement; label: string }[] = [
  { value: "none", label: "None" },
  { value: "redux", label: "Redux (store/)" },
  { value: "zustand", label: "Zustand (store/)" },
  { value: "context", label: "Context (contexts/)" },
];

const VUE_STATE_OPTIONS: { value: VueStateManagement; label: string }[] = [
  { value: "none", label: "None" },
  { value: "pinia", label: "Pinia (stores/)" },
];

interface ConfigPanelProps {
  config: GeneratorConfig;
  onConfigChange: (config: GeneratorConfig) => void;
}

const ConfigPanel = ({ config, onConfigChange }: ConfigPanelProps) => {
  const allowedFrameworks = FRAMEWORKS_BY_PROJECT_TYPE[config.projectType];
  const frameworksForSelect = FRAMEWORKS.filter((opt) =>
    allowedFrameworks.includes(opt.value),
  );

  // Stable IDs for custom folder rows so the input key never changes while typing
  const [customFolderIds, setCustomFolderIds] = useState<number[]>([]);
  const folderCount = (config.customFolders ?? []).length;
  useEffect(() => {
    setCustomFolderIds((prev) => {
      if (prev.length === folderCount) return prev;
      if (prev.length < folderCount)
        return [
          ...prev,
          ...Array.from({ length: folderCount - prev.length }, () =>
            Date.now(),
          ),
        ];
      return prev.slice(0, folderCount);
    });
  }, [folderCount]);

  // Stable IDs for custom module rows
  const [customModuleIds, setCustomModuleIds] = useState<number[]>([]);
  const customModules = (config.modules ?? []).filter(
    (m) => !MODULE_OPTIONS.includes(m),
  );
  const customModuleCount = customModules.length;
  useEffect(() => {
    setCustomModuleIds((prev) => {
      if (prev.length === customModuleCount) return prev;
      if (prev.length < customModuleCount)
        return [
          ...prev,
          ...Array.from({ length: customModuleCount - prev.length }, () =>
            Date.now(),
          ),
        ];
      return prev.slice(0, customModuleCount);
    });
  }, [customModuleCount]);

  const update = <K extends keyof GeneratorConfig>(
    key: K,
    value: GeneratorConfig[K],
  ) => {
    onConfigChange({ ...config, [key]: value });
  };

  const handleProjectTypeChange = (projectType: ProjectType) => {
    const allowed = FRAMEWORKS_BY_PROJECT_TYPE[projectType];
    const framework = allowed.includes(config.framework)
      ? config.framework
      : allowed[0];
    const optionsForFramework = config.options?.[framework];
    onConfigChange({
      ...config,
      projectType,
      framework,
      options: optionsForFramework != null ? { [framework]: optionsForFramework } : undefined,
    });
  };

  const handleFrameworkChange = (framework: Framework) => {
    const optionsForFramework = config.options?.[framework];
    onConfigChange({
      ...config,
      framework,
      options: optionsForFramework != null ? { [framework]: optionsForFramework } : undefined,
    });
  };

  const toggleModule = (module: string) => {
    const modules = config.modules.includes(module)
      ? config.modules.filter((m) => m !== module)
      : [...config.modules, module];
    update("modules", modules);
  };

  const setCustomModuleName = (index: number, name: string) => {
    const preset = (config.modules ?? []).filter((m) =>
      MODULE_OPTIONS.includes(m),
    );
    const custom = [...customModules];
    custom[index] = name.trim();
    update("modules", [...preset, ...custom]);
  };

  const addCustomModule = () => {
    setCustomModuleIds((prev) => [...prev, Date.now()]);
    update("modules", [...(config.modules ?? []), ""]);
  };

  const removeCustomModule = (index: number) => {
    setCustomModuleIds((prev) => prev.filter((_, i) => i !== index));
    const preset = (config.modules ?? []).filter((m) =>
      MODULE_OPTIONS.includes(m),
    );
    const custom = customModules.filter((_, i) => i !== index);
    update("modules", [...preset, ...custom]);
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
          onChange={(e) =>
            handleProjectTypeChange(e.target.value as ProjectType)
          }
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
          onChange={(e) => handleFrameworkChange(e.target.value as Framework)}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-foreground focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
        >
          {frameworksForSelect.map((opt) => (
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

      {config.framework === "nextjs" && (
        <div className="space-y-4 rounded-md border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
          <span className="block text-sm font-medium text-foreground">
            Next.js options
          </span>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={config.options?.nextjs?.useSrcDirectory ?? false}
              onChange={(e) => {
                const nextjs = {
                  ...config.options?.nextjs,
                  useSrcDirectory: e.target.checked,
                };
                onConfigChange({
                  ...config,
                  options: { ...config.options, nextjs },
                });
              }}
              className="h-4 w-4 rounded border-neutral-300 text-neutral-600 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800"
            />
            Use <code className="text-xs">src</code> directory (app &amp; code under{" "}
            <code className="text-xs">src/</code>)
          </label>
          <div>
            <span className="mb-1.5 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Route groups (optional)
            </span>
            <div className="flex flex-col gap-1.5">
              {["(marketing)", "(shop)", "(dashboard)"].map((group) => (
                <label
                  key={group}
                  className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
                >
                  <input
                    type="checkbox"
                    checked={(
                      config.options?.nextjs?.routeGroups ?? []
                    ).includes(group)}
                    onChange={() => {
                      const current =
                        config.options?.nextjs?.routeGroups ?? [];
                      const next = current.includes(group)
                        ? current.filter((g) => g !== group)
                        : [...current, group];
                      const nextjs = {
                        ...config.options?.nextjs,
                        routeGroups: next,
                      };
                      onConfigChange({
                        ...config,
                        options: { ...config.options, nextjs },
                      });
                    }}
                    className="h-4 w-4 rounded border-neutral-300 text-neutral-600 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800"
                  />
                  <code className="text-xs">{group}</code>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {config.framework === "react" && (
        <div className="space-y-4 rounded-md border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
          <span className="block text-sm font-medium text-foreground">
            React options
          </span>
          <div>
            <label
              htmlFor="react-state"
              className="mb-1.5 block text-xs font-medium text-neutral-600 dark:text-neutral-400"
            >
              State management
            </label>
            <select
              id="react-state"
              value={config.options?.react?.stateManagement ?? "none"}
              onChange={(e) => {
                const react = {
                  ...config.options?.react,
                  stateManagement: e.target.value as ReactStateManagement,
                };
                onConfigChange({
                  ...config,
                  options: { ...config.options, react },
                });
              }}
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-foreground focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
            >
              {REACT_STATE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={config.options?.react?.includeTests ?? false}
              onChange={(e) => {
                const react = {
                  ...config.options?.react,
                  includeTests: e.target.checked,
                };
                onConfigChange({
                  ...config,
                  options: { ...config.options, react },
                });
              }}
              className="h-4 w-4 rounded border-neutral-300 text-neutral-600 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800"
            />
            Include <code className="text-xs">src/__tests__</code>
          </label>
        </div>
      )}

      {config.framework === "node" && (
        <div className="space-y-4 rounded-md border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
          <span className="block text-sm font-medium text-foreground">
            Node options
          </span>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={config.options?.node?.includeTests !== false}
              onChange={(e) => {
                const node = {
                  ...config.options?.node,
                  includeTests: e.target.checked,
                };
                onConfigChange({
                  ...config,
                  options: { ...config.options, node },
                });
              }}
              className="h-4 w-4 rounded border-neutral-300 text-neutral-600 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800"
            />
            Include <code className="text-xs">tests/</code> (unit, integration,
            e2e)
          </label>
        </div>
      )}

      {config.framework === "nestjs" && (
        <div className="space-y-4 rounded-md border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
          <span className="block text-sm font-medium text-foreground">
            NestJS options
          </span>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={config.options?.nestjs?.includeTests !== false}
              onChange={(e) => {
                const nestjs = {
                  ...config.options?.nestjs,
                  includeTests: e.target.checked,
                };
                onConfigChange({
                  ...config,
                  options: { ...config.options, nestjs },
                });
              }}
              className="h-4 w-4 rounded border-neutral-300 text-neutral-600 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800"
            />
            Include <code className="text-xs">test/</code> (e2e)
          </label>
        </div>
      )}

      {config.framework === "vue" && (
        <div className="space-y-4 rounded-md border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
          <span className="block text-sm font-medium text-foreground">
            Vue options
          </span>
          <div>
            <label
              htmlFor="vue-state"
              className="mb-1.5 block text-xs font-medium text-neutral-600 dark:text-neutral-400"
            >
              State management
            </label>
            <select
              id="vue-state"
              value={config.options?.vue?.stateManagement ?? "none"}
              onChange={(e) => {
                const vue = {
                  ...config.options?.vue,
                  stateManagement: e.target.value as VueStateManagement,
                };
                onConfigChange({
                  ...config,
                  options: { ...config.options, vue },
                });
              }}
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-foreground focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
            >
              {VUE_STATE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={config.options?.vue?.includeTests ?? false}
              onChange={(e) => {
                const vue = {
                  ...config.options?.vue,
                  includeTests: e.target.checked,
                };
                onConfigChange({
                  ...config,
                  options: { ...config.options, vue },
                });
              }}
              className="h-4 w-4 rounded border-neutral-300 text-neutral-600 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800"
            />
            Include <code className="text-xs">tests/</code> (unit, e2e)
          </label>
        </div>
      )}

      {config.framework === "angular" && (
        <div className="space-y-4 rounded-md border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
          <span className="block text-sm font-medium text-foreground">
            Angular options
          </span>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={config.options?.angular?.includeTests !== false}
              onChange={(e) => {
                const angular = {
                  ...config.options?.angular,
                  includeTests: e.target.checked,
                };
                onConfigChange({
                  ...config,
                  options: { ...config.options, angular },
                });
              }}
              className="h-4 w-4 rounded border-neutral-300 text-neutral-600 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800"
            />
            Include <code className="text-xs">e2e/</code>
          </label>
        </div>
      )}

      {config.framework === "sveltekit" && (
        <div className="space-y-4 rounded-md border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
          <span className="block text-sm font-medium text-foreground">
            SvelteKit options
          </span>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={config.options?.sveltekit?.includeTests !== false}
              onChange={(e) => {
                const sveltekit = {
                  ...config.options?.sveltekit,
                  includeTests: e.target.checked,
                };
                onConfigChange({
                  ...config,
                  options: { ...config.options, sveltekit },
                });
              }}
              className="h-4 w-4 rounded border-neutral-300 text-neutral-600 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800"
            />
            Include <code className="text-xs">tests/</code>
          </label>
        </div>
      )}

      {config.framework === "remix" && (
        <div className="space-y-4 rounded-md border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
          <span className="block text-sm font-medium text-foreground">
            Remix options
          </span>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={config.options?.remix?.includeTests ?? false}
              onChange={(e) => {
                const remix = {
                  ...config.options?.remix,
                  includeTests: e.target.checked,
                };
                onConfigChange({
                  ...config,
                  options: { ...config.options, remix },
                });
              }}
              className="h-4 w-4 rounded border-neutral-300 text-neutral-600 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800"
            />
            Include <code className="text-xs">tests/</code>
          </label>
        </div>
      )}

      <div>
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          Feature modules
        </span>
        <p className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
          Add feature areas (e.g. auth, billing). They appear as{" "}
          {config.architecture === "domain" ? "domains" : "modules"}
          {" "}in the generated structure.
        </p>
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
        <div className="mt-2">
          <span className="mb-1.5 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Custom modules
          </span>
          <div className="flex flex-col gap-2">
            {customModules.map((name, index) => (
              <div
                key={customModuleIds[index] ?? index}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setCustomModuleName(index, e.target.value)
                  }
                  placeholder="e.g. admin, payments"
                  className="min-w-0 flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-foreground placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                />
                <button
                  type="button"
                  onClick={() => removeCustomModule(index)}
                  className="shrink-0 rounded-md border border-neutral-300 px-2.5 py-2 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
                  aria-label="Remove module"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCustomModule}
              className="self-start rounded-md border border-dashed border-neutral-300 px-3 py-2 text-sm text-neutral-600 transition hover:border-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-600 dark:text-neutral-400 dark:hover:border-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
            >
              + Add custom module
            </button>
          </div>
        </div>
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          Custom folders
        </span>
        <p className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
          Add paths anywhere in the tree (e.g.{" "}
          <code className="text-xs">src/utils/helpers</code>,{" "}
          <code className="text-xs">app/api/v2</code>).
        </p>
        <div className="flex flex-col gap-2">
          {(config.customFolders ?? []).map((path, index) => (
            <div
              key={customFolderIds[index] ?? index}
              className="flex gap-2"
            >
              <input
                type="text"
                value={path}
                onChange={(e) => {
                  const list = [...(config.customFolders ?? [])];
                  list[index] = e.target.value.trim();
                  onConfigChange({ ...config, customFolders: list });
                }}
                placeholder="e.g. src/utils/helpers"
                className="min-w-0 flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 font-mono text-sm text-foreground placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
              <button
                type="button"
                onClick={() => {
                  setCustomFolderIds((prev) =>
                    prev.filter((_, i) => i !== index),
                  );
                  const list = (config.customFolders ?? []).filter(
                    (_, i) => i !== index,
                  );
                  onConfigChange({ ...config, customFolders: list });
                }}
                className="shrink-0 rounded-md border border-neutral-300 px-2.5 py-2 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
                aria-label="Remove folder"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setCustomFolderIds((prev) => [...prev, Date.now()]);
              const list = [...(config.customFolders ?? []), ""];
              onConfigChange({ ...config, customFolders: list });
            }}
            className="self-start rounded-md border border-dashed border-neutral-300 px-3 py-2 text-sm text-neutral-600 transition hover:border-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-600 dark:text-neutral-400 dark:hover:border-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
          >
            + Add folder
          </button>
        </div>
      </div>
    </div>
  );
};

export { ConfigPanel };
