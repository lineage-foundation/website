"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./Cooldown.module.css";

export function formatRemaining(ms: number): string {
  if (ms <= 0) return "ready";
  const total = Math.ceil(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  // Match the prototype's HH:MM:SS for hour-scale cooldowns (e.g. the 24h faucet),
  // and fall back to M:SS for short ones.
  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
}

export function Cooldown({ until, onElapsed }: { until: number; onElapsed?: () => void }) {
  const [now, setNow] = useState(() => Date.now());
  // Register one interval per `until`; the functional update avoids reading
  // `now`, so the interval is not torn down and recreated every tick.
  useEffect(() => {
    if (until <= Date.now()) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [until]);
  // Fire onElapsed exactly once per cooldown; re-arm when `until` changes.
  const fired = useRef(false);
  useEffect(() => {
    fired.current = false;
  }, [until]);
  useEffect(() => {
    if (until <= now && !fired.current) {
      fired.current = true;
      onElapsed?.();
    }
  }, [until, now, onElapsed]);
  return <span className={styles.cooldown}>{formatRemaining(until - now)}</span>;
}
