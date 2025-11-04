'use client';

import { memo, useMemo } from "react";
import { BookmarkPlus, Check, Play, Sparkles, Tv } from "lucide-react";
import type { ContentItem } from "@/data/content";
import type { TrackedStatus } from "@/hooks/useTrackedContent";

type ContentCardProps = {
  item: ContentItem;
  isTracked: boolean;
  status?: TrackedStatus;
  onTrack: () => void;
  onUntrack: () => void;
  onToggleStatus: () => void;
  reasons?: string[];
  highlight?: string;
};

const gradientLookup: Record<string, string> = {
  "sci-fi":
    "linear-gradient(135deg, rgba(255,107,53,0.22), rgba(46,62,129,0.35))",
  thriller: "linear-gradient(135deg, rgba(255,107,53,0.18), rgba(92,27,76,0.4))",
  drama: "linear-gradient(135deg, rgba(255,107,53,0.2), rgba(24,24,24,0.6))",
  romance:
    "linear-gradient(135deg, rgba(255,113,66,0.22), rgba(221,38,110,0.35))",
  fantasy:
    "linear-gradient(135deg, rgba(255,107,53,0.2), rgba(45,86,122,0.4))",
  adventure:
    "linear-gradient(135deg, rgba(255,107,53,0.2), rgba(26,143,130,0.35))",
  mystery:
    "linear-gradient(135deg, rgba(255,107,53,0.2), rgba(78,38,130,0.35))",
  documentary:
    "linear-gradient(135deg, rgba(255,107,53,0.2), rgba(48,87,74,0.35))",
  comedy: "linear-gradient(135deg, rgba(255,107,53,0.22), rgba(111,44,0,0.36))",
  animation:
    "linear-gradient(135deg, rgba(255,143,53,0.22), rgba(69,30,145,0.4))",
  noir: "linear-gradient(135deg, rgba(255,107,53,0.18), rgba(0,0,0,0.65))",
};

function buildCardGradient(genres: string[]) {
  const primary = genres[0];
  if (primary && gradientLookup[primary]) {
    return gradientLookup[primary];
  }
  return "linear-gradient(135deg, rgba(255,107,53,0.18), rgba(8,8,8,0.9))";
}

function StatusBadge({ status }: { status?: TrackedStatus }) {
  if (!status) return null;

  const copy = status === "watched" ? "Watched" : "Watching";
  return (
    <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-text-muted backdrop-blur">
      <Tv className="h-3.5 w-3.5 text-accent" />
      {copy}
    </span>
  );
}

function PrimaryAction({
  isTracked,
  status,
  onTrack,
  onToggleStatus,
}: Pick<
  ContentCardProps,
  "isTracked" | "status" | "onTrack" | "onToggleStatus"
>) {
  if (!isTracked) {
    return (
      <button
        onClick={onTrack}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-black transition hover:bg-accentMuted"
      >
        <BookmarkPlus className="h-4 w-4" />
        Track
      </button>
    );
  }

  return (
    <button
      onClick={onToggleStatus}
      className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/20"
    >
      <Check className="h-4 w-4" />
      {status === "watched" ? "Mark Watching" : "Mark Watched"}
    </button>
  );
}

const ContentCardComponent = ({
  item,
  isTracked,
  status,
  onTrack,
  onUntrack,
  onToggleStatus,
  reasons,
  highlight,
}: ContentCardProps) => {
  const gradient = useMemo(
    () => buildCardGradient(item.genres),
    [item.genres]
  );
  const releaseLabel = useMemo(() => {
    if (item.nextReleaseDate) {
      return `Next: ${new Date(item.nextReleaseDate).toLocaleDateString()}`;
    }
    return `Released: ${new Date(item.releaseDate).toLocaleDateString()}`;
  }, [item.nextReleaseDate, item.releaseDate]);

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-panel/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow"
      style={{ backgroundImage: gradient }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-text-muted">
            <span className="rounded-full bg-black/50 px-2 py-1 backdrop-blur">
              {item.type === "movie" ? "Film" : "Series"}
            </span>
            <span className="hidden min-[420px]:inline-flex">
              {item.streamingService}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-white sm:text-2xl">
            {item.title}
          </h3>
        </div>
        <StatusBadge status={status} />
      </div>

      <p className="mt-4 text-sm text-text-muted">{item.overview}</p>

      <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-text-muted">
        {item.genres.map((genre) => (
          <span
            key={genre}
            className="rounded-full border border-white/5 bg-black/30 px-3 py-1"
          >
            {genre}
          </span>
        ))}
      </div>

      {reasons && (
        <div className="mt-6 flex flex-col gap-2 text-xs text-text-muted">
          {reasons.map((reason) => (
            <div
              key={reason}
              className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-black/30 px-3 py-2 text-[0.7rem] uppercase tracking-wide text-text-subtle"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              {reason}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <div className="flex items-center gap-1.5">
            <Play className="h-3.5 w-3.5 text-accent" />
            {releaseLabel}
          </div>
          <div className="hidden md:inline-flex">
            {item.runtimeMinutes
              ? `${item.runtimeMinutes} min`
              : `${item.seasons ?? 1} season${(item.seasons ?? 1) > 1 ? "s" : ""}`}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PrimaryAction
            isTracked={isTracked}
            status={status}
            onTrack={onTrack}
            onToggleStatus={onToggleStatus}
          />
          {isTracked && (
            <button
              onClick={onUntrack}
              className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-text-muted transition hover:border-white/30 hover:text-white"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {highlight && (
        <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
          {highlight}
        </div>
      )}
    </article>
  );
};

export const ContentCard = memo(ContentCardComponent);
