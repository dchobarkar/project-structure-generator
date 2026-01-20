import type { GeneratorConfig, FolderTree } from "@/types/generator";
import { getTemplate, getModulesContainers } from "@/templates/registry";

export function buildStructure(config: GeneratorConfig): FolderTree {
  const structure = getTemplate(config);
  const containers = getModulesContainers(structure, config);

  for (const container of containers) {
    config.modules.forEach((moduleName) => {
      (container as FolderTree)[moduleName] = {};
    });
  }

  return structure;
}
