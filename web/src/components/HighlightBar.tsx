'use client';

import type { ActivityHighlight } from "@/lib/content-utils";

type HighlightBarProps = {
  highlights: ActivityHighlight[];
};

export function HighlightBar({ highlights }: HighlightBarProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {highlights.map((highlight) => (
        <div
          key={highlight.label}
          className="rounded-2xl border border-white/5 bg-black/30 p-4 text-sm text-text-muted"
        >
          <p className="text-xs uppercase tracking-wide text-text-subtle">
            {highlight.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {highlight.value}
          </p>
          {highlight.hint && (
            <p className="mt-1 text-xs text-text-subtle">{highlight.hint}</p>
          )}
        </div>
      ))}
    </div>
  );
}
