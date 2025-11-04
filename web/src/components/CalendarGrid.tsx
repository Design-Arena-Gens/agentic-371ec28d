'use client';

import { CalendarDays } from "lucide-react";
import type { CalendarSlot } from "@/lib/content-utils";

type CalendarGridProps = {
  slots: CalendarSlot[];
};

export function CalendarGrid({ slots }: CalendarGridProps) {
  if (!slots.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
      {slots.map((slot) => {
        const isToday =
          slot.date.toDateString() === new Date().toDateString();
        return (
          <div
            key={slot.formatted}
            className={`flex min-h-[120px] flex-col rounded-2xl border border-white/5 bg-black/30 p-3 text-xs text-text-muted transition ${
              slot.entries.length
                ? "hover:border-accent/40 hover:bg-black/20"
                : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <p
                className={`font-medium text-white ${
                  isToday ? "text-accent" : ""
                }`}
              >
                {slot.formatted}
              </p>
              {isToday && (
                <CalendarDays className="h-4 w-4 text-accent" aria-hidden />
              )}
            </div>
            <div className="mt-2 space-y-2">
              {slot.entries.map((entry) => (
                <div
                  key={entry.item.id}
                  className="rounded-xl border border-accent/30 bg-accent/10 px-2 py-1 text-[0.68rem] font-medium text-accent"
                >
                  {entry.item.title}
                </div>
              ))}
              {!slot.entries.length && (
                <span className="inline-block rounded-xl border border-white/5 bg-black/40 px-2 py-1 text-[0.6rem] uppercase tracking-wide text-text-subtle">
                  Free night
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
