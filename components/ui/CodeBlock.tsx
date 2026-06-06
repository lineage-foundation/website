"use client";

import { useCallback, useRef, useState } from "react";

import styles from "./CodeBlock.module.css";

export function CodeBlock({ lang = "code", children }: { lang?: string; children: React.ReactNode }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    const text = preRef.current?.innerText ?? "";
    const done = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
      done();
    }
  }, []);

  return (
    <div className={styles.block}>
      <div className={styles.bar}>
        <span className={styles.lang}>{lang}</span>
        <button
          type="button"
          className={`${styles.copy} ${copied ? styles.copyDone : ""}`}
          aria-label="Copy code to clipboard"
          onClick={copy}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre ref={preRef} className={styles.code}>{children}</pre>
    </div>
  );
}
