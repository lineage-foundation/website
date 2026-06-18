import styles from "./Input.module.css";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  mono?: boolean;
  prefix?: string;
  /** Danger border for the field-error state (prototype .field.is-invalid .input). */
  invalid?: boolean;
};

export function Input({ mono, prefix, invalid, className, ...rest }: InputProps) {
  const classes = [styles.input, mono ? styles.mono : "", invalid ? styles.invalid : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  const input = (
    <input className={classes} aria-invalid={invalid || undefined} {...rest} />
  );
  if (!prefix) return input;
  return (
    <div className={styles.prefixRow}>
      <span className={styles.prefix}>{prefix}</span>
      {input}
    </div>
  );
}
