/**
 * Converts a folder tree (nested objects) into a string of shell commands:
 * one `mkdir -p "path"` per folder. Used for the "Copy" button in the CLI section.
 */

import type { FolderTree } from "@/types/generator";

/** Type guard: true if the value is a non-empty FolderTree (has nested keys). */
const hasNestedKeys = (obj: FolderTree[string]): obj is FolderTree => {
  return (
    obj !== null &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    Object.keys(obj).length > 0
  );
};

/**
 * Returns a newline-separated list of `mkdir -p "path"` commands for the given tree.
 * @param basePath - Prefix for all paths (default ".").
 */
const buildCLI = (structure: FolderTree, basePath = "."): string => {
  const commands: string[] = [];

  const traverse = (obj: FolderTree, path: string) => {
    Object.keys(obj).forEach((key) => {
      const newPath = path ? `${path}/${key}` : key;
      commands.push(`mkdir -p "${newPath}"`);
      const child = obj[key];
      if (hasNestedKeys(child)) {
        traverse(child, newPath);
      }
    });
  };

  traverse(structure, basePath);

  return commands.join("\n");
};

export default buildCLI;
