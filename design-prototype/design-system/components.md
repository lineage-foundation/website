# Lineage — Component Reference

Every class below is **defined in `css/lineage.css`** (the shared stylesheet, 748 lines) and behaves identically on every page. To build a new page: link `css/lineage.css` + `js/lineage.js`, paste the shared chrome from `partials/_chrome.html`, then compose with these classes. **Don't redefine these inline** — extend the shared stylesheet so every page benefits.

> Naming is loose BEM: `.block`, `.block__element`, `.block--modifier`.

---

## Layout & page scaffold
| Class | Role |
|---|---|
| `.container` / `.container--narrow` / `.container--docs` | 1200px / 840px / full-bleed width wrappers |
| `.section` / `.section--band` / `.section--tight` | Vertical section rhythm; `--band` = darker gradient strip with strong rules |
| `.section-head` / `.section-title` / `.section-prose` | Section header block with optional accent→link rail |
| `.split` | Asymmetric two-column (e.g. 70/30) layout |
| `.grid` / `.grid--2` / `.grid--4` / `.grid--moat` | Card grids (base 3-col; `--moat` is the balanced 3+2 five-card grid) |

## Navigation chrome (shared, in `partials/_chrome.html`)
| Class | Role |
|---|---|
| `.site-header` / `.nav` / `.brand` / `.nav-right` / `.tabs` | Sticky frosted header, logo lockup, nav tabs |
| `.nav-group` / `.nav-group-trigger` / `.nav-menu` | **Developers dropdown** (Overview · Docs · Roadmap) — desktop hover/click + mobile disclosure. JS in `lineage.js` auto-marks the active parent. |
| `.menu-btn` / `.backdrop` | Mobile menu toggle + scrim (collapses ≤1024px) |
| `.site-footer` / `.footer-cols` / `.footer-col` / `.footer-meta` | Footer sitemap + meta row |
| `.skip-link` | Accessibility skip-to-content |

## Hero
| Class | Role |
|---|---|
| `.hero` / `.hero-inner` / `.hero-content` | Full-bleed hero with radial-masked canvas (`#lattice`) behind |
| `.headline` / `.hero-plain` / `.lead` / `.hero-actions` | Display headline, plain-language line, lede, CTA row |

## Buttons & links
| Class | Role |
|---|---|
| `.btn` + `.btn--primary` / `--secondary` / `--ghost` / `--sm` | `--r-md` corners (never pills). Primary = emerald fill + ring + glow; secondary hover → cyan border; all depress 1px on `:active` |
| `.link-cta` / `.link-cta--muted` | Cyan link with under-rule + arrow that slides 2px on hover |
| `.center-cta` | Centered CTA block |

## Eyebrow, cards, content
| Class | Role |
|---|---|
| `.eyebrow` / `.eyebrow--feature` | Mono uppercase kicker; `--feature` = cyan pill chip with glow |
| `.card` / `.card--rail` | Surface + hairline + `--r-md`; `--rail` adds a 3px accent→link gradient top-rule + hover lift |
| `.prose` | Long-form body wrapper (caps measure, styles inline `<code>`) |
| `.quote` / `.quote-row` | Pull-quote |
| `.stat` / `.signal` | Metric / status display blocks |
| `.note` / `.aside-card` / `.sim-note` | Sidebar notes, captions |

## Forms (get-tokens, faucet, inputs)
| Class | Role |
|---|---|
| `.field` / `.field-row` / `.field-label` / `.field-hint` / `.field-error` | Form field scaffold |
| `.input` / `.input--mono` / `.input-prefix` | Raised surface, hairline, `--r-md`; focus → cyan border + 3px glow ring; `--mono` for addresses/amounts |
| `.segmented` | Segmented toggle (Buy / Faucet) |
| `.statusbar` + `--ok` / `--warn` / `--err` / `--info` | Inline status banner with tinted background |
| `.cooldown` | Live countdown display (faucet) |

## Status pills & tags
| Class | Role |
|---|---|
| `.pill` + `.pill--get` / `--post` / `--soon` | HTTP-method + "coming soon" pills |
| `.tag-live` / `.tag-soon` | Published (success-tinted) / forthcoming labels |
| `.agent-note` | Programmatic/agent callout |

## Data & docs
| Class | Role |
|---|---|
| `.table` / `.table-wrap` | Dense hairline tables (wrap prevents mobile overflow) |
| `.code` / `.code-block` / `.code-copy` | Code blocks with chrome + copy button (wired site-wide in `lineage.js`) |
| `.endpoint` / `.api-host` | API endpoint cards with host + method |
| `.docs` / `.docs-nav` / `.docs-main` / `.docs-toc` | Docs shell: scroll-spy left nav + full-bleed content (+ optional right TOC) |
| `.doc-cards` / `.doc-card` | Docs index card grid |

## Domain modules (page-specific, all in the shared sheet)
| Class | Page | Role |
|---|---|---|
| `.arco-loop` / `.arco-step*` | technology | The ARCO compute-loop sequence (lettered badges on an aurora spine + ↻ close) |
| `.effchart` / `.ec-*` | technology | SVG market-efficiency convergence curve |
| `.ws` / `.ws-grid` | technology / roadmap | Workstream lists |
| `.tiers` / `.tier` | tokenomics / get-tokens | Allocation / purchase tiers |
| `.phases` / `.phase__*` | tokenomics | Phased-release list (note: scoped as `.phases .phase`) |
| `.phase-strip` | roadmap | Three-release strip |
| `.release` / `.release--final` / `.release__*` | roadmap | Per-release breakdown |
| `.timeline` | roadmap | Phase timeline |
| `.team-grid` / `.team-grid--2` / `.person__*` | about | Director/advisor cards (photo-or-monogram avatar, bio, LinkedIn) |
| `.tx-*` / `.tiers` | get-tokens | Buy + faucet surfaces, legal line, agent aside |

---

## JavaScript behaviors (`js/lineage.js`)
- **Mobile menu** toggle + backdrop + Developers dropdown (open/close, click-outside, Escape, auto-active-parent).
- **Scroll reveal** for `[data-reveal]`.
- **Hero canvas** — the Clearing Lattice procedural animation (`#lattice`), reduced-motion aware, DPR-clamped.
- **Copy buttons** auto-added to every `pre.code` block site-wide.
- **Docs scroll-spy** + collapsible mobile contents.
- **Faucet cooldown** countdown (localStorage-persisted).

All behaviors are progressive — the page is fully readable with JS disabled.
