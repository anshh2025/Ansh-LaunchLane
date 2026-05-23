# LaunchLane — AI App Builder

**Built by Ansh**

LaunchLane is a full-stack AI-powered application builder. Describe what you want to build in plain English, and the AI writes production-ready React code, picks the right packages, and renders a live preview — all inside your browser.

---

## What it does

- **AI Code Generation** — Describe your app, get working React + Tailwind code in seconds powered by Gemini AI
- **Live Preview** — Sandpack renders your app instantly in the browser. No installs, no build steps
- **Iterative Chat** — Keep refining your app through conversation. The AI remembers the full context
- **Improve with Agent** — Pro and Starter users can trigger an AI agent that autonomously improves the generated app file by file
- **Fix with AI** — When a runtime error appears in the preview, one click sends it to the AI and auto-fixes it
- **Image-aware Prompts** — Attach screenshots or mockups. The AI reads them and generates matching code
- **Export to ZIP** — Download a ready-to-run React project with `package.json` and all source files
- **Credit System** — Free: 10 credits · Starter: 50 · Pro: 150. One credit per generation
- **Projects Dashboard** — All your past workspaces saved and accessible in one place

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router, TypeScript) |
| Auth + Billing | Clerk |
| Database | Supabase (PostgreSQL via Prisma) |
| Image Storage | Supabase Storage |
| Rate Limiting | Arcjet |
| AI Model | Google Gemini |
| AI Agent | Cline SDK |
| Code Preview | Sandpack (CodeSandbox) |
| Styling | Tailwind CSS + Shadcn UI |
| ORM | Prisma |

---

## Getting Started

### Prerequisites

- Node.js 22+
- A Supabase project
- A Clerk application with billing enabled
- A Google AI Studio API key (Gemini)
- An Arcjet account (for rate limiting)

### Installation

```bash
git clone <your-repo-url>
cd ai-app-builder
npm install
```

### Database setup

```bash
npx prisma generate
npx prisma db push
```

### Environment variables

Create a `.env.local` file in the root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Database
DATABASE_URL=
DIRECT_URL=

# Google Gemini
GEMINI_API_KEY=

# Arcjet
ARCJET_KEY=
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database Schema

**User** — synced from Clerk on first login
```
id, clerkId, name, email, imageUrl, credits, plan, createdAt, updatedAt
```

**Workspace** — one per AI session
```
id, userId (FK), title, messages (JSON), fileData (JSON), createdAt, updatedAt
```

---

## Plans

| Plan | Credits | Price |
|---|---|---|
| Free | 10 / month | $0 |
| Starter | 50 / month | $9/mo |
| Pro | 150 / month | $29/mo |

Credits top up on plan upgrade. One credit is consumed per generation or improve run.

---

Made with ❤️ by Ansh
