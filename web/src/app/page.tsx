'use client';

import { useCallback, useMemo } from "react";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { ContentCard } from "@/components/ContentCard";
import { HighlightBar } from "@/components/HighlightBar";
import { TrackedShelf } from "@/components/TrackedShelf";
import { UpcomingTimeline } from "@/components/UpcomingTimeline";
import { CalendarGrid } from "@/components/CalendarGrid";
import { catalog } from "@/data/content";
import { useTrackedContent } from "@/hooks/useTrackedContent";
import {
  buildCalendar,
  buildHighlights,
  buildSuggestions,
  contentById,
  getUpcomingReleases,
} from "@/lib/content-utils";

export default function HomePage() {
  const { tracked, stats, track, untrack, toggleStatus } = useTrackedContent();

  const trackedItems = useMemo(
    () =>
      tracked
        .map((entry) => {
          const item = contentById.get(entry.id);
          if (!item) return null;
          return { item, tracked: entry };
        })
        .filter(Boolean) as { item: (typeof catalog)[number]; tracked: typeof tracked[number] }[],
    [tracked]
  );

  const watchingShelf = useMemo(
    () =>
      trackedItems.filter(({ tracked: entry }) => entry.status === "watching"),
    [trackedItems]
  );
  const watchedShelf = useMemo(
    () =>
      trackedItems.filter(({ tracked: entry }) => entry.status === "watched"),
    [trackedItems]
  );

  const suggestions = useMemo(
    () => buildSuggestions(tracked, 6),
    [tracked]
  );
  const upcoming = useMemo(
    () => getUpcomingReleases(tracked, 60),
    [tracked]
  );
  const calendar = useMemo(() => buildCalendar(tracked, 28), [tracked]);
  const highlights = useMemo(() => buildHighlights(tracked), [tracked]);

  const upcomingHighlights = useMemo(() => {
    const map = new Map<string, string>();
    upcoming.forEach((entry) => {
      if (entry.daysUntil <= 0) {
        map.set(entry.item.id, "Now Streaming");
      } else if (entry.daysUntil <= 7) {
        map.set(entry.item.id, "This Week");
      } else if (entry.daysUntil <= 21) {
        map.set(entry.item.id, "Soon");
      }
    });
    return map;
  }, [upcoming]);

  const handleTrack = useCallback(
    (id: string) => {
      track(id);
    },
    [track]
  );

  const handleUntrack = useCallback(
    (id: string) => {
      untrack(id);
    },
    [untrack]
  );

  const handleToggleStatus = useCallback(
    (id: string) => {
      toggleStatus(id);
    },
    [toggleStatus]
  );

  return (
    <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-5 py-8 sm:py-12">
      <Hero />

      <Section title="Your Activity Pulse">
        <HighlightBar highlights={highlights} />
      </Section>

      <Section
        id="watching"
        title="Watch Queue & History"
        description="Snapshot of what you're tracking right now, so you never lose momentum."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <TrackedShelf
            title="Watching now"
            items={watchingShelf}
            emptyCopy="Add a show or movie to start tracking your next binge."
            onToggleStatus={handleToggleStatus}
            onUntrack={handleUntrack}
          />
          <TrackedShelf
            title="Recently finished"
            items={watchedShelf}
            emptyCopy="Finish something lately? Mark it watched to log your streak."
            onToggleStatus={handleToggleStatus}
            onUntrack={handleUntrack}
          />
        </div>
      </Section>

      <Section
        title="Suggestions dialed for you"
        description="Handpicked picks based on your blend of genres, vibes, and what’s landing soon."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {suggestions.map((suggestion) => (
            <ContentCard
              key={suggestion.item.id}
              item={suggestion.item}
              isTracked={stats.trackedIds.has(suggestion.item.id)}
              status={
                stats.watchedIds.has(suggestion.item.id)
                  ? "watched"
                  : stats.watchingIds.has(suggestion.item.id)
                  ? "watching"
                  : undefined
              }
              onTrack={() => handleTrack(suggestion.item.id)}
              onUntrack={() => handleUntrack(suggestion.item.id)}
              onToggleStatus={() => handleToggleStatus(suggestion.item.id)}
              reasons={suggestion.reasons}
              highlight={upcomingHighlights.get(suggestion.item.id)}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Release pulse alerts"
        description="Working like a radar—see the next drops for the shows and films you follow."
      >
        <UpcomingTimeline entries={upcoming} />
      </Section>

      <Section
        title="Upcoming calendar"
        description="Plan your watch nights with a horizon view of the next four weeks."
      >
        <CalendarGrid slots={calendar} />
      </Section>

      <Section
        title="Browse the cinematic slate"
        description="Curated catalog to expand your world. Tap track to add it to your queue."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {catalog.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              isTracked={stats.trackedIds.has(item.id)}
              status={
                stats.watchedIds.has(item.id)
                  ? "watched"
                  : stats.watchingIds.has(item.id)
                  ? "watching"
                  : undefined
              }
              onTrack={() => handleTrack(item.id)}
              onUntrack={() => handleUntrack(item.id)}
              onToggleStatus={() => handleToggleStatus(item.id)}
              highlight={upcomingHighlights.get(item.id)}
            />
          ))}
        </div>
      </Section>

      <footer className="pb-8 pt-4 text-center text-xs text-text-subtle">
        Made for streamers who love clean dark rooms and orange neon glow.
      </footer>
    </main>
  );
}
