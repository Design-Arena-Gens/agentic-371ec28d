'use client';

import { BellRing, Calendar, Clock } from "lucide-react";
import type { UpcomingEntry } from "@/lib/content-utils";

type UpcomingTimelineProps = {
  entries: UpcomingEntry[];
};

export function UpcomingTimeline({ entries }: UpcomingTimelineProps) {
  if (!entries.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/20 p-8 text-center text-sm text-text-muted">
        <BellRing className="mb-3 h-6 w-6 text-accent" />
        No tracked releases on the horizon yet.
        <span className="mt-1 text-xs text-text-subtle">
          Add shows or films to start receiving release pulse alerts.
        </span>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {entries.map((entry) => (
        <li
          key={`${entry.item.id}-${entry.releaseDate.toISOString()}`}
          className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/30 p-4 text-sm text-text-muted"
        >
          <div>
            <p className="text-sm font-semibold text-white">
              {entry.item.title}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-text-subtle">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-accent" />
                {entry.releaseDate.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-accent" />
                {entry.daysUntil === 0
                  ? "Today"
                  : `${entry.daysUntil} day${entry.daysUntil === 1 ? "" : "s"}`}
              </span>
              <span>{entry.item.streamingService}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-subtle">
            {entry.item.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-white/5 bg-black/40 px-3 py-1"
              >
                {genre}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
