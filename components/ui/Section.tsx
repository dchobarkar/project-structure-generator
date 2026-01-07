interface SectionProps {
  title: string;
  children: React.ReactNode;
  contentClassName?: string;
}

function Section({ title, children, contentClassName }: SectionProps) {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <h2 className="mb-4 text-base font-semibold text-foreground">{title}</h2>
      {contentClassName ? (
        <div className={contentClassName}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

export { Section };
export type { SectionProps };
