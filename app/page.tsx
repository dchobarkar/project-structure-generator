"use client";

import { useState, useCallback, useMemo } from "react";

import type { GeneratorConfig } from "@/types/generator";
import { FRAMEWORKS_BY_PROJECT_TYPE } from "@/types/generator";
import { buildStructure } from "@/generator/buildStructure";
import { buildCLI } from "@/generator/buildCLI";
import { ConfigPanel } from "@/components/ConfigPanel";
import { TreeView } from "@/components/TreeView";
import { CLIView } from "@/components/CLIView";

const DEFAULT_CONFIG: GeneratorConfig = {
  projectType: "frontend",
  framework: "nextjs",
  architecture: "feature",
  modules: [],
};

const Page = () => {
  const [config, setConfig] = useState<GeneratorConfig>(DEFAULT_CONFIG);

  const normalizedConfig = useMemo(() => {
    const allowed = FRAMEWORKS_BY_PROJECT_TYPE[config.projectType];
    if (allowed.includes(config.framework)) return config;
    return { ...config, framework: allowed[0] };
  }, [config]);

  const handleConfigChange = useCallback((next: GeneratorConfig) => {
    setConfig(next);
  }, []);

  const structure = buildStructure(normalizedConfig);
  const cliCommands = buildCLI(structure);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-neutral-200 bg-white/80 px-6 py-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/80">
        <h1 className="text-xl font-semibold tracking-tight">
          Folder Structure Generator
        </h1>
        <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
          Generate scalable, production-ready project folder structures based on
          architecture and feature modules.
        </p>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <ConfigPanel
                config={normalizedConfig}
                onConfigChange={handleConfigChange}
              />
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-8">
            <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="mb-4 text-base font-semibold text-foreground">
                Folder tree
              </h2>
              <div className="max-h-80 overflow-y-auto rounded border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
                <TreeView structure={structure} />
              </div>
            </section>

            <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="mb-4 text-base font-semibold text-foreground">
                CLI commands
              </h2>
              <div className="max-h-80 overflow-y-auto">
                <CLIView commands={cliCommands} />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
