-- Run this in Supabase SQL Editor
-- Project: pagina-agenciaweb / Woxi

create table if not exists quotes (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now() not null,

  -- Contact
  contact_name  text,
  business_name text,
  business_type text,
  email         text,
  whatsapp      text,

  -- Project
  site_type     text,
  page_count    text,
  features      text[] default '{}',
  urgency       text,
  content_status text,
  notes         text,

  -- Estimate
  estimate_min  numeric,
  estimate_max  numeric,
  currency      text default 'COP',

  -- Brand assets
  brand_colors  text[] default '{}',
  logo_url      text,
  brand_images  text[] default '{}',

  -- Admin
  status        text default 'nuevo' check (status in ('nuevo','en_proceso','completado','cancelado')),
  admin_notes   text
);

-- Enable Row Level Security
alter table quotes enable row level security;

-- Service role (API route) can insert from public form (no auth needed)
create policy "service_role_all" on quotes
  using (true)
  with check (true);

-- Authenticated users (admin panel) can read/update everything
create policy "admin_select" on quotes
  for select to authenticated
  using (true);

create policy "admin_update" on quotes
  for update to authenticated
  using (true)
  with check (true);
