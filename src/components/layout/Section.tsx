import * as React from "react";

/** Tiny utility (similar to shadcn cn) */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type ElementTag = keyof React.JSX.IntrinsicElements;

interface SectionProps<T extends ElementTag = "section">
  extends React.HTMLAttributes<HTMLElement> {
  as?: T;
  children: React.ReactNode;
}

/**
 * Section
 * - Normalizes horizontal/vertical spacing sitewide (tight, premium feel)
 * - Keeps max width sane for large screens
 * - Use everywhere instead of ad-hoc wrappers
 */
export default function Section<T extends ElementTag = "section">(
  props: SectionProps<T>
) {
  const { as, className, children, ...rest } = props as SectionProps & { as?: ElementTag };
  const Tag = (as || "section") as React.ElementType;

  return (
    <Tag
      className={cn(
        "container mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8",
        "py-10 md:py-12",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}