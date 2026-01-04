/**
 * Hook that returns a stable array of ids of length `count`.
 * When `count` increases, new ids (Date.now()) are appended; when it decreases, ids are trimmed.
 * Used by EditableList so list item keys don't change when the user types (avoids input remount/focus loss).
 */

import { useState, useEffect } from "react";

const useStableIds = (count: number): number[] => {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
};

export default useStableIds;
