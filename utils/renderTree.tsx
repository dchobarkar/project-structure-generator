import type React from "react";

import type { FolderTree } from "@/types/generator";

function hasNestedKeys(obj: FolderTree[string]): obj is FolderTree {
  return (
    obj !== null &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    Object.keys(obj).length > 0
  );
}
const renderTree = (node: FolderTree): React.ReactNode => {
  return Object.keys(node).map((key) => {
    const child = node[key];
    const hasChildren = hasNestedKeys(child);
    return (
      <div key={key} className="ml-4">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden>📁</span>
          {key}
        </span>
        {hasChildren ? renderTree(child) : null}
      </div>
    );
  });
};

export { renderTree };
