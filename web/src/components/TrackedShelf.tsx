'use client';

import { TrackedContent } from "@/hooks/useTrackedContent";
import { ContentItem } from "@/data/content";
import { CheckCircle2, CircleDot } from "lucide-react";

export type ShelfItem = {
  item: ContentItem;
  tracked: TrackedContent;
};

type TrackedShelfProps = {
  title: string;
  items: ShelfItem[];
  onToggleStatus: (id: string) => void;
  onUntrack: (id: string) => void;
  emptyCopy: string;
};

export function TrackedShelf({
  title,
  items,
  onToggleStatus,
  onUntrack,
  emptyCopy,
}: TrackedShelfProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-text-subtle">
        {title}
      </h3>
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-6 text-sm text-text-muted">
          {emptyCopy}
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map(({ item, tracked }) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-black/30 p-4 text-sm text-text-muted transition hover:border-accent/40"
            >
              <div>
                <p className="font-medium text-white">{item.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-text-subtle">
                  <span className="inline-flex items-center gap-1.5">
                    <CircleDot className="h-3.5 w-3.5 text-accent" />
                    {item.type === "movie" ? "Film" : "Series"}
                  </span>
                  <span>{item.streamingService}</span>
                  <span className="capitalize">{tracked.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => onToggleStatus(item.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-medium text-accent transition hover:bg-accent/20"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {tracked.status === "watched"
                    ? "Rewatch"
                    : "Mark as watched"}
                </button>
                <button
                  onClick={() => onUntrack(item.id)}
                  className="rounded-full border border-white/10 bg-black/40 px-4 py-2 font-medium text-text-subtle transition hover:border-white/30 hover:text-white"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
