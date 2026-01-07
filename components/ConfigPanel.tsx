import type {
  GeneratorConfig,
  ProjectType,
  Framework,
} from "@/types/generator";
import { FRAMEWORKS_BY_PROJECT_TYPE } from "@/types/generator";
import {
  PROJECT_TYPES,
  FRAMEWORKS,
  ARCHITECTURES,
  MODULE_OPTIONS,
  REACT_STATE_OPTIONS,
  VUE_STATE_OPTIONS,
  NEXTJS_ROUTE_GROUPS,
} from "@/lib/constants";
import {
  SelectField,
  CheckboxField,
  OptionSection,
  EditableList,
} from "@/components/ui";

interface ConfigPanelProps {
  config: GeneratorConfig;
  onConfigChange: (config: GeneratorConfig) => void;
}

const ConfigPanel = ({ config, onConfigChange }: ConfigPanelProps) => {
  const allowedFrameworks = FRAMEWORKS_BY_PROJECT_TYPE[config.projectType];
  const frameworksForSelect = FRAMEWORKS.filter((opt) =>
    allowedFrameworks.includes(opt.value),
  );

  const presetModules = (config.modules ?? []).filter((m) =>
    MODULE_OPTIONS.includes(m as (typeof MODULE_OPTIONS)[number]),
  );
  const customModules = (config.modules ?? []).filter(
    (m) => !MODULE_OPTIONS.includes(m as (typeof MODULE_OPTIONS)[number]),
  );

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
      options:
        optionsForFramework != null
          ? { [framework]: optionsForFramework }
          : undefined,
    });
  };

  const handleFrameworkChange = (framework: Framework) => {
    const optionsForFramework = config.options?.[framework];
    onConfigChange({
      ...config,
      framework,
      options:
        optionsForFramework != null
          ? { [framework]: optionsForFramework }
          : undefined,
    });
  };

  const toggleModule = (module: string) => {
    const modules = config.modules.includes(module)
      ? config.modules.filter((m) => m !== module)
      : [...config.modules, module];
    update("modules", modules);
  };

  const handleCustomModulesChange = (custom: string[]) => {
    update("modules", [...presetModules, ...custom]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-foreground">Configuration</h2>

      <SelectField
        id="project-type"
        label="Project type"
        value={config.projectType}
        options={PROJECT_TYPES}
        onChange={(v) => handleProjectTypeChange(v)}
      />

      <SelectField
        id="framework"
        label="Framework"
        value={config.framework}
        options={frameworksForSelect}
        onChange={(v) => handleFrameworkChange(v)}
      />

      <SelectField
        id="architecture"
        label="Architecture"
        value={config.architecture}
        options={ARCHITECTURES}
        onChange={(v) => update("architecture", v)}
      />

      {config.framework === "nextjs" && (
        <OptionSection title="Next.js options">
          <CheckboxField
            checked={config.options?.nextjs?.useSrcDirectory ?? false}
            onChange={(checked) => {
              const nextjs = {
                ...config.options?.nextjs,
                useSrcDirectory: checked,
              };
              onConfigChange({
                ...config,
                options: { ...config.options, nextjs },
              });
            }}
            label={
              <>
                Use <code className="text-xs">src</code> directory (app &amp;
                code under <code className="text-xs">src/</code>)
              </>
            }
          />
          <div>
            <span className="mb-1.5 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Route groups (optional)
            </span>
            <div className="flex flex-col gap-1.5">
              {NEXTJS_ROUTE_GROUPS.map((group) => (
                <CheckboxField
                  key={group}
                  checked={(config.options?.nextjs?.routeGroups ?? []).includes(
                    group,
                  )}
                  onChange={() => {
                    const current = config.options?.nextjs?.routeGroups ?? [];
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
                  label={<code className="text-xs">{group}</code>}
                />
              ))}
            </div>
          </div>
        </OptionSection>
      )}

      {config.framework === "react" && (
        <OptionSection title="React options">
          <SelectField
            id="react-state"
            label="State management"
            value={config.options?.react?.stateManagement ?? "none"}
            options={REACT_STATE_OPTIONS}
            onChange={(v) => {
              const react = {
                ...config.options?.react,
                stateManagement: v,
              };
              onConfigChange({
                ...config,
                options: { ...config.options, react },
              });
            }}
          />
          <CheckboxField
            checked={config.options?.react?.includeTests ?? false}
            onChange={(checked) => {
              const react = {
                ...config.options?.react,
                includeTests: checked,
              };
              onConfigChange({
                ...config,
                options: { ...config.options, react },
              });
            }}
            label={<code className="text-xs">src/__tests__</code>}
          />
        </OptionSection>
      )}

      {config.framework === "node" && (
        <OptionSection title="Node options">
          <CheckboxField
            checked={config.options?.node?.includeTests !== false}
            onChange={(checked) => {
              const node = {
                ...config.options?.node,
                includeTests: checked,
              };
              onConfigChange({
                ...config,
                options: { ...config.options, node },
              });
            }}
            label={
              <>
                Include <code className="text-xs">tests/</code> (unit,
                integration, e2e)
              </>
            }
          />
        </OptionSection>
      )}

      {config.framework === "nestjs" && (
        <OptionSection title="NestJS options">
          <CheckboxField
            checked={config.options?.nestjs?.includeTests !== false}
            onChange={(checked) => {
              const nestjs = {
                ...config.options?.nestjs,
                includeTests: checked,
              };
              onConfigChange({
                ...config,
                options: { ...config.options, nestjs },
              });
            }}
            label={
              <>
                Include <code className="text-xs">test/</code> (e2e)
              </>
            }
          />
        </OptionSection>
      )}

      {config.framework === "vue" && (
        <OptionSection title="Vue options">
          <SelectField
            id="vue-state"
            label="State management"
            value={config.options?.vue?.stateManagement ?? "none"}
            options={VUE_STATE_OPTIONS}
            onChange={(v) => {
              const vue = {
                ...config.options?.vue,
                stateManagement: v,
              };
              onConfigChange({
                ...config,
                options: { ...config.options, vue },
              });
            }}
          />
          <CheckboxField
            checked={config.options?.vue?.includeTests ?? false}
            onChange={(checked) => {
              const vue = {
                ...config.options?.vue,
                includeTests: checked,
              };
              onConfigChange({
                ...config,
                options: { ...config.options, vue },
              });
            }}
            label={
              <>
                Include <code className="text-xs">tests/</code> (unit, e2e)
              </>
            }
          />
        </OptionSection>
      )}

      {config.framework === "angular" && (
        <OptionSection title="Angular options">
          <CheckboxField
            checked={config.options?.angular?.includeTests !== false}
            onChange={(checked) => {
              const angular = {
                ...config.options?.angular,
                includeTests: checked,
              };
              onConfigChange({
                ...config,
                options: { ...config.options, angular },
              });
            }}
            label={
              <>
                Include <code className="text-xs">e2e/</code>
              </>
            }
          />
        </OptionSection>
      )}

      {config.framework === "sveltekit" && (
        <OptionSection title="SvelteKit options">
          <CheckboxField
            checked={config.options?.sveltekit?.includeTests !== false}
            onChange={(checked) => {
              const sveltekit = {
                ...config.options?.sveltekit,
                includeTests: checked,
              };
              onConfigChange({
                ...config,
                options: { ...config.options, sveltekit },
              });
            }}
            label={
              <>
                Include <code className="text-xs">tests/</code>
              </>
            }
          />
        </OptionSection>
      )}

      {config.framework === "remix" && (
        <OptionSection title="Remix options">
          <CheckboxField
            checked={config.options?.remix?.includeTests ?? false}
            onChange={(checked) => {
              const remix = {
                ...config.options?.remix,
                includeTests: checked,
              };
              onConfigChange({
                ...config,
                options: { ...config.options, remix },
              });
            }}
            label={
              <>
                Include <code className="text-xs">tests/</code>
              </>
            }
          />
        </OptionSection>
      )}

      <div>
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          Feature modules
        </span>
        <p className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
          Add feature areas (e.g. auth, billing). They appear as{" "}
          {config.architecture === "domain" ? "domains" : "modules"} in the
          generated structure.
        </p>
        <div className="flex flex-col gap-2">
          {MODULE_OPTIONS.map((module) => (
            <CheckboxField
              key={module}
              checked={config.modules.includes(module)}
              onChange={() => toggleModule(module)}
              label={module}
            />
          ))}
        </div>
        <div className="mt-2">
          <span className="mb-1.5 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Custom modules
          </span>
          <EditableList
            items={customModules}
            onChange={handleCustomModulesChange}
            placeholder="e.g. admin, payments"
            addButtonLabel="+ Add custom module"
            removeAriaLabel="Remove module"
          />
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
        <EditableList
          items={config.customFolders ?? []}
          onChange={(list) =>
            onConfigChange({ ...config, customFolders: list })
          }
          placeholder="e.g. src/utils/helpers"
          addButtonLabel="+ Add folder"
          removeAriaLabel="Remove folder"
          inputClassName="min-w-0 flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 font-mono text-sm text-foreground placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
        />
      </div>
    </div>
  );
};

export { ConfigPanel };
