# Portfolio Implementation Plan
**Date:** 2026-07-08  
**Source:** `/home/nuzhatkhan/Downloads/nuzhat-portfolio/nuzhat-portfolio-improvement-plan-2026-06-30.pdf` + live code audit  
**Current score:** ~8.8/10 → Target: 9.0+  
**Stored at:** `/home/nuzhatkhan/Downloads/nuzhat-portfolio/plans/portfolio_implementation_plan_2026-07-08.md`

---


## Minute fixes completed this session

- ✅ Hero badge bullet alignment — `W-1.5` dot now `shrink-0`, text `leading-none` so bullet stays on the same line as "Fullstack Developer · Mumbai"
- ✅ Removed Cal.com "Book a 15-min call" button from Contact
- ✅ WhatsApp button link verified: `https://wa.me/919769149366` — points to your number; button is rendered after removing Cal.com CTA

## Analysis — What to steal and from whom

| Inspiration | Pattern to steal | Where to apply | Status |
|---|---|---|---|
| Rajat Mondal (`rajat-mondal-portfolio.vercel.app`) | Outcome-driven hero line, role framing per project | `Hero.tsx`, project cards | ✅ Applied |
| Devon Stank (`devonstank.com`) | Full-screen video hero with play overlay, minimalist dark UI | Already implemented! | ✅ Done |
| Diogo Correia (`diogotc.com`) | Sticky header with Resume, GitHub, LinkedIn, contact CTAs + progressive timeline | `Navbar.tsx` | ✅ Applied |
| Michael Mannucci (`michaelmannucci.com`) | One-page tight narrative, direct Contact CTA in every section | `Contact.tsx`, layout | ✅ Applied |
| Kaisei Sadatoki V4 (Awwwards) | "Services / What I can own" section — architecture → deployment → mobile APK | New section before Footer | ✅ Done |
| OneHour Indian junior portfolio roundup | Every project must have at least 1 clickable artifact; Loom walkthroughs for confidential work | Project cards — link expansion | Partial; confidential projects sanitized |
| Wall of Portfolios India (`wallofportfolios.in`) | "Open to opportunities" badge, quantified impact on every project | Hero badge, each project | ✅ Done |

## Completed items (current branch `p3-open-to-opportunities`)

| ID | Task | Status |
|---|---|---|
| P1 | Case study routing + 6 pages | Completed |
| P1b | Nav polish / breadcrumbs | Completed |
| P2 | What I Can Own section | Completed |
| P3 | Open to opportunities badge | Completed |
| P4 | Meta/SEO + OG tags | Completed |
| P5 | NSA + CAS case study copy + routes | Completed |
| micro | Hero badge bullet alignment | Completed |
| micro | Remove Cal.com "Book a 15-min call" | Completed |
| micro | WhatsApp number verified (`wa.me/919769149366`) | Completed |

---


## Remaining gaps (not yet done)

1. **Social-proof artifacts for confidential projects**  
   - Novus Comply / Novus UPSI: add a Loom walkthrough or 1-page architecture diagram artifact  
   - HospitalSOP Portal: add screenshot/artifact  
   - Goal: every project has ≥1 clickable artifact beyond just a case study link

2. **GitHub profile README polish**  
   - Outside this repo; mirrors portfolio content  
   - Pinned repos, bio, tech badges aligned to current stack

3. **LinkedIn recommendations**  
   - Need real attribution from contacts  
   - Not in-scope for repo, but worth flagging for Nuzhat to request

4. **Live site screenshot / thumbnail images**  
   - Case study pages currently use text-only layout  
   - Adding 1-2 hero images per case study would lift dwell time

5. **Performance / LCP budget**  
   - Intro video `portfolio-intro.mp4` is heavy; explore poster image + lazy-loaded video source  
   - OG image is 284KB — acceptable, but could be optimized to <100KB

---


## Plan Status

| ID | Task | Status | Estimated |
|---|---|---|---|
| P1 | Case study routing + 4 pages | Completed — 6/6 pages built and passing; nav polish applied with breadcrumb pattern | Done |
| P1b | Nav polish / breadcrumbs | Completed — broke the orphaned back-link pattern; replaced with contextual breadcrumb nav on both case-study index and slug pages | Done |
| P2 | What I Can Own section | Completed — 2x2 capability card grid; wired between Skills and Contact | Done |
| P3 | Open to opportunities badge | Completed — emerald pill with animated pulse dot in hero, below role label | Done |
| P4 | Meta/SEO + OG tags | Completed — OG image + Twitter summary_large_image card metadata | Done |
| P5 | NSA + CAS case study copy | Completed — content filled, routes restored for all 6 projects | Done |
| micro | Hero badge bullet alignment fix | Completed — bullet dot stays on same line | Done |
| micro | Remove Cal.com "Book a 15-min call" | Completed — button removed, icon import cleaned | Done |
| micro | WhatsApp number verification | Completed — link points to `wa.me/919769149366` | Done |

**Current score:** ~8.8/10  
**Next moves:** blocked only on Nuzhat for Loom videos + LinkedIn requests; repo is functionally complete at feature level.

