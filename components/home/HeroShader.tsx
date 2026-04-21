"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./HeroShader.module.css";

type Point = { x: number; y: number; vx: number; vy: number };

const ACCENT_RGB = "239, 253, 92";
const DENSITY = 0.00009;
const MIN_POINTS = 36;
const MAX_POINTS = 120;
const MAX_LINK_DISTANCE = 140;

/**
 * Restrained procedural "policy space" visual — drifting points with
 * short connecting lines. No text, no imagery, no marketing. Honors
 * prefers-reduced-motion by rendering a single static frame.
 *
 * Loaded lazily from HeroShaderDynamic (ssr: false) so the canvas work
 * is off the critical path.
 */
export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let rafId: number | null = null;
    let points: Point[] = [];

    const reseed = () => {
      const count = Math.max(
        MIN_POINTS,
        Math.min(MAX_POINTS, Math.round(width * height * DENSITY)),
      );
      points = new Array<Point>(count);
      for (let i = 0; i < count; i++) {
        points[i] = {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
        };
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      reseed();
    };

    resize();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (!reducedMotion) {
        for (const p of points) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const maxD2 = MAX_LINK_DISTANCE * MAX_LINK_DISTANCE;
          if (d2 < maxD2) {
            const t = 1 - Math.sqrt(d2) / MAX_LINK_DISTANCE;
            ctx.strokeStyle = `rgba(${ACCENT_RGB}, ${(t * 0.18).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = `rgba(${ACCENT_RGB}, 0.7)`;
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!reducedMotion && rafId === null) {
        rafId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    draw();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden />;
}
