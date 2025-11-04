'use client';

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type TrackedStatus = "watching" | "watched";

export type TrackedContent = {
  id: string;
  status: TrackedStatus;
  addedAt: string;
  updatedAt: string;
};

const STORAGE_KEY = "fluxwatch.tracked";

export function useTrackedContent() {
  const [tracked, setTracked] = useLocalStorage<TrackedContent[]>(
    STORAGE_KEY,
    []
  );

  const track = useCallback(
    (id: string) => {
      setTracked((prev) => {
        if (prev.some((item) => item.id === id)) {
          return prev;
        }
        const timestamp = new Date().toISOString();
        return [
          ...prev,
          {
            id,
            status: "watching",
            addedAt: timestamp,
            updatedAt: timestamp,
          },
        ];
      });
    },
    [setTracked]
  );

  const untrack = useCallback(
    (id: string) => {
      setTracked((prev) => prev.filter((item) => item.id !== id));
    },
    [setTracked]
  );

  const setStatus = useCallback(
    (id: string, status: TrackedStatus) => {
      setTracked((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status, updatedAt: new Date().toISOString() }
            : item
        )
      );
    },
    [setTracked]
  );

  const toggleStatus = useCallback(
    (id: string) => {
      setTracked((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: item.status === "watched" ? "watching" : "watched",
                updatedAt: new Date().toISOString(),
              }
            : item
        )
      );
    },
    [setTracked]
  );

  const stats = useMemo(() => {
    const watched = tracked.filter((item) => item.status === "watched");
    const watching = tracked.filter((item) => item.status === "watching");
    return {
      total: tracked.length,
      watched: watched.length,
      watching: watching.length,
      watchedIds: new Set(watched.map((item) => item.id)),
      watchingIds: new Set(watching.map((item) => item.id)),
      trackedIds: new Set(tracked.map((item) => item.id)),
    };
  }, [tracked]);

  return {
    tracked,
    stats,
    track,
    untrack,
    setStatus,
    toggleStatus,
  };
}
