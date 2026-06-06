import type { ReactNode } from "react";

import styles from "./Tiers.module.css";

export type TierItem = {
  label: ReactNode;
  value: string;
};

export type TiersProps = {
  items: TierItem[];
  activeValue?: string;
  onSelect?: (value: string) => void;
};

/**
 * Amount-tier selector grid.
 * Ported from design-prototype .tiers/.tier (lineage.css lines 699-703).
 */
export function Tiers({ items, activeValue, onSelect }: TiersProps) {
  return (
    <div className={styles.tiers}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          className={
            item.value === activeValue
              ? `${styles.tier} ${styles.tierActive}`
              : styles.tier
          }
          aria-pressed={item.value === activeValue}
          onClick={() => onSelect?.(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
