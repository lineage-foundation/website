import type { ReactNode } from "react";

export type PortedDocPage = {
  /** Sitemap and meta description. */
  description: string;
  /**
   * Optional display title. Defaults to `titleFromSegments` in the catch-all when
   * omitted.
   */
  title?: string;
  /** Main article (single H1 is provided by DocsArticle; use h2+ inside). */
  children: ReactNode;
};
