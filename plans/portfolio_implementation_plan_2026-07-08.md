# Portfolio Implementation Plan
**Date:** 2026-07-08  
**Source:** `/home/nuzhatkhan/Downloads/nuzhat-portfolio/nuzhat-portfolio-improvement-plan-2026-06-30.pdf` + live code audit  
**Current score:** ~7.8/10 → Target: 9.0+  
**Stored at:** `plans/portfolio_implementation_plan_2026-07-08.md`

---

## Analysis — What to steal and from whom

### "What to steal from whom" (from the PDF findings)

| Inspiration | Pattern to steal | Where to apply |
|---|---|---|
| Rajat Mondal (`rajat-mondal-portfolio.vercel.app`) | Outcome-driven hero line, role framing per project | `Hero.tsx`, project cards |
| Devon Stank (`devonstank.com`) | Full-screen video hero with play overlay, minimalist dark UI | Already implemented! |
| Diogo Correia (`diogotc.com`) | Sticky header with Resume, GitHub, LinkedIn, contact CTAs + progressive timeline | `Navbar.tsx` |
| Michael Mannucci (`michaelmannucci.com`) | One-page tight narrative, direct Contact CTA in every section | `Contact.tsx`, layout |
| Kaisei Sadatoki V4 (Awwwards) | "Services / What I can own" section — architecture → deployment → mobile APK | New section before Footer |
| OneHour Indian junior portfolio roundup | Every project must have at least 1 clickable artifact; Loom walkthroughs for confidential work | Project cards — link expansion |
| Wall of Portfolios India (`wallofportfolios.in`) | "Open to opportunities" badge, quantified impact on every project | Hero badge, each project |

### Indian market priorities from the findings
- Live demo links expected; sanitize confidential projects with Loom walkthroughs
- BFSI experience is a premium differentiator — lead with it
- WhatsApp + Cal.com already added (good, Contact.tsx has both)
- Quantify everything, avoid tutorial-project noise

---

## What was already fixed (since Jun-29 to 7.8/10)
- ✅ Working Gmail: `knuzhat136@gmail.com` (Contact.tsx)
- ✅ LinkedIn everywhere (Navbar, About, Contact)
- ✅ Resume download button (`/Nuzhat_Khan_Resume.pdf`)
- ✅ 2 above-fold CTAs: View Projects + Download Resume (Hero.tsx)
- ✅ 3 projects added: 6 total now
- ✅ Skills section restructured with daily/worked-with tiers
- ✅ WhatsApp + Cal.com in Contact
- ✅ Response-time copy in Contact

---

## Remaining gaps (Tier 2 + 3 from plan)
1. Case study routing (`/case-study/...`) — EXPANDED PROJECTS have case-study sections but no dedicated pages
2. "Currently Building" / "What I Can Own" section
3. SEO/metatags still reference default domain
4. Loom/screenshot artifacts for confidential projects
5. LinkedIn recommendations
6. GitHub profile README polish

---

## Implementation Plan

### PRIORITY 1 — Case Study Routing (This session)

**What:** Add `/case-study/[slug]` pages for Compulse and Biometric first (most flagship projects with strongest case-study data already in ProjectCard), then NSA Sports and CAS Parser.

**Why:** PDF explicitly says "Top-pattern from best junior portfolios; architecture + metrics = strong differentiation." It's #10 on the ranked list.
- Upgrades score: 8.2 → 8.6
- Directly recruits: recruiter dwell time ~1.5 min → ~2.5 min

**Risks:**
- New routes require updating any nav link; currently no nav link points to case studies
- Case study content must remain separate from project card summary (no content duplication rotation hazard)
- Confidential projects must not leak actual customer data; sanitize all names

**Steps:**
1. Create `app/case-study/[slug]/page.tsx` with a shared CaseStudyLayout component
2. Create `app/case-study/page.tsx` — index listing all case studies with descriptions and CTA
3. Add "Case Studies" link to Navbar
4. Add "View Case Study" CTA link on each project card that has rich data (Compulse, Biometric, NSA Sports, CAS Parser)
5. Update ProjectCard expanded section to link out to dedicated page instead of inline for flagship projects (or keep both — inline is fine as quick preview, dedicated page is deeper)
6. Add case-study slug links to Contact nudge

**Files involved:**
- `app/case-study/[slug]/page.tsx` (new)
- `app/case-study/page.tsx` (new)
- `components/CaseStudyPage.tsx` (new)
- `components/ProjectCard.tsx` (link addition)
- `components/Navbar.tsx` (add Case Studies link)
- `components/Contact.tsx` (optional nudge)

**Can start immediately — no approval needed for adding new routes/read-only content.**

---

### PRIORITY 2 — "What I Can Own" Section (Low disruption)

**What:** New section before Contact that mirrors Kaisei Sadatoki and Michael Mannucci patterns.
Content: Architecture → Deployment → Mobile APK distribution, flavored with actual stack.

**Why:** PDF explicit recommendation. Addresses enterprise expectation of end-to-end ownership.
Upgrades score: ~0.2

**Risks:** Minimal. New section between Services and Contact, purely additive.

---

### PRIORITY 3 — Open to Work Badge (Cosmetic, fast)

**What:** Add a small "Open to opportunities" badge in Hero corner and/or status bar.

**Why:** Wall of Portfolios India pattern. Zero-effort signal.

---

### PRIORITY 4 — Domain + Meta finalization

**What:** Update OG image path, title/description in layout.tsx from PDF content kit; query user on domain (`nuzhatkhan.dev`). Do NOT deploy without user confirmation.

**Why:** SEO/shareability. Fabricated — must get exact hero-og.png asset or fallback.

---

### PRIORITY 5 — Case study content for remaining projects (NSA Sports, CAS Parser)

**What:** Add full case study content copy (challenge/architecture/solution/result) from content kit.

**Why:** PDF has drop-in copy in `/root/nuzhat_portfolio_content.md`. Read it, then apply to new pages.

---

## Not in scope unless asked
- LinkedIn recommendations (need real attribution from contacts)
- Loom walkthroughs (Nuzhat to produce videos)
- GitHub profile README (outside this repo)
- Blog section
- Custom domain purchase

---

## Plan Status

| ID | Task | Status | Estimated |
|---|---|---|---|
|| P1 | Case study routing + 4 pages | Completed — 6/6 pages built and passing; nav polish applied with breadcrumb pattern | 2–3 hrs (done) |
|| P1b | Nav polish / breadcrumbs | Completed — broke the orphaned back-link pattern; replaced with contextual breadcrumb nav on both case-study index and slug pages | Done |
|| P2 | What I Can Own section | Completed — 2x2 capability card grid; wired between Skills and Contact | 1 hr (done) |
|| P3 | Open to opportunities badge | Completed — emerald pill with animated pulse dot in hero, below role label | 15 min (done) |
|| P4 | Meta/SEO + OG tags | Next | 30 min |
|| P5 | NSA + CAS case study copy | Pending case study pages | 1 hr |

**Total remaining:** ~5–7 hours to reach 9.0+ score.
