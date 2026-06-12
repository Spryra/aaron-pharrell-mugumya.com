# AARON PHARRELL MUGUMYA — Personal Portfolio Website
## Master Project Brief
_Generated: 2026-06-12 | Prompt-Creation Skill | Claude Code_

---

## 1. MISSION STATEMENT

Build a peak-of-modern-standards personal portfolio website for **Aaron Pharrell Mugumya** — AI & ML Engineer, Full-Stack Developer, and Founder of JuniorReactive — that simultaneously functions as a professional credential, a client acquisition tool for JuniorReactive, and a living showcase of what a world-class personal portfolio can achieve. The site must speak credibly to four audiences in parallel: East African businesses seeking software/AI services, global remote employers evaluating technical depth, investors sizing up JuniorReactive, and the global developer/designer community. It will be referenced in Aaron's CV and LinkedIn profile as a primary proof-of-work URL.

**Platform Priority**: Flawlessly responsive across all screen sizes and devices — mobile (320px–480px), tablet (481px–1024px), laptop (1025px–1440px), and ultra-wide (1441px–2560px). Mobile-first, fluid layouts, touch-friendly interactions.

---

## 2. SUCCESS CRITERIA

- [ ] Lighthouse score ≥ 95 on Performance, Accessibility, Best Practices, and SEO
- [ ] **Fully responsive**: tested and verified on iPhone SE (320px), iPhone 14 (390px), iPad (768px), iPad Pro (1024px), desktop 1440px, and 2560px ultrawide
- [ ] **Fluid typography**: text scales smoothly without hard breakpoints via clamp()
- [ ] **Touch-friendly**: all interactive elements ≥ 48px tap targets on mobile
- [ ] **Flexbox + CSS Grid**: no fixed widths, full viewport adaptation
- [ ] Container queries used for component-level responsiveness (not just viewport breakpoints)
- [ ] Full light/dark mode toggle with system-preference detection on first load
- [ ] Admin panel accessible only via authenticated session (Aaron only) — protected at middleware level, not just UI redirect
- [ ] Contact form rate-limited: max 5 submissions per IP per hour via Upstash Redis
- [ ] All public API routes rate-limited: 100 requests per IP per minute
- [ ] Admin login rate-limited: 10 attempts per IP per 15 minutes
- [ ] "Download CV" button always serves the current PDF from Cloudinary (updated via admin panel without code changes)
- [ ] Full blog with CRUD via admin panel — create, edit, publish/draft, delete — markdown rendered server-side
- [ ] Company logos (TraceCorp Solutions, ISBAT University, JuniorReactive, HAIQ) displayed in their respective sections
- [ ] Profile photo displayed in hero section, served via Cloudinary
- [ ] All 3 major projects (EchoTwin, AceGuru, HAIQ) have dedicated case study pages
- [ ] Zero known XSS, CSRF, SQL injection, or secrets-in-client vulnerabilities
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Footer reads: "Built by Junior Reactive Company · Pharrell Aaron Mugumya" linking to https://jrcom.vercel.app/
- [ ] Fully deployed on Vercel; media on Cloudinary; database on Neon
- [ ] `/docs/DEPLOYMENT.md` contains step-by-step production setup guide Aaron can follow independently
- [ ] Open Graph + Twitter Card meta for every page (auto-generated for blog posts)
- [ ] `sitemap.xml` and `robots.txt` auto-generated

---

## 3. TECHNICAL SPECIFICATION

### Stack & Architecture

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14+ (App Router, TypeScript) | SSR/SSG, API routes, edge middleware — single deployment |
| Styling | Tailwind CSS v3 + shadcn/ui | Design system tokens, accessible components, mobile-first utilities |
| Responsive | Fluid layouts, container queries, clamp() | Smooth scaling across 320px–2560px without breakpoint jumps |
| Animations | Framer Motion v11 | Scroll-triggered reveals, page transitions, respects prefers-reduced-motion |
| Database | Neon (PostgreSQL) via Drizzle ORM | Serverless PG, edge-compatible, type-safe schema |
| Media & Files | Cloudinary | Profile photo, logos, CV PDF, project screenshots — CDN delivery, responsive images |
| Auth | NextAuth.js v5 (Auth.js) | Single admin credential, session in Neon |
| Rate Limiting | Upstash Redis | Edge-compatible rate limiting without cold starts |
| Email | Resend | Contact form → Aaron's inbox; confirmation to sender |
| Security | next-safe-headers + Zod + DOMPurify | CSP, HSTS, X-Frame-Options, input validation, HTML sanitization |
| Icons | Lucide React | Clean, professional, consistent SVG icon set |
| Fonts | Inter (body) + Syne (headings) | Modern, legible, distinctive; fluid font sizing |
| Hosting | Vercel (primary) | Native Next.js deployment, edge network, automatic responsive image optimization |

### Color Palette

**Light Mode**
- Background: `#FFFFFF` / Surface: `#F8FAFC`
- Text primary: `#0F172A` / Secondary: `#475569`
- Accent (blue): `#2563EB` / Accent hover: `#1D4ED8`
- Accent secondary (amber/gold): `#D97706`
- Border: `#E2E8F0`

**Dark Mode**
- Background: `#0A0F1E` / Surface: `#111827`
- Text primary: `#F1F5F9` / Secondary: `#94A3B8`
- Accent (blue): `#3B82F6` / Accent hover: `#60A5FA`
- Accent secondary (amber/gold): `#F59E0B`
- Border: `#1F2937`

### Responsive Design Strategy

- **Mobile-first**: Start with mobile layouts, enhance with larger breakpoints
- **Breakpoints** (use as guidance, not hard limits):
  - `sm`: 640px — small phones landscape, small tablets
  - `md`: 768px — tablets portrait
  - `lg`: 1024px — tablets landscape, small laptops
  - `xl`: 1280px — laptops
  - `2xl`: 1536px — desktops and ultrawide
- **Fluid typography**: `clamp(1rem, 2.5vw, 3.5rem)` instead of fixed sizes
- **Flexible spacing**: Use `gap-4`, `space-y-6` that adapt via rem units
- **Cloudinary responsive images**: Use `responsive` parameter and `srcSet` generation
- **Touch targets**: minimum 48x48px on mobile, never smaller than 40px
- **Container queries**: Use `@container` for card components to adapt independently of viewport

### Database Schema (Drizzle ORM)

```typescript
// Tables:
// blog_posts       — id, title, slug, content (markdown), cover_image_url, status (draft|published), created_at, updated_at
// projects         — id, title, slug, description, tech_stack[], cover_image_url, github_url, live_url, featured, sort_order
// experience       — id, company, role, start_date, end_date, description_bullets[], logo_url, sort_order
// contact_messages — id, name, email, subject, message, read, created_at
// admin_sessions   — managed by NextAuth
// cv_file          — id, cloudinary_url, uploaded_at (single-row table)
```

### Pages & Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | SSG | Hero, About snapshot, Experience highlights, Featured Projects, Skills, Blog preview, Contact CTA |
| `/about` | SSG | Full personal story, education, values, CGPA callout |
| `/experience` | SSR | Work timeline with company logos |
| `/projects` | SSR | Projects grid (responsive cards) |
| `/projects/[slug]` | SSR | Case study: problem, approach, tech, outcome, links |
| `/blog` | SSR | Blog listing with pagination |
| `/blog/[slug]` | SSR | Individual post, markdown-rendered, responsive |
| `/contact` | CSR | Rate-limited contact form |
| `/admin` | Protected | Dashboard overview |
| `/admin/login` | Public | Admin login page |
| `/admin/projects` | Protected | CRUD projects |
| `/admin/blog` | Protected | CRUD blog posts + markdown editor |
| `/admin/experience` | Protected | CRUD experience entries |
| `/admin/cv` | Protected | Upload new CV PDF |
| `/admin/messages` | Protected | View/mark-read contact submissions |
| `/api/contact` | API | Rate-limited POST endpoint |
| `/api/og` | API | Dynamic OG image generation |

### Security Implementation Checklist

- [ ] `next-safe-headers`: CSP, X-Frame-Options: DENY, HSTS, X-Content-Type-Options: nosniff
- [ ] All env vars server-only (never in `NEXT_PUBLIC_` unless truly public)
- [ ] Zod schema validation on every server action and API route
- [ ] DOMPurify (server-side via `isomorphic-dompurify`) on all blog HTML output
- [ ] Middleware-level admin route protection (check session before rendering, not after)
- [ ] SameSite=Strict + HttpOnly + Secure cookies for auth session
- [ ] Upstash rate limiting before any expensive operations
- [ ] Parameterized queries only via Drizzle ORM (no raw string interpolation in SQL)
- [ ] Cloudinary upload preset restricted to admin use only (signed uploads)

### Out of Scope (v1)

- Real-time analytics (placeholder stat cards in admin only)
- Blog comments
- Multi-language / i18n
- Payment or booking system
- Native mobile app
- Server-side A/B testing

---

## 4. DOCUMENTATION PROTOCOL ⚠️ MANDATORY

All documentation lives in `/docs/` at the project root.

**Required files:**
- `/docs/MASTER_PROMPT.md` — This document (living, update on major pivots)
- `/docs/PROJECT_LOG.md` — Progress log (append after every session)
- `/docs/ARCHITECTURE.md` — System design decisions and rationale
- `/docs/DECISIONS.md` — What was chosen, why, what was rejected
- `/docs/CHALLENGES.md` — Problems encountered + solutions
- `/docs/DEPLOYMENT.md` — Step-by-step production deployment for Vercel, Neon, Cloudinary, Upstash, Resend
- `/docs/ADMIN_GUIDE.md` — Non-technical guide for Aaron: how to use the admin panel

**Progress log entry format:**
```
### [DATE] — [SESSION TITLE]
**What was done:** ...
**How it was done:** ...
**Where (files/components):** ...
**Why this approach:** ...
**Challenges faced:** ...
**Solutions tried:** ...
**Solution chosen:** ...
**Next steps:** ...
```

---

## 5. SKILL DEPLOYMENT PLAN

| Skill | Phase | Trigger |
|-------|-------|---------|
| `writing-plans` | 1 — Planning | Before first line of code — generate implementation plan |
| `shadcn-ui` | 2 — Build | Component library and design system setup |
| `color-expert` | 2 — Build | Finalizing color tokens and accessibility check |
| `frontend-design` | 2 — Build | All UI sections and layout work |
| `systematic-debugging` | 2 — Build | Any bug or test failure before proposing fixes |
| `verification-before-completion` | 2 — Build | Before marking any section complete |
| `security-review` | 3 — Review | Before ANY deployment or admin panel exposure |
| `code-review-excellence` | 3 — Review | At PR/merge points |
| `webapp-testing` | 3 — QA | Full site functional + mobile testing |
| `finishing-a-development-branch` | 4 — Ship | Feature complete, ready to integrate |
| `dispatching-parallel-agents` | Throughout | Multiple independent UI sections can be built in parallel |

**Power shortcodes:**
| Shortcode | When |
|-----------|------|
| `SCAFFOLD` | Generate full file structure |
| `ARCHITECT` | Finalize Next.js folder structure |
| `BEASTMODE` | Hero section + animations — maximum quality |
| `/redteam` | Before deploying admin panel |
| `SENTINEL` | Final review before going live |
| `/shipit` | Polishing MVP to production-ready |

---

## 6. MODEL SELECTION STRATEGY

| Stage | Task | Model |
|-------|------|-------|
| Planning | Architecture, schema design, decisions | claude-sonnet-4-6 |
| Build | Complex components, auth, rate limiting | claude-sonnet-4-6 |
| Build | Repetitive CRUD, simple components | claude-haiku-4-5 |
| Review | Security audit, auth logic review | claude-sonnet-4-6 |
| Documentation | Deployment guides, admin guide | claude-haiku-4-5 |

---

## 7. PHASE BREAKDOWN

### Phase 1: Foundation
**Goal**: Working skeleton with all integrations connected.
- Init Next.js 14 + TypeScript + Tailwind + shadcn/ui in `D:\Junior Reactive Projects\Aaron-Pharrell-Personal-Website`
- Neon DB connected with Drizzle ORM + full schema migrated
- Cloudinary SDK configured
- NextAuth v5 admin credential provider working
- Upstash Redis rate limiting middleware wired up
- Security headers configured
- ESLint + Prettier + TypeScript strict mode
- `/docs/` folder structure created
- **Exit condition**: `npm run dev` clean, DB connects, admin login route works, rate limiting responds

### Phase 2: Public Site
**Goal**: All public-facing pages complete in both light and dark mode, fully responsive.
- Design system (color tokens, type scale, component primitives, responsive spacing)
- Hero section (photo, name, titles, CTA buttons, Download CV) — mobile-first
- About page (personal story, education, values, CGPA callout) — responsive text + images
- Experience timeline (company logos, roles, achievements) — grid that adapts to viewport
- Projects grid + 3 case study pages (EchoTwin, AceGuru, HAIQ) — responsive cards
- Skills section (visual grid: AI/ML, Web/Mobile, Cloud, Languages) — mobile→desktop reflow
- Blog listing + individual post pages — responsive markdown rendering
- Contact form (rate-limited, email notifications) — touch-friendly inputs
- Footer with Junior Reactive credit
- **Exit condition**: All pages render in light + dark, mobile + tablet + desktop tested, no console errors, Lighthouse ≥ 90

### Phase 3: Admin Panel + Blog
**Goal**: Aaron can fully manage site content without touching code.
- Admin login, dashboard, protected middleware
- CRUD: Projects, Experience, Blog posts (markdown editor)
- CV upload flow → Cloudinary → Download CV button auto-updates
- Contact submissions inbox (read/unread)
- **Exit condition**: Full content management cycle works; a new blog post can be created and published through admin UI

### Phase 4: Polish + Security
**Goal**: Production-grade quality and security.
- Framer Motion animations (hero entrance, scroll reveals, hover states, page transitions) — respects prefers-reduced-motion
- Dynamic OG image generation (`/api/og`)
- `sitemap.xml` + `robots.txt`
- `/redteam` security audit — fix all findings
- Lighthouse audit → achieve ≥ 95 on all 4 metrics across all screen sizes
- Mobile testing on simulated iPhone SE (320px), iPhone 14 (390px), iPad (768px), iPad Pro (1024px), desktop 1440px
- **Exit condition**: Lighthouse ≥ 95, no security findings, pixel-perfect on all tested devices

### Phase 5: Deployment
**Goal**: Live at production URL with all services connected.
- Deploy to Vercel with production environment variables
- Neon production database + run migrations
- Upload all media to Cloudinary (profile photo, logos, initial CV)
- Configure Upstash Redis production instance
- Configure Resend for email
- Wire GitHub repo: https://github.com/Spryra/aaron-pharrell-mugumya.com
- Write `/docs/DEPLOYMENT.md` (step-by-step guide)
- Write `/docs/ADMIN_GUIDE.md`
- **Exit condition**: Site is live, all features work in production, Aaron can log into admin panel

---

## 8. FIRST ACTION

Execute `SCAFFOLD`: Generate the **complete file and folder structure** for the entire project — all page routes, all component folders, all API route files, all Drizzle schema files, all doc files, all config files — **empty but correctly named and located**. Then initialize the Next.js 14 project in `D:\Junior Reactive Projects\Aaron-Pharrell-Personal-Website`.

No application logic until the scaffold is approved.
