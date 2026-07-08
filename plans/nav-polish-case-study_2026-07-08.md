# Portfolio UX Polish — Navigation + Premium Elevation
**Date:** 2026-07-08
**Triggered by:** Live browser audit of `/case-study` index and `/case-study/[slug]` pages

## Root Cause Analysis

The case-study pages have two back-links (`← Back to Portfolio`, `All Case Studies`) floating naked at top-left with no navigation context. They are not tied into the global Navbar, so:
1. No visual "nav zone" — links appear orphaned
2. Spacing fixes have been band-aids because the underlying structure has no container
3. On `/case-study/[slug]`, the links are 24px above the tag + H1, but the gap reads as accidental, not intentional

## Solution: Contextual breadcrumbs via Navbar active state

Add a dedicated "breadcrumb zone" above the page content that mirrors the home-page nav pattern. This ties the back-links into the existing nav language of the portfolio.

### Change 1 — CaseStudyClient.tsx (`components/CaseStudyClient.tsx`)

Replace the two naked `<a>` tags with a proper nav row:

```
<nav className="flex items-center gap-6 mb-8 border-b border-white/5 pb-4">
  <a href="/" className="text-sm text-grey hover:text-teal transition-colors font-inter">
    ← Portfolio
  </a>
  <span className="text-white/20">/</span>
  <a href="/case-study" className="text-sm text-grey hover:text-teal transition-colors font-inter">
    Case Studies
  </a>
  <span className="text-white/20">/</span>
  <span className="text-sm text-teal font-inter">{project.title}</span>
</nav>
```

Then start sections below with proper spacing (`mt-10` or similar).

### Change 2 — app/case-study/page.tsx

Same pattern for the index:

```
<nav className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
  <a href="/" className="text-sm text-grey hover:text-teal transition-colors font-inter">
    ← Portfolio
  </a>
  <span className="text-white/20">/</span>
  <span className="text-sm text-teal font-inter">All Case Studies</span>
</nav>
```

### Change 3 — Optional future (P2 after this)

Add a `case-study` nav highlight state so the global Navbar shows which section the user is in.

## Why this works
- Slash separator (`/`) is a universally understood breadcrumb pattern
- The `border-b border-white/5 pb-4` creates a clear visual "nav zone" — no more feeling like links are floating
- The final segment is teal (active/current), matching portfolio's existing accent language
- Spacing becomes `gap-6 + mb-8` — impossible for elements to collide
- Recruiter orientation: always knows exactly where they are in the site hierarchy

## Files to edit
- `components/CaseStudyClient.tsx` — replace lines 205-213 with new nav
- `app/case-study/page.tsx` — replace lines 69-72 with new nav

## Risk
Low — purely additive markup, no logic change.

---
**Status:** Pending implementation
