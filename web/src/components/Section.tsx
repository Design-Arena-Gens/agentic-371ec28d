'use client';

import { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
  title: string;
  description?: string;
  action?: React.ReactNode;
  id?: string;
}>;

export function Section({
  title,
  description,
  action,
  children,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className="relative rounded-3xl border border-white/5 bg-panel/70 p-6 shadow-panel sm:p-8"
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-sm text-text-muted">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
