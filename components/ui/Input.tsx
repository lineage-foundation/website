import styles from "./Input.module.css";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { mono?: boolean; prefix?: string };

export function Input({ mono, prefix, className, ...rest }: InputProps) {
  const input = <input className={`${styles.input} ${mono ? styles.mono : ""} ${className ?? ""}`} {...rest} />;
  if (!prefix) return input;
  return (
    <div className={styles.prefixRow}>
      <span className={styles.prefix}>{prefix}</span>
      {input}
    </div>
  );
}
