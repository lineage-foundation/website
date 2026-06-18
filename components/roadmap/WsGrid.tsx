import type { ReactNode } from "react";

import styles from "./WsGrid.module.css";

export type WsItem = {
  heading: ReactNode;
  body: ReactNode;
};

type WsGridProps = {
  items: WsItem[];
};

export function WsGrid({ items }: WsGridProps) {
  return (
    <div className={styles.wsGrid}>
      {items.map((item, i) => (
        <div key={i} className={styles.ws}>
          <h4>{item.heading}</h4>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}
