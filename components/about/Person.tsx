import type { ReactNode } from "react";
import Image from "next/image";

import styles from "./Person.module.css";

export type PersonProps = {
  name: string;
  role: string;
  bio: ReactNode;
  photo?: string; // path relative to public/, e.g. "/team/andrew-kessler.jpg"
  monogram: string; // 2-letter initials fallback
  linkedIn: string;
};

/** LinkedIn icon — inline so no extra import needed */
function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={styles.liIcon}
    >
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.2 8.2h4.56V24H.2zM8.2 8.2h4.37v2.16h.06c.61-1.1 2.1-2.26 4.32-2.26 4.62 0 5.48 3 5.48 6.93V24h-4.56v-6.96c0-1.66-.03-3.8-2.32-3.8-2.32 0-2.68 1.8-2.68 3.68V24H8.2z" />
    </svg>
  );
}

export function Person({ name, role, bio, photo, monogram, linkedIn }: PersonProps) {
  return (
    <article className={styles.person}>
      {/* Avatar: headshot over monogram fallback */}
      <span className={styles.avatar} aria-hidden="true">
        <span className={styles.mono}>{monogram}</span>
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="54px"
            className={styles.photo}
          />
        ) : null}
      </span>

      <h3 className={styles.name}>{name}</h3>
      <span className={styles.roleLabel}>{role}</span>
      <p className={styles.bio}>{bio}</p>

      <a
        className={styles.link}
        href={linkedIn}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInIcon />
        LinkedIn{" "}
        <span aria-hidden="true" className={styles.arrow}>
          &rarr;
        </span>
      </a>
    </article>
  );
}
