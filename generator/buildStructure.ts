import type { GeneratorConfig, FolderTree } from "@/types/generator";
import { nextFeatureTemplate } from "@/templates/nextFeatureTemplate";

const buildStructure = (config: GeneratorConfig): FolderTree => {
  const structure: FolderTree = JSON.parse(
    JSON.stringify(nextFeatureTemplate),
  ) as FolderTree;

  config.modules.forEach((moduleName) => {
    if (!structure.modules || typeof structure.modules !== "object") {
      structure.modules = {};
    }
    (structure.modules as FolderTree)[moduleName] = {};
  });

  return structure;
};

export { buildStructure };
