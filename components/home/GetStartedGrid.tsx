import type { ReactNode } from "react";

import { LinkCta } from "@/components/ui";
import {
  URL_GITHUB_ORG,
  URL_PEERSTONE,
  URL_SE3KER,
} from "@/lib/constants";

import styles from "./GetStartedGrid.module.css";

type TileLink = {
  label: ReactNode;
  href: string;
  external?: boolean;
};

type Tile = {
  title: string;
  body: ReactNode;
  links?: readonly TileLink[];
  placeholder?: boolean;
};

/**
 * Order puts tiles with working destinations first (GitHub, Tokenomics,
 * Pick a wallet) and placeholders after, per PRD §6.2 / task 3.6.
 */
const TILES: readonly Tile[] = [
  {
    title: "GitHub",
    body: "Every repository is open for review, issues, and contributions.",
    links: [{ label: "Lineage Foundation on GitHub", href: URL_GITHUB_ORG, external: true }],
  },
  {
    title: "Tokenomics",
    body: "Explore FIAT Replacement Technology (FReT) and the LNGX economic model.",
    links: [{ label: "Open tokenomics", href: "/tokenomics" }],
  },
  {
    title: "Pick a wallet",
    body: "Community-built wallets already supporting Lineage.",
    links: [
      { label: "Se3ker", href: URL_SE3KER, external: true },
      { label: "Peerstone", href: URL_PEERSTONE, external: true },
    ],
  },
  {
    title: "Get LNGX",
    body: "Acquire the Lineage unit of value.",
    placeholder: true,
  },
  {
    title: "Start building",
    body: "Developer docs and tooling.",
    placeholder: true,
  },
  {
    title: "Try apps",
    body: "Explore smart markets in action.",
    placeholder: true,
  },
];

export function GetStartedGrid() {
  return (
    <ul className={styles.grid} role="list">
      {TILES.map((tile) => (
        <li
          key={tile.title}
          className={[styles.tile, tile.placeholder ? styles.placeholder : ""]
            .filter(Boolean)
            .join(" ")}
        >
          <h3 className={styles.title}>{tile.title}</h3>
          <p className={styles.body}>{tile.body}</p>
          {tile.placeholder ? (
            <span className={styles.placeholderTag}>Coming soon</span>
          ) : tile.links && tile.links.length > 0 ? (
            <ul className={styles.links} role="list">
              {tile.links.map((link, i) => (
                <li key={i}>
                  <LinkCta href={link.href} external={link.external}>
                    {link.label}
                  </LinkCta>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
