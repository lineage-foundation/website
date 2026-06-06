"use client";

import styles from "./Segmented.module.css";

export type SegmentedOption = { value: string; label: string };

export function Segmented({
  options,
  value,
  onChange,
  idPrefix,
  ariaLabel,
}: {
  options: readonly SegmentedOption[];
  value: string;
  onChange: (v: string) => void;
  /** When provided, each tab button receives id=`${idPrefix}-${option.value}`. */
  idPrefix?: string;
  /** Applied as aria-label on the tablist container. */
  ariaLabel?: string;
}) {
  return (
    <div className={styles.segmented} role="tablist" aria-label={ariaLabel}>
      {options.map((o) => (
        <button
          key={o.value}
          id={idPrefix ? `${idPrefix}-${o.value}` : undefined}
          role="tab"
          aria-selected={o.value === value}
          className={o.value === value ? styles.active : styles.seg}
          onClick={() => onChange(o.value)}
          type="button"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
