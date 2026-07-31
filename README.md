# Broward Forward

A local media and community project exploring practical ways to improve life across
Broward County — highlighting what already works, listening to the people affected,
and testing realistic ideas on a local scale.

**Meet Broward. Imagine better. Test ideas. Follow the progress.**

Projects include the first series **What Would Make Broward Better?** (street
interviews around one question), **A Safer 441** (listening, learning, and exploring
practical improvements for US 441 between Sheridan Street and Griffin Road), the
**Project Tracker**, and **Business Rescue**. A visitor can immediately:

1. **Share an idea or concern**
2. **Explore A Safer 441**
3. **Follow the Project Tracker**
4. **Get involved / apply for Business Rescue**

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Supabase** (Postgres) for submissions — server-side, service-role only
- **Resend** for confirmation + private notification emails
- Deploy target: **Vercel**

## Sections

Hero · The official request · The problem · Corridor map (inline SVG) ·
Report a dangerous location (form) · Join the coalition (form) ·
Remembering Lives Lost on 441 (voluntary memorial form) · Progress tracker ·
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
It creates five tables — `coalition_members`, `danger_reports`,
`organization_endorsements`, `memorial_stories`, `campaign_updates` — each with a `status` column
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
