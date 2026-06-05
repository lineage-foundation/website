# Lineage — Brand Mark

> The **Clearing Cross**. Two tapered blades crossing — cyan over emerald — meeting at an open centre.
> *Two sides meet, and the price is the light between them: verifiable, emergent, owned by no one.*

The mark is rooted in **markets / adaptive flow** — a market clearing where supply meets demand — not generic blockchain infrastructure.

## Files

| File | Use |
| --- | --- |
| `assets/lineage-mark.svg` | Primary mark — open centre, radial-gradient blades, transparent ground. Use ≥ 24 px. |
| `assets/lineage-icon.svg` | Plated app icon — mark on a dark rounded-square (180 px master for app stores / 180 px touch icon). |
| `assets/lineage-icon-min.svg` | 16 px-minimum glyph — converged centre, flat colours, transparent. |
| `assets/favicon.svg` | Browser favicon — converged glyph on a rounded dark tile, hex colours for tab-render compatibility. |
| `assets/lineage-mark-mono.svg` | Single-colour knockout (`currentColor`) for one-colour print / etch / watermark contexts. |

## Construction rule (non-negotiable)

A node is only refined when it **belongs to the geometry**. Never composite a mark as `stroked line + filled circle on top` — two primitives, two optical weights, a visible seam where they meet (the "plopped dot"). The Clearing Cross obeys this: it is **filled geometry only**, so the mass at the crossing is intrinsic to the tapering blades. There is no stroke-vs-fill seam anywhere.

## Colour grammar (inherited from the design system)

The mark reuses the system's two accents honestly — it does not invent symbolism, it inherits it.

- **Cyan blade = interaction / circuitry.** The incoming side — orders, signals, participants arriving. (`--color-link`, `oklch(78% 0.12 218)`)
- **Emerald blade = action / life.** The settling side — value committed, the market alive and adapting. (`--color-accent`, `oklch(82% 0.16 165)`)
- Each blade **brightens toward the centre** (radial gradient): the cleared price reads as light emanating *from* the meeting, not a disc stuck *on* it.

## The open centre

The negative space at the crossing is the most on-message part of the mark. A solid node would say *"here is the point, placed by an authority."* The void says the opposite: the cleared price is not imposed — it **emerges** from the two sides meeting. For a **trust-minimized** protocol, the centre is empty because nobody owns it. The eye completes the point; the market completes the price.

**Exception — small sizes.** Below ~20 px the open centre reads as an accidental gap, so the favicon / 16 px glyph uses a **converged centre** (blades meet solid). Open centre at display sizes; converged at favicon sizes.

## Meaning, in one line

> Two forces meet and resolve — supply and demand, signal and settlement. A crossing is also where two lines of descent meet: *Lineage* is convergence over time; the mark is convergence in space.

## Usage cautions

An X also reads generically as *close / cancel / multiply*. Defuse it by:
- Pairing the glyph with the **"Lineage" wordmark** (Space Grotesk 600, −0.02em) in primary use.
- Leaning on the **emerald/cyan duotone** — a close-button is never two-toned.
- Keeping the **taper** distinctive so it never flattens into a UI glyph.

Glow (`--glow-accent`) is reserved for one focal placement (hero lockup); the nav and favicon stay flat.
