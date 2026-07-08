# Next Steps — Portfolio
**Date:** 2026-07-08
**Current branch:** main
**Current score:** 9.0/10

## What Hermes already finished
- P1–P5 (case-study routes, BootLoader/hydration fixes, What I Can Own, Open to opportunities badge, OG/meta, case-study copy/restoration)
- Micro fixes: hero bullet alignment, Gmail Say Hello, Cal.com removal
- Content refresh: About timeline + badge metrics, Skills categories
- SEO: optimized `public/og-image.png` down to ~43KB, richer title/description/canonical + `robots` metadata, Person JSON-LD, `app/sitemap.ts`, `public/robots.txt`
- Clean repo: source PDFs removed, stale branch deleted, all merged into `main`

## Steps Nuzhat should do next

### GitHub profile + repos
1. Open GitHub profile settings → pin these repos: Novus Comply, Compulse, CAS Parser, Biometric Attendance, NSA Sports, Portfolio
2. For each pinned repo: rewrite README with problem/stack/result; add 1–2 screenshots; redact confidential bits if needed
3. Add a profile README with this stack + contact links + “currently open to…”

### LinkedIn
1. Send short, specific recommendation requests to 2–3 teammates at Infomatics (manager, senior, peer)
2. Add the new BSc IT + Infomatics experience bullets we wrote in About

### Portfolio assets
3. Record 60–90 sec Loom walkthroughs for confidential projects (Compulse, HospitalSOP, optional Novus)
4. Export 1 clean screenshot per case study and save to `app/case-study/[slug]/` (screenshot filenames: `hero.jpg`, `dashboard.jpg`, etc.)
5. Optional poster image for `public/portfolio-intro.mp4` to improve LCP; keep it under 30–50KB

### Domain + hosting
6. Buy `nuzhatkhan.dev` and point it to Vercel
7. Update canonical/OG URLs in `app/layout.tsx` and any absolute links

### Deployment
8. After changes: push `main` to origin → Vercel deploy
9. Preview OG/Twitter tags at `https://www.opengraph.xyz/` or LinkedIn Post Inspector
10. Run Lighthouse on deployed home page; if SEO/Perf drops below 90, share screenshot and I’ll fix it

## Commands
```bash
cd /home/nuzhatkhan/Downloads/nuzhat-portfolio
npm run build
git push origin main
```
