import { useState, useEffect } from "react";

/**
 * Returns a stable array of ids that stays in sync with `count`.
 * Used for list keys so inputs don't remount when their value changes.
 */
export function useStableIds(count: number): number[] {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    setIds((prev) => {
      if (prev.length === count) return prev;
      if (prev.length < count)
        return [
          ...prev,
          ...Array.from({ length: count - prev.length }, () => Date.now()),
        ];
      return prev.slice(0, count);
    });
  }, [count]);

  return ids;
}
