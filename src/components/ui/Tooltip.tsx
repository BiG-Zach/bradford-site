import * as React from "react";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
};

export default function Tooltip({ content, children }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute z-20 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 shadow-md transition group-hover:opacity-100"
      >
        {content}
      </span>
    </span>
  );
}