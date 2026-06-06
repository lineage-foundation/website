import styles from "./Segmented.module.css";

export type SegmentedOption = { value: string; label: string };

export function Segmented({ options, value, onChange }: {
  options: SegmentedOption[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className={styles.segmented} role="tablist">
      {options.map((o) => (
        <button
          key={o.value}
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
