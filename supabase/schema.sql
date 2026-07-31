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

create table if not exists public.memorial_stories (
  id                          uuid primary key default gen_random_uuid(),
  created_at                  timestamptz not null default now(),
  your_name                   text,
  contact                     text not null,
  person_name                 text not null,
  crash_date_location         text,
  relationship                text,
  share                       text,
  safety_change               text,
  participation               text[] not null default '{}',
  permission_display_name     boolean not null default false,
  permission_display_photos   boolean not null default false,
  permission_identify         boolean not null default false,
  status                      text not null default 'new'
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
create index if not exists memorial_stories_status_idx    on public.memorial_stories (status);

-- ---------------------------------------------------------------------------
-- Fix Broward expansion (2026-07): county-wide problem reports, business-
-- rescue applications, volunteers, newsletter, and the public issue tracker.
-- ---------------------------------------------------------------------------

create table if not exists public.problem_reports (
  id                       uuid primary key default gen_random_uuid(),
  created_at               timestamptz not null default now(),
  title                    text not null,
  category                 text not null,
  location                 text not null,
  city                     text not null,
  zip_code                 text,
  description              text not null,
  why_it_matters           text not null,
  first_noticed            text,
  ongoing                  text,
  prior_reported           text,
  prior_agency             text,
  case_number              text,
  media_url                text,
  submitter_name           text not null,
  submitter_email          text not null,
  submitter_phone          text,
  permission_contact       boolean not null default false,
  permission_publish_name  boolean not null default false,
  agree_terms              boolean not null default false,
  truth_confirmation       boolean not null default false,
  status                   text not null default 'new'
);

create table if not exists public.business_applications (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  business_name       text not null,
  owner_name          text not null,
  category            text not null,
  address             text not null,
  website             text,
  social_links        text,
  years_in_business   text,
  employee_count      text,
  main_challenge      text not null,
  requested_help      text not null,
  selection_reason    text,
  availability        text,
  contact_email       text not null,
  contact_phone       text,
  filming_permission  boolean not null default false,
  metrics_permission  boolean not null default false,
  status              text not null default 'new'
);

create table if not exists public.volunteers (
  id                   uuid primary key default gen_random_uuid(),
  created_at           timestamptz not null default now(),
  full_name            text not null,
  email                text not null,
  phone                text,
  city                 text,
  skills               text[] not null default '{}',
  project_preferences  text[] not null default '{}',
  availability         text,
  languages            text,
  message              text,
  permission_contact   boolean not null default false,
  status               text not null default 'new'
);

create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null unique,
  city        text,
  interests   text[] not null default '{}',
  unsubscribed_at timestamptz
);

-- Public issue tracker. Rows are created by admins (manually or from a
-- reviewed problem_report). Only is_published rows are shown on /tracker;
-- the site reads via the service-role key, so RLS stays locked down.
create table if not exists public.issues (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  published_at  timestamptz,
  is_published  boolean not null default false,
  slug          text unique,
  title         text not null,
  summary       text,
  city          text,
  category      text,
  agency        text,
  -- submitted · under_review · verified · routed · agency_contacted
  -- · official_response · action_planned · in_progress · resolved
  -- · closed · monitoring
  status        text not null default 'submitted',
  source_report uuid references public.problem_reports (id)
);

create index if not exists problem_reports_status_idx      on public.problem_reports (status);
create index if not exists problem_reports_category_idx    on public.problem_reports (category);
create index if not exists business_applications_status_idx on public.business_applications (status);
create index if not exists issues_published_idx            on public.issues (is_published, published_at desc);

-- ---------------------------------------------------------------------------
-- Row Level Security: lock everything down. The server uses the service-role
-- key which bypasses RLS; the public anon key gets nothing.
-- ---------------------------------------------------------------------------
alter table public.coalition_members        enable row level security;
alter table public.danger_reports           enable row level security;
alter table public.organization_endorsements enable row level security;
alter table public.memorial_stories         enable row level security;
alter table public.campaign_updates         enable row level security;
alter table public.problem_reports          enable row level security;
alter table public.business_applications    enable row level security;
alter table public.volunteers               enable row level security;
alter table public.newsletter_subscribers   enable row level security;
alter table public.issues                   enable row level security;
