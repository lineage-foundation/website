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
  /** Dim + grayscale the card, show a "Coming soon" badge, hide the link. */
  comingSoon?: boolean;
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

export function Person({
  name,
  role,
  bio,
  photo,
  monogram,
  linkedIn,
  comingSoon,
}: PersonProps) {
  return (
    <article
      className={`${styles.person} ${comingSoon ? styles.comingSoon : ""}`}
    >
      {/* Avatar: headshot over monogram fallback. Only the monogram is
          aria-hidden; the photo keeps its alt so SR users get the name. */}
      <span className={styles.avatar}>
        <span className={styles.mono} aria-hidden="true">
          {monogram}
        </span>
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
      {comingSoon ? (
        <span className={styles.comingSoonTag}>Coming soon</span>
      ) : null}
      <p className={styles.bio}>{bio}</p>

      {comingSoon ? null : (
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
      )}
    </article>
  );
}
