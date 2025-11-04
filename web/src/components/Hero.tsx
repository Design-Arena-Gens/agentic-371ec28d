'use client';

import { Flame, Sparkles, Zap } from "lucide-react";

export function Hero() {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-white/5 bg-panel/80 p-6 sm:p-10">
      <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative flex flex-col gap-6 text-white">
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          <Flame className="h-3.5 w-3.5" />
          FluxWatch Beta
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Curate your universe of shows & films with cinematic clarity.
          </h1>
          <p className="max-w-xl text-sm text-text-muted sm:text-base">
            Track every season drop, discover fresh obsessions, and map your
            upcoming watch nights in a minimalist hub inspired by your favorite
            streamer dark themes.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-text-muted">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2">
            <Zap className="h-3.5 w-3.5 text-accent" />
            Smart suggestions
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Release pulse alerts
          </span>
        </div>
      </div>
    </header>
  );
}
