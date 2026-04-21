import { Button, Container, Eyebrow } from "@/components/ui";
import { URL_GITHUB_ORG, URL_ZENODO_WHITEPAPER } from "@/lib/constants";

import { HeroShaderDynamic } from "./HeroShaderDynamic";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.shader} aria-hidden>
        <HeroShaderDynamic />
      </div>
      <Container className={styles.content}>
        <Eyebrow className={styles.eyebrow}>Layer-1 infrastructure</Eyebrow>
        <h1 id="hero-heading" className={styles.headline}>
          THE <span className={styles.headlineAccent}>LIVING</span> ECONOMY
        </h1>
        <div className={styles.lead}>
          <p className={styles.leadEmphasis}>
            Lineage is the foundation for adaptive, trust-minimized smart
            markets.
          </p>
          <p>A Layer-1 where markets become verifiable programs.</p>
          <p>Miners adapt market policy. Consensus unlocks market value.</p>
        </div>
        <div className={styles.actions}>
          <Button
            variant="primary"
            size="md"
            href={URL_ZENODO_WHITEPAPER}
            external
          >
            Read the Whitepaper
          </Button>
          <Button
            variant="secondary"
            size="md"
            href={URL_GITHUB_ORG}
            external
          >
            Build With Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
