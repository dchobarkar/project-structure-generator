import type { FolderTree } from "@/types/generator";

function hasNestedKeys(obj: FolderTree[string]): obj is FolderTree {
  return (
    obj !== null &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    Object.keys(obj).length > 0
  );
}

const buildCLI = (structure: FolderTree, basePath = "."): string => {
  const commands: string[] = [];

  function traverse(obj: FolderTree, path: string) {
    Object.keys(obj).forEach((key) => {
      const newPath = path ? `${path}/${key}` : key;
      commands.push(`mkdir -p "${newPath}"`);
      const child = obj[key];
      if (hasNestedKeys(child)) {
        traverse(child, newPath);
      }
    });
  }

  traverse(structure, basePath);

  return commands.join("\n");
};

export { buildCLI };
