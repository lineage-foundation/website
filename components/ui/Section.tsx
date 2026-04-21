import type { HTMLAttributes, ReactNode } from "react";

import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Heading, type HeadingLevel, type HeadingVariant } from "./Heading";
import styles from "./Section.module.css";

export type SectionProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  eyebrow?: ReactNode;
  heading?: ReactNode;
  headingLevel?: HeadingLevel;
  headingVariant?: HeadingVariant;
  spacing?: "default" | "tight" | "loose";
  containerWidth?: "default" | "wide" | "narrow";
  children: ReactNode;
};

export function Section({
  eyebrow,
  heading,
  headingLevel = 2,
  headingVariant,
  spacing = "default",
  containerWidth = "default",
  className,
  children,
  ...rest
}: SectionProps) {
  const classes = [styles.section];
  if (spacing === "tight") classes.push(styles.sectionTight);
  if (spacing === "loose") classes.push(styles.sectionLoose);
  if (className) classes.push(className);

  const hasHeader = Boolean(eyebrow || heading);

  return (
    <section className={classes.join(" ")} {...rest}>
      <Container width={containerWidth}>
        {hasHeader ? (
          <header className={styles.header}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            {heading ? (
              <Heading level={headingLevel} variant={headingVariant}>
                {heading}
              </Heading>
            ) : null}
          </header>
        ) : null}
        <div className={styles.body}>{children}</div>
      </Container>
    </section>
  );
}
