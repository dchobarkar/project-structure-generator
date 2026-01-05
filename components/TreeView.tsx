"use client";

import { useMemo, useCallback, useState } from "react";
import { Folder, ChevronRight, ChevronDown } from "lucide-react";

import type { FolderTree } from "@/types/generator";

interface TreeViewProps {
  structure: FolderTree | null;
}

const getPathsWithChildren = (node: FolderTree, prefix = ""): string[] => {
  const paths: string[] = [];
  for (const key of Object.keys(node)) {
    const child = node[key];
    const hasChildren =
      child !== null &&
      typeof child === "object" &&
      !Array.isArray(child) &&
      Object.keys(child).length > 0;
    const path = prefix ? `${prefix}/${key}` : key;
    if (hasChildren) {
      paths.push(path);
      paths.push(...getPathsWithChildren(child as FolderTree, path));
    }
  }
  return paths;
};

interface TreeFolderRowProps {
  name: string;
  path: string;
  hasChildren: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  depth: number;
}

const TreeFolderRow = ({
  name,
  hasChildren,
  isExpanded,
  onToggle,
  children,
  depth,
}: TreeFolderRowProps) => {
  return (
    <div className="flex flex-col" style={{ marginLeft: depth * 12 }}>
      <button
        type="button"
        onClick={hasChildren ? onToggle : undefined}
        className="inline-flex min-w-0 cursor-pointer items-center gap-2 rounded py-0.5 pr-2 text-left text-sm text-foreground transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-label={
          hasChildren ? (isExpanded ? "Collapse" : "Expand") : undefined
        }
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-neutral-500" aria-hidden />
            ) : (
              <ChevronRight className="h-4 w-4 text-neutral-500" aria-hidden />
            )
          ) : (
            <span className="h-4 w-4" aria-hidden />
          )}
        </span>
        <Folder className="h-4 w-4 shrink-0 text-amber-500" aria-hidden />
        <span className="truncate">{name}</span>
      </button>
      {hasChildren && isExpanded && children}
    </div>
  );
};

interface TreeFolderProps {
  node: FolderTree;
  pathPrefix: string;
  depth: number;
  collapsedPaths: Set<string>;
  onToggle: (path: string) => void;
}

const TreeFolder = ({
  node,
  pathPrefix,
  depth,
  collapsedPaths,
  onToggle,
}: TreeFolderProps) => {
  return (
    <>
      {Object.keys(node).map((key) => {
        const child = node[key];
        const hasChildren =
          child !== null &&
          typeof child === "object" &&
          !Array.isArray(child) &&
          Object.keys(child).length > 0;
        const path = pathPrefix ? `${pathPrefix}/${key}` : key;
        const isExpanded = !collapsedPaths.has(path);
        return (
          <TreeFolderRow
            key={path}
            name={key}
            path={path}
            hasChildren={hasChildren}
            isExpanded={isExpanded}
            onToggle={() => onToggle(path)}
            depth={depth}
          >
            {hasChildren && (
              <TreeFolder
                node={child as FolderTree}
                pathPrefix={path}
                depth={depth + 1}
                collapsedPaths={collapsedPaths}
                onToggle={onToggle}
              />
            )}
          </TreeFolderRow>
        );
      })}
    </>
  );
};

const TreeView = ({ structure }: TreeViewProps) => {
  const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(new Set());

  const allCollapsiblePaths = useMemo(
    () => (structure ? getPathsWithChildren(structure) : []),
    [structure],
  );

  const expandAll = useCallback(() => {
    setCollapsedPaths(new Set());
  }, []);

  const collapseAll = useCallback(() => {
    setCollapsedPaths(new Set(allCollapsiblePaths));
  }, [allCollapsiblePaths]);

  const toggle = useCallback((path: string) => {
    setCollapsedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  if (!structure || Object.keys(structure).length === 0) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Configure options and see the folder tree here.
      </p>
    );
  }

  return (
    <div className="font-mono text-sm" data-testid="folder-tree">
      <div className="mb-2 flex gap-2">
        <button
          type="button"
          onClick={expandAll}
          className="rounded border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-600 transition hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          Expand all
        </button>
        <button
          type="button"
          onClick={collapseAll}
          className="rounded border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-600 transition hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          Collapse all
        </button>
      </div>
      <TreeFolder
        node={structure}
        pathPrefix=""
        depth={0}
        collapsedPaths={collapsedPaths}
        onToggle={toggle}
      />
    </div>
  );
};

export default TreeView;
