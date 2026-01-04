"use client";

/**
 * Displays the generated CLI commands (mkdir -p ...) in a code block
 * and provides a "Copy" button to copy them to the clipboard.
 */

import { useCallback, useState } from "react";
import { Copy, Check } from "lucide-react";

interface CLIViewProps {
  commands: string;
}

const CLIView = ({ commands }: CLIViewProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!commands) return;
    try {
      await navigator.clipboard.writeText(commands);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [commands]);

  if (!commands.trim()) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Add modules or generate a structure to see CLI commands.
      </p>
    );
  }

  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-900 px-4 py-3 font-mono text-sm leading-relaxed text-neutral-100 dark:border-neutral-700">
        <code>{commands}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 flex items-center gap-1.5 rounded bg-neutral-700 px-2 py-1.5 text-xs text-neutral-100 transition hover:bg-neutral-600"
        aria-label={copied ? "Copied" : "Copy commands"}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copy
          </>
        )}
      </button>
    </div>
  );
};

export default CLIView;
