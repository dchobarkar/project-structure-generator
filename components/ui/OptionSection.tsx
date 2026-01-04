/**
 * Wrapper for framework-specific options (e.g. "Next.js options", "React options"): bordered box with title.
 */

interface OptionSectionProps {
  title: string;
  children: React.ReactNode;
}

const wrapperClassName =
  "space-y-4 rounded-md border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50";

const OptionSection = ({ title, children }: OptionSectionProps) => {
  return (
    <div className={wrapperClassName}>
      <span className="block text-sm font-medium text-foreground">{title}</span>
      {children}
    </div>
  );
};

export default OptionSection;
export type { OptionSectionProps };
