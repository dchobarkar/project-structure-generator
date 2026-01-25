import type { GeneratorConfig, FolderTree } from "@/types/generator";
import type { Framework } from "@/types/generator";
import { nextFeatureTemplate } from "@/templates/nextFeatureTemplate";
import { reactTemplate } from "@/templates/reactTemplate";
import { nodeTemplate } from "@/templates/nodeTemplate";
import { nestTemplate } from "@/templates/nestTemplate";

const TEMPLATES: Record<Framework, FolderTree> = {
  nextjs: nextFeatureTemplate,
  react: reactTemplate,
  node: nodeTemplate,
  nestjs: nestTemplate,
};

const getModulesContainer = (
  structure: FolderTree,
  framework: Framework,
): FolderTree => {
  switch (framework) {
    case "nextjs": {
      const m = structure.modules;
      return (typeof m === "object" && m !== null ? m : {}) as FolderTree;
    }
    case "react":
    case "node":
    case "nestjs": {
      const src = structure.src as FolderTree | undefined;
      if (!src) return structure;
      const m = src.modules;
      return (typeof m === "object" && m !== null ? m : {}) as FolderTree;
    }
    default:
      return structure;
  }
};

const buildStructure = (config: GeneratorConfig): FolderTree => {
  const base = TEMPLATES[config.framework];
  const structure: FolderTree = JSON.parse(JSON.stringify(base)) as FolderTree;
  const modulesContainer = getModulesContainer(structure, config.framework);

  config.modules.forEach((moduleName) => {
    (modulesContainer as FolderTree)[moduleName] = {};
  });

  return structure;
};

export { buildStructure };
