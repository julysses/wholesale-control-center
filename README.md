# WholesaleOS — AI-Powered Wholesale Real Estate Control Center

A full-stack web application that serves as the single operating hub for managing the entire wholesale real estate pipeline — from lead generation through closed deals — powered by Claude AI agents.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS v4 |
| Backend / Database | Supabase (PostgreSQL + Auth + Edge Functions + Realtime) |
| AI Agents | Anthropic Claude API (`claude-sonnet-4-5`) |
| State Management | Zustand |
| Data Fetching | TanStack React Query |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Routing | React Router v6 |
| Notifications | Sonner |
| Drag & Drop | @dnd-kit |
| CSV Parsing | Papa Parse |

---

## Features Built

### Dashboard (`/`)
- 4 KPI cards: Active Leads, Under Contract (with value), Closed This Month (with fees), Pipeline Value
- Pipeline by Stage bar chart (Recharts)
- Real-time activity feed (last 15 outreach events)
- Today's Tasks sidebar panel
- Hot Leads panel (score ≥ 13)
- Upcoming Closings panel (next 14 days)
- Deals by Stage progress breakdown

### Leads (`/leads`)
- Paginated lead table (50/page) with full filtering: status, source, motivation tag, search
- Color-coded score badges (Red 0–7 / Yellow 8–12 / Green 13–15)
- Add Lead modal with all property + owner fields
- CSV Import modal with drag-and-drop, column mapping UI, 5-row preview, chunked batch insert
- Lead Detail Drawer with:
  - 5-factor score sliders (Motivation / Timeline / Equity / Condition / Flexibility)
  - Full field editing
  - AI Qualifier output panel
  - Seller notes + internal notes

### Pipeline (`/pipeline`)
- Drag-and-drop Kanban board (6 columns: Offer Made → Closed)
- Optimistic UI updates with Supabase rollback on error
- Deal cards showing address, contract price, assignment fee, closing countdown
- Deal Detail Modal with financials, dates, title company, notes, stage selector
- Column totals (contract value + fees)

### Deal Analyzer (`/analyzer`)
- Property info + condition selector
- Up to 6 comparable sales with distance-weighted ARV calculation
- Itemized repair line items (foundation, roof, HVAC, plumbing, electrical, cosmetic)
- MAO formula display: ARV × 70% − Repairs − Fee = MAO
- 3 profit scenarios (at MAO, 5% below, 10% below)
- AI-generated deal recommendation via Claude

### Buyers (`/buyers`)
- Buyer table with tier badges (A = Gold / B = Blue / C = Gray)
- Add/Edit Buyer modal with:
  - Multi-zip target input
  - Strategy toggle pills (fix/flip, buy/hold, BRRRR, STR)
  - Property type multi-select
  - POF verification + amount
- Blast New Deal modal: AI-matches buyers to a deal, generates email + SMS blast templates

### AI Agents (`/ai-agents`)
Four Claude-powered agent panels:

1. **Lead Qualifier** — Scores seller conversations on 5 dimensions (1–3 each), outputs HOT/WARM/COLD tier, summary, next action, key risks. Auto-updates lead scores in Supabase.
2. **Offer Generator** — Generates 3 strategic offer options with verbal pitches + objection-handling scripts tailored to the seller's motivation.
3. **Outreach Writer** — Generates 3 variations of SMS, email, voicemail script, or direct mail copy. Tone selector (Friendly / Professional / Urgent).
4. **Buyer Matcher** — Filters buyer database by buy-box criteria, ranks matches with AI fit scores, generates blast email + SMS templates.

### Tasks (`/tasks`)
- Tasks grouped by Overdue / Today / Upcoming
- Quick-add inline form (title + due date)
- Full task modal (title, description, priority, type, due date, status)
- One-click complete with timestamp
- Filters: status, priority, type

### Reports (`/reports`)
- Date range selector (30 days / 90 days / Month to date / Year to date)
- Deal Performance: closed count, total fees, avg fee, avg days to close, monthly bar chart
- Lead Funnel: source donut chart, conversion funnel progress bars
- Pipeline Health: active deals by stage, pipeline value, at-risk deals (closing < 7 days)
- Buyer Activity: tier pie chart, top buyers leaderboard, strategy breakdown

---

## Project Structure

```
wholesale-control-center/
├── src/
│   ├── components/
│   │   ├── ui/             # badge, button, input, select, modal, card, skeleton, textarea
│   │   ├── layout/         # Sidebar, TopBar, Layout
│   │   ├── dashboard/      # KPICard, PipelineChart, ActivityFeed, DealsByStage
│   │   └── pipeline/       # DealCard, KanbanColumn
│   ├── pages/              # Dashboard, Leads, Pipeline, DealAnalyzer, Buyers, AIAgents, Tasks, Reports
│   ├── stores/             # useUIStore, useLeadStore, useDealStore (Zustand)
│   ├── hooks/              # useLeads, useDeals, useBuyers, useTasks, useAIAgent
│   ├── lib/                # supabase.ts, utils.ts
│   └── types/              # index.ts (all TypeScript interfaces)
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── functions/
│       ├── qualify-lead/
│       ├── generate-offer/
│       ├── write-outreach/
│       └── match-buyers/
├── .env.local              # gitignored — fill in your keys
└── package.json
```

---

## Setup & Installation

### 1. Clone and install

```bash
git clone https://github.com/julysses/wholesale-control-center.git
cd wholesale-control-center
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to **Settings → API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key (keep this safe — server-side only)

### 3. Configure environment variables

Fill in `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_NAME=WholesaleOS
```

### 4. Run the database migration

In the Supabase dashboard, go to **SQL Editor** and run the full contents of:

```
supabase/migrations/001_initial_schema.sql
```

This creates all 7 tables (leads, deals, buyers, tasks, outreach_activity, comps, ai_agent_log), indexes, RLS policies, and triggers.

### 5. Set up Supabase CLI and deploy Edge Functions

```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

Set the Edge Function secrets:

```bash
supabase secrets set ANTHROPIC_API_KEY=your_anthropic_api_key
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Deploy all 4 AI agent functions:

```bash
supabase functions deploy qualify-lead
supabase functions deploy generate-offer
supabase functions deploy write-outreach
supabase functions deploy match-buyers
```

### 6. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Deployment (Vercel — Recommended)

```bash
npm install -g vercel
vercel
```

Set these environment variables in the Vercel dashboard (Settings → Environment Variables):

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_APP_NAME
```

The Supabase Edge Functions run on Supabase's own servers — no additional server setup needed.

---

## Next Steps & Remaining Features

### High Priority

- [ ] **Authentication** — Add Supabase Auth login page (email/password). Currently the app assumes an authenticated session. Need a `/login` route, session guard on the Layout, and redirect on sign-out.
- [ ] **Fix TypeScript build errors** — Run `npm run build` and resolve any remaining type errors from the initial scaffolding pass (unused imports, strict null checks, etc.)
- [ ] **Test dev server end-to-end** — Connect a real Supabase project, add sample data, and verify all pages render and CRUD operations work correctly.

### Features to Build

- [ ] **Lead Detail — Outreach Timeline tab** — A chronological log of all SMS, calls, emails for a lead, color-coded by channel with inbound/outbound alignment (left/right like iMessage).
- [ ] **Lead Detail — Comps section** — Allow adding comparable sales directly from the Lead Detail drawer and auto-calculate ARV.
- [ ] **Deal Analyzer → Save to Lead** — "Save Analysis" button on the Deal Analyzer that writes ARV, repairs, and MAO back to the linked lead record in Supabase.
- [ ] **Pipeline → Move Lead to Pipeline** — A "Move to Pipeline" action on the Leads table that creates a Deal record from a Lead with one click.
- [ ] **Log Activity modal** — A quick modal to log SMS/call/email/voicemail/mail from the lead table row actions (currently the button exists but opens no modal).
- [ ] **Realtime updates** — Subscribe to Supabase Realtime on the `deals` and `tasks` tables so the Kanban board and task list update live when teammates make changes.
- [ ] **Tasks — Link to Lead/Deal** — When creating a task, add dropdowns to link it to a specific lead or deal record (currently the schema supports it but the UI doesn't expose it).
- [ ] **Notifications** — Wire the TopBar bell icon to show tasks due today that haven't been completed. Use Supabase Realtime for live badge count.
- [ ] **Global search** — The TopBar search currently navigates to `/leads?search=...` — expand to also search deals, buyers, and tasks.
- [ ] **Mark DNC** — Implement the "Mark DNC" row action in the Leads table (set `dnc = true`, `status = 'dnc'`).
- [ ] **Reports — Export to CSV** — Add export buttons on each report card to download the underlying data as CSV.
- [ ] **Buyer blast — Send + log** — After generating the blast in the Buyer Match modal, add a "Send Blast" button that logs an `outreach_activity` record for each buyer.
- [ ] **Deal documents** — Implement the PSA and assignment agreement upload area in the Deal Detail modal (Supabase Storage).

### Polish & Production Hardening

- [ ] **Loading skeletons** — Add skeleton loaders to the Pipeline board columns and Dashboard panels.
- [ ] **Empty states** — Add illustrated empty state components to Leads, Buyers, Pipeline, and Tasks when there's no data.
- [ ] **Error boundaries** — Add React error boundaries around each page so one failing component doesn't crash the whole app.
- [ ] **Responsive / tablet layout** — Test and fix layout at 768px width. The Kanban board needs horizontal scroll on smaller screens.
- [ ] **Supabase Auth — Team access** — Add user management so the team lead can invite agents. Update RLS policies to scope leads to `assigned_to = auth.uid()` per user if needed.
- [ ] **Performance** — Implement list virtualization (e.g. `@tanstack/react-virtual`) for the Leads table when row count exceeds 500.
- [ ] **Deal Analyzer — Save comps** — After calculating ARV, save each comp as a `comps` record in Supabase linked to the selected lead.
- [ ] **Recurring tasks** — Auto-create a "Review new inbound leads" task daily at 7am (can be done via a Supabase cron job or pg_cron).
- [ ] **Audit trail** — Log all status changes to `outreach_activity` or a new `audit_log` table so you have a full history of who changed what and when.

### Integrations (Future)

- [ ] **Twilio SMS** — Replace manual SMS logging with actual sending via a Supabase Edge Function that calls the Twilio API.
- [ ] **SendGrid / Resend email** — Send outreach emails directly from the app with tracking.
- [ ] **PropStream / BatchLeads webhook** — Auto-import new leads via webhook instead of CSV.
- [ ] **DocuSign / HelloSign** — Send PSA and assignment agreements for e-signature directly from the Deal Detail page.
- [ ] **Google Calendar sync** — Sync tasks and closing dates to Google Calendar.

---

## Database Schema Overview

| Table | Purpose |
|---|---|
| `leads` | All seller leads with qualification scores, contact info, financial estimates |
| `deals` | Active pipeline deals linked to leads, with financials and stage tracking |
| `buyers` | Buyer database with buy-box criteria and tier ratings |
| `tasks` | Follow-up tasks linked to leads, deals, or buyers |
| `outreach_activity` | Every SMS, call, email, voicemail logged per lead |
| `comps` | Comparable sales entries linked to leads for ARV calculation |
| `ai_agent_log` | Full log of every AI agent run with input/output/token usage |

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary (Navy) | `#1B3A5C` | Sidebar, buttons, headers |
| Accent (Orange) | `#E8720C` | CTAs, active nav, hot badges |
| Secondary (Blue) | `#2E6DA4` | Links, info states |
| Background | `#F2F4F6` | Page background |
| Cards | `#FFFFFF` | Card surfaces |

---

## Scripts

```bash
npm run dev        # Start development server (localhost:5173)
npm run build      # TypeScript check + production build
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```
