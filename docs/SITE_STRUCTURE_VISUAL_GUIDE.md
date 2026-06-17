# Portfolio Site Visual Structure & Display Guide

## 🎯 What Your Site Should Display

### Home Page (/) - Hero & Featured Projects

```
┌─────────────────────────────────────────────────────────┐
│  NAVIGATION BAR (Fixed at top)                          │
│  ─────────────────────────────────────────────────────  │
│  Aaron          About  Experience  Projects  Blog Contact│
│                 🌙 (Theme Toggle)                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                         │
│                   HERO SECTION                          │
│                                                         │
│  Left Side:                     Right Side:             │
│  ─────────────────────         ─────────────────       │
│  AI Engineer &                 [Hero Photo:            │
│  Full-Stack Builder            Pharrell.jpeg]          │
│                                                        │
│  Founder of JuniorReactive                            │
│  Building intelligent automation for East Africa      │
│                                                        │
│  STATS:                                               │
│  ┌──────────────┐  ┌──────────────┐                  │
│  │   4.38       │  │      2       │                  │
│  │ ISBAT CGPA   │  │ Live Projects│                  │
│  └──────────────┘  └──────────────┘                  │
│                                                        │
│  [View My Work ➜] [Download CV]                       │
│                                                        │
│  [GitHub] [LinkedIn] [Email]                          │
│                                                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Featured Projects                              View All ➜ │
│ ─────────────────────────────────────────────────────── │
│                                                         │
│  ┌──────────────────┐      ┌──────────────────┐       │
│  │                  │      │                  │       │
│  │   EchoTwin       │      │   HAIQ Bakery    │       │
│  │   [Image]        │      │   [Image]        │       │
│  │                  │      │                  │       │
│  │  Voice cloning   │      │  E-commerce      │       │
│  │  with AI         │      │  Platform        │       │
│  │                  │      │                  │       │
│  │ Python, PyTorch, │      │ React, Node.js,  │       │
│  │ Librosa          │      │ PostgreSQL       │       │
│  │                  │      │                  │       │
│  └──────────────────┘      └──────────────────┘       │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ FOOTER                                                  │
│ Built by Junior Reactive Company · Pharrell Aaron      │
└─────────────────────────────────────────────────────────┘
```

---

## 📄 Projects Page (/projects) - Full Grid

```
┌─────────────────────────────────────────────────────────┐
│ NAVIGATION (Same as above)                              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  All Projects (3 cards in grid)                        │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ EchoTwin │  │ HAIQ     │  │ AceGuru  │             │
│  │ [Image]  │  │ [Image]  │  │ [Image]  │             │
│  │          │  │          │  │          │             │
│  │ Voice    │  │ E-shop   │  │ Card     │             │
│  │ Cloning  │  │ Platform │  │ Game AI  │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│                                                         │
│  Each card shows:                                       │
│  - Project image                                       │
│  - Project title                                       │
│  - Short description                                   │
│  - Tech stack (4-5 tags)                              │
│  - GitHub link (if available)                         │
│  - Live URL (if available)                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📝 Blog Page (/blog) - Article Listing

```
┌─────────────────────────────────────────────────────────┐
│ NAVIGATION                                              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Blog Posts                                            │
│                                                         │
│  ┌──────────────────────────────────────────────┐    │
│  │ [Cover Image - Unsplash]                     │    │
│  │                                               │    │
│  │ Production AI Systems in Practice            │    │
│  │ Lessons from building forecasting models...  │    │
│  │ Published: Dec 1, 2025                       │    │
│  │ Tags: AI, Machine Learning, Production       │    │
│  └──────────────────────────────────────────────┘    │
│                                                         │
│  ┌──────────────────────────────────────────────┐    │
│  │ [Cover Image - Unsplash]                     │    │
│  │                                               │    │
│  │ My Journey as a Self-Taught Developer        │    │
│  │ From zero to shipping production code...     │    │
│  │ Published: Nov 15, 2025                      │    │
│  │ Tags: Learning, Development, Career         │    │
│  └──────────────────────────────────────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 💼 Experience Page (/experience) - Timeline

```
┌─────────────────────────────────────────────────────────┐
│ NAVIGATION                                              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  My Experience                                         │
│                                                         │
│  [Logo]  TraceCorp Solutions                          │
│  /              AI Specialist (Intern)                │
│          Jan 2026 - Present                           │
│                                                         │
│          Designed and deployed 5 Prophet-based        │
│          forecasting models in live ERP platform      │
│                                                         │
│          • 5 Prophet forecasting models               │
│          • Anomaly detection for billing              │
│          • Intelligent ERP chatbot                    │
│          • Deployed to AWS EC2                        │
│                                                         │
│  ─────────────────────────────────────────────────     │
│                                                         │
│  [Logo]  ISBAT University                             │
│  /              Student / AI & ML Enthusiast          │
│          Pursuing Bachelor of Science in             │
│          Computer Science & IT                        │
│                                                         │
│          CGPA: 4.38 / 4.5                            │
│          Focused on: AI/ML, Full-Stack Dev           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 👤 About Page (/about) - Bio & Skills

```
┌─────────────────────────────────────────────────────────┐
│ NAVIGATION                                              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  About Aaron Pharrell Mugumya                          │
│                                                         │
│  Bio section with professional summary...             │
│                                                         │
│  My Toolkit                                            │
│                                                         │
│  Languages                                             │
│  [Python] [JavaScript] [TypeScript] [SQL]             │
│                                                         │
│  Frontend                                              │
│  [React] [Next.js] [Tailwind CSS] [Framer Motion]    │
│                                                         │
│  Backend                                               │
│  [Node.js] [PostgreSQL] [FastAPI] [Drizzle ORM]      │
│                                                         │
│  ML/AI                                                 │
│  [TensorFlow] [PyTorch] [Hugging Face] [Prophet]     │
│                                                         │
│  DevOps & Cloud                                        │
│  [Docker] [AWS EC2] [GCP] [GitHub Actions] [Vercel]  │
│                                                         │
│  Tools & Platforms                                     │
│  [Git] [VS Code] [Figma] [Cloudinary] [Neon]         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📧 Contact Page (/contact) - Form

```
┌─────────────────────────────────────────────────────────┐
│ NAVIGATION                                              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Get In Touch                                          │
│                                                         │
│  Send me a message and I'll get back to you asap      │
│                                                         │
│  ┌──────────────────────────────────────────────┐    │
│  │ Your Name              [Text Input]          │    │
│  │ Your Email             [Email Input]         │    │
│  │ Subject                [Text Input]          │    │
│  │ Message                [Large Textarea]      │    │
│  │                                              │    │
│  │                  [Send Message Button]       │    │
│  └──────────────────────────────────────────────┘    │
│                                                         │
│  Or reach out directly:                               │
│  📧 aaronmugumya04@gmail.com                          │
│  🔗 github.com/Spryra                                │
│  🔗 linkedin.com/in/aaron-mugumya-pharrell           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Animation Sequence When Page Loads

### Order of Animations:
1. **Navigation** (Logo + Links): 600ms slide-in
2. **Hero Heading**: 800ms character reveal (staggered)
3. **Stats Container**: 600ms fade + slide (200ms delay)
4. **Counter Numbers**: 2000ms count-up animation (CGPA 4.38, Projects 2)
5. **Featured Projects**: 800ms cascade entrance (alternating sides)
6. **Tech Stack Badges** (On About): 500-600ms elastic pop
7. **Cards** (Projects/Blog): Staggered entrance on scroll

---

## 🎯 Key Features Active

✅ **Dark Mode Toggle**: Click moon/sun icon in top-right nav  
✅ **Responsive Design**: Works on mobile, tablet, desktop  
✅ **Smooth Animations**: GPU-accelerated, 60fps  
✅ **Database Connected**: Live data from Neon PostgreSQL  
✅ **Image Optimization**: Using Next.js Image component + Unsplash placeholders  
✅ **Accessibility**: Respects `prefers-reduced-motion`  

---

## 🔧 Data Being Displayed

### From Neon Database:
- **2 Experience Entries**: TraceCorp, ISBAT
- **3 Projects**: EchoTwin, HAIQ Bakery, AceGuru
- **2 Blog Posts**: "Production AI Systems in Practice", "My Journey as Self-Taught Developer"

### Static Content:
- Hero image: `/public/Pharrell.jpeg`
- CV: `/public/cv.pdf`
- All text content and descriptions

---

## 🚀 How to Access

**Local Development:**
```
http://localhost:3001
```

**Production (After Vercel env setup):**
```
https://aaron-pharrell-mugumyacom.vercel.app/
```

**Debug API:**
```
http://localhost:3001/api/debug/projects
(Shows all database queries and their results)
```
