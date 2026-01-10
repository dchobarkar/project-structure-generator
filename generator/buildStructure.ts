import type { GeneratorConfig, FolderTree } from "@/types/generator";
import { getTemplate, getModulesContainers } from "@/templates/registry";

/** Ensures a path like "src/utils/helpers" exists in the tree, creating nested objects as needed. */
function applyCustomPath(structure: FolderTree, path: string): void {
  const segments = path
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean);
  if (segments.length === 0) return;

  let current: FolderTree = structure;
  for (let i = 0; i < segments.length; i++) {
    const key = segments[i];
    const existing = current[key];
    if (existing !== undefined && typeof existing === "object" && existing !== null && !Array.isArray(existing)) {
      current = existing as FolderTree;
    } else {
      const next: FolderTree = {};
      (current as FolderTree)[key] = next;
      current = next;
    }
  }
}

export function buildStructure(config: GeneratorConfig): FolderTree {
  const structure = getTemplate(config);
  const containers = getModulesContainers(structure, config);

  const moduleNames = (config.modules ?? []).filter((name) =>
    typeof name === "string" && name.trim() !== "",
  );
  for (const container of containers) {
    moduleNames.forEach((moduleName) => {
      (container as FolderTree)[moduleName.trim()] = {};
    });
  }

  const customFolders = config.customFolders ?? [];
  for (const path of customFolders) {
    if (typeof path === "string" && path.trim()) {
      applyCustomPath(structure, path.trim());
    }
  }

  return structure;
}
