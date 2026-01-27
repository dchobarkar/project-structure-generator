import { Folder } from "lucide-react";

import type { FolderTree } from "@/types/generator";

interface TreeViewProps {
  structure: FolderTree | null;
}

const TreeItem = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="ml-4 flex flex-col">
      <span className="inline-flex items-center gap-2 text-sm text-foreground">
        <Folder className="h-4 w-4 shrink-0 text-amber-500" aria-hidden />
        {name}
      </span>
      {children}
    </div>
  );
};

const renderTreeWithIcon = (node: FolderTree): React.ReactNode => {
  return Object.keys(node).map((key) => {
    const child = node[key];
    const hasChildren =
      child !== null &&
      typeof child === "object" &&
      !Array.isArray(child) &&
      Object.keys(child).length > 0;
    return (
      <TreeItem key={key} name={key}>
        {hasChildren ? renderTreeWithIcon(child as FolderTree) : null}
      </TreeItem>
    );
  });
};

const TreeView = ({ structure }: TreeViewProps) => {
  if (!structure || Object.keys(structure).length === 0) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Configure options and see the folder tree here.
      </p>
    );
  }

  return (
    <div className="font-mono text-sm" data-testid="folder-tree">
      {renderTreeWithIcon(structure)}
    </div>
  );
};

export { TreeView };
