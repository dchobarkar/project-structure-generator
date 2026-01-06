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

export { useStableIds };
