# Safe 441

A one-page **action and evidence** website for a nonpartisan community effort to make
US 441 safer between Sheridan Street and Griffin Road, in central Broward County.

It is intentionally *not* a large informational site. A visitor can immediately:

1. **Join the coalition**
2. **Report a dangerous location**
3. **Read / endorse the official proposal**
4. **Follow the campaign's progress**

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Supabase** (Postgres) for submissions — server-side, service-role only
- **Resend** for confirmation + private notification emails
- Deploy target: **Vercel**

## Sections

Hero · The official request · The problem · Corridor map (inline SVG) ·
Report a dangerous location (form) · Join the coalition (form) · Progress tracker ·
Principles · Research & proposal · Founding coalition · Transparency statement ·
Contact · Footer disclaimer.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in Supabase + Resend keys (optional for UI work)
npm run dev                  # http://localhost:3000
```

Without env vars, forms still submit successfully in the UI; the server logs a warning
and skips the database write / email send. Set the vars before launch.

## Database setup

Run [`supabase/schema.sql`](supabase/schema.sql) once in the Supabase SQL editor.
It creates four tables — `coalition_members`, `danger_reports`,
`organization_endorsements`, `campaign_updates` — each with a `status` column
(`new · needs_review · verified · added_to_evidence_map · sent_to_agency ·
agency_responded · resolved · closed`). Row Level Security is enabled with no public
policies; only the server's service-role key can read or write.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-role key (server only — never exposed to the client) |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `Safe 441 <hello@safe441.org>` |
| `CAMPAIGN_EMAIL` | Inbox for private submission notifications |

## Deploy to Vercel

1. Import this repo in Vercel.
2. Add the environment variables above (Production + Preview).
3. Deploy. Point `safe441.org` at the Vercel project.

## Customizing

- **Hero background:** drop a muted photo/video of the corridor at `public/corridor.jpg`
  and wire it into `.hero-bg` in [`components/Hero.tsx`](components/Hero.tsx).
- **Proposal documents:** put PDFs in `public/docs/` and flip the `ready` flags /
  add hrefs in [`components/Proposal.tsx`](components/Proposal.tsx).
- **Progress tracker:** update the `steps` array in
  [`components/Progress.tsx`](components/Progress.tsx) as the campaign advances.
- **Founding coalition:** replace the placeholder tiles in
  [`components/FoundingCoalition.tsx`](components/FoundingCoalition.tsx) only with
  supporters who have given permission.

## Principle baked into the build

No imaginary supporters, and nothing marked "complete" before it is. The site
truthfully reflects that Safe 441 is an independent community initiative, **not** an
official program of FDOT, Broward County, Hollywood, Davie, or any public-safety agency.
