"use client";

import { useEffect, useRef } from "react";

import styles from "./LatticeCanvas.module.css";

type Cell = { x: number; y: number; ph: number; s: number };
type Wave = { x: number; y: number; age: number; speed: number };

export function LatticeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, cells: Cell[] = [], waves: Wave[] = [], t = 0;
    let raf = 0, last = 0, spawnAt = 0, diag = 1, resizeTimer = 0;

    function build() {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      diag = Math.hypot(W, H) + 160;
      cells = [];
      const gap = Math.max(58, Math.min(88, Math.round(W / 15)));
      const cols = Math.ceil(W / gap) + 2, rows = Math.ceil(H / gap) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const off = r % 2 ? gap * 0.5 : 0;
          cells.push({ x: c * gap + off - gap, y: r * gap - gap, ph: Math.random() * 6.28, s: 0.82 + Math.random() * 0.3 });
        }
      }
      waves = [];
    }

    function spawnWave() {
      waves.push({ x: Math.random() * W, y: Math.random() * H, age: 0, speed: 88 + Math.random() * 46 });
    }

    function render(dt: number) {
      t += dt;
      ctx.clearRect(0, 0, W, H);
      for (let w = waves.length - 1; w >= 0; w--) {
        waves[w].age += dt;
        if (waves[w].age * waves[w].speed > diag) waves.splice(w, 1);
      }
      ctx.lineCap = "round"; ctx.lineWidth = 1.4;
      for (const C of cells) {
        let lit = 0;
        for (const Wv of waves) {
          const dist = Math.hypot(C.x - Wv.x, C.y - Wv.y) - Wv.age * Wv.speed;
          if (dist < 60 && dist > -60) {
            const g = Math.exp(-(dist * dist) / (2 * 23 * 23));
            lit += g * Math.max(0, 1 - (Wv.age * Wv.speed) / diag);
          }
        }
        if (lit > 1) lit = 1;
        const tw = 0.5 + 0.5 * Math.sin(t * 1.4 + C.ph);
        const a = 0.05 + 0.035 * tw + lit * 0.5;
        const hs = 7 * C.s * (1 + lit * 0.14), gp = hs * 0.26;
        if (lit > 0.14) {
          const bl = ctx.createRadialGradient(C.x, C.y, 0, C.x, C.y, hs * 3);
          bl.addColorStop(0, `oklch(84% 0.15 165 / ${(0.18 * lit).toFixed(3)})`);
          bl.addColorStop(1, "oklch(84% 0.15 165 / 0)");
          ctx.fillStyle = bl; ctx.beginPath(); ctx.arc(C.x, C.y, hs * 3, 0, Math.PI * 2); ctx.fill();
        }
        ctx.strokeStyle = `oklch(78% 0.12 218 / ${(a * 0.9).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(C.x - hs, C.y - hs); ctx.lineTo(C.x - gp, C.y - gp);
        ctx.moveTo(C.x + gp, C.y + gp); ctx.lineTo(C.x + hs, C.y + hs);
        ctx.stroke();
        ctx.strokeStyle = `oklch(82% 0.16 165 / ${Math.min(1, a * 0.9 + lit * 0.45).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(C.x + hs, C.y - hs); ctx.lineTo(C.x + gp, C.y - gp);
        ctx.moveTo(C.x - gp, C.y + gp); ctx.lineTo(C.x - hs, C.y + hs);
        ctx.stroke();
      }
    }

    function frame(ts: number) {
      const dt = Math.min(((ts - last) || 16) / 1000, 0.05); last = ts;
      spawnAt -= dt;
      if (spawnAt <= 0 && waves.length < 4) { spawnWave(); spawnAt = 1.5 + Math.random() * 1.9; }
      render(dt);
      raf = requestAnimationFrame(frame);
    }

    function staticFrame() {
      waves = [
        { x: W * 0.30, y: H * 0.40, age: 1.1, speed: 120 },
        { x: W * 0.72, y: H * 0.62, age: 1.8, speed: 120 },
      ];
      render(0);
    }

    function start() {
      build();
      if (reduce) { staticFrame(); return; }
      cancelAnimationFrame(raf); last = 0; spawnAt = 0.5; raf = requestAnimationFrame(frame);
    }

    function onResize() { window.clearTimeout(resizeTimer); resizeTimer = window.setTimeout(start, 180); }
    function onVisibility() {
      if (reduce) return;
      if (document.hidden) cancelAnimationFrame(raf);
      else { last = 0; raf = requestAnimationFrame(frame); }
    }

    start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden />;
}
