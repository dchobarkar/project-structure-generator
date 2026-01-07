interface CheckboxFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  id?: string;
}

const checkboxClassName =
  "h-4 w-4 rounded border-neutral-300 text-neutral-600 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800";

function CheckboxField({ checked, onChange, label, id }: CheckboxFieldProps) {
  return (
    <label
      className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
      htmlFor={id}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={checkboxClassName}
      />
      {label}
    </label>
  );
}

export { CheckboxField };
export type { CheckboxFieldProps };
