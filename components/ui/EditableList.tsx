"use client";

import useStableIds from "@/hooks/useStableIds";

interface EditableListProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addButtonLabel?: string;
  removeAriaLabel?: string;
  inputClassName?: string;
}

const defaultInputClassName =
  "min-w-0 flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-foreground placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500";

const removeButtonClassName =
  "shrink-0 rounded-md border border-neutral-300 px-2.5 py-2 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100";

const addButtonClassName =
  "self-start rounded-md border border-dashed border-neutral-300 px-3 py-2 text-sm text-neutral-600 transition hover:border-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-600 dark:text-neutral-400 dark:hover:border-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-100";

const EditableList = ({
  items,
  onChange,
  placeholder = "e.g. item",
  addButtonLabel = "+ Add",
  removeAriaLabel = "Remove",
  inputClassName = defaultInputClassName,
}: EditableListProps) => {
  const ids = useStableIds(items.length);

  const updateAt = (index: number, value: string) => {
    const next = [...items];
    next[index] = value.trim();
    onChange(next);
  };

  const removeAt = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const add = () => {
    onChange([...items, ""]);
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map((value, index) => (
        <div key={ids[index] ?? index} className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => updateAt(index, e.target.value)}
            placeholder={placeholder}
            className={inputClassName}
          />
          <button
            type="button"
            onClick={() => removeAt(index)}
            className={removeButtonClassName}
            aria-label={removeAriaLabel}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className={addButtonClassName}>
        {addButtonLabel}
      </button>
    </div>
  );
};

export default EditableList;
export type { EditableListProps };
