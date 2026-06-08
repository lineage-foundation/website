import { Button, Container, Eyebrow, LinkCta } from "@/components/ui";
import { URL_GITHUB_ORG, URL_ZENODO_WHITEPAPER } from "@/lib/constants";

import { LatticeCanvas } from "./LatticeCanvas";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <LatticeCanvas />
      <Container className={styles.content}>
        <Eyebrow className={styles.eyebrow} variant="feature">
          Layer-1 infrastructure
        </Eyebrow>
        <h1 id="hero-heading" className={styles.headline}>
          THE <span className={styles.headlineAccent}>LIVING</span> ECONOMY
        </h1>
        <div className={styles.lead}>
          <p className={styles.leadEmphasis}>
            Lineage is the foundation for adaptive, trust-minimized smart
            markets.
          </p>
          <p className={styles.leadPlain}>
            In plain terms: the fees, incentives, and policy that run a market
            become open programs the network can verify and adapt, instead of
            fixed code no one can change.
          </p>
          <p>A Layer-1 where markets become verifiable programs.</p>
          <p>Miners adapt market policy. Consensus realizes market value.</p>
        </div>
        <div className={styles.actions}>
          <Button
            variant="primary"
            size="md"
            href={URL_ZENODO_WHITEPAPER}
            external
          >
            Read the whitepaper
          </Button>
          <Button variant="secondary" size="md" href="/developers">
            Build with us
          </Button>
          <LinkCta href={URL_GITHUB_ORG} muted external>
            Browse the code on GitHub
          </LinkCta>
        </div>
      </Container>
    </section>
  );
}
