"use client";

import { useEffect, useState } from "react";

import styles from "./Cooldown.module.css";

export function formatRemaining(ms: number): string {
  if (ms <= 0) return "ready";
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function Cooldown({ until, onElapsed }: { until: number; onElapsed?: () => void }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (until <= now) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [until, now]);
  useEffect(() => {
    if (until <= now) onElapsed?.();
  }, [until, now, onElapsed]);
  return <span className={styles.cooldown}>{formatRemaining(until - now)}</span>;
}
