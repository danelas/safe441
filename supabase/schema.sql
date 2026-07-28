-- Safe 441 — database schema
-- Run this in the Supabase SQL editor (or via the CLI) once per project.
-- Tables are written to only from the server (service-role key), so RLS is
-- enabled with NO public policies: the anon key cannot read or write these rows.

-- ---------------------------------------------------------------------------
-- Shared status values used across submission tables:
--   new · needs_review · verified · added_to_evidence_map · sent_to_agency
--   · agency_responded · resolved · closed
-- ---------------------------------------------------------------------------

create table if not exists public.coalition_members (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  full_name          text not null,
  email              text not null,
  phone              text,
  city               text,
  organization       text,
  connection         text,
  participation      text[] not null default '{}',
  skills             text,
  availability       text,
  message            text,
  permission_contact boolean not null default false,
  permission_public  boolean not null default false,
  status             text not null default 'new'
);

create table if not exists public.danger_reports (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  location            text not null,
  direction           text,
  concern_type        text not null,
  observed_at         text,
  repeats             text,
  travel_mode         text,
  description         text not null,
  media_url           text,
  reported_to_agency  text,
  agency_case_number  text,
  reporter_name       text,
  reporter_email      text,
  permission_contact  boolean not null default false,
  permission_media    boolean not null default false,
  public_display      text,
  status              text not null default 'new'
);

create table if not exists public.organization_endorsements (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  organization_name  text not null,
  contact_name       text,
  contact_email      text,
  role_title         text,
  website            text,
  logo_url           text,
  statement          text,
  permission_public  boolean not null default false,
  status             text not null default 'new'
);

create table if not exists public.campaign_updates (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  published_at timestamptz,
  title        text not null,
  body         text,
  is_published boolean not null default false
);

-- Helpful indexes for the admin views you'll build later.
create index if not exists coalition_members_status_idx on public.coalition_members (status);
create index if not exists danger_reports_status_idx     on public.danger_reports (status);
create index if not exists danger_reports_concern_idx    on public.danger_reports (concern_type);

-- ---------------------------------------------------------------------------
-- Row Level Security: lock everything down. The server uses the service-role
-- key which bypasses RLS; the public anon key gets nothing.
-- ---------------------------------------------------------------------------
alter table public.coalition_members        enable row level security;
alter table public.danger_reports           enable row level security;
alter table public.organization_endorsements enable row level security;
alter table public.campaign_updates         enable row level security;
