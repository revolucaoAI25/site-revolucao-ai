-- Rodar no SQL editor do projeto Supabase.
-- Guarda cada resposta final do pop-up de qualificação (Agentes de IA e
-- Formação). Nome e telefone só são preenchidos pelo fluxo de Formação, que
-- pede contato antes de mostrar o resultado; Agentes de IA fica anônimo.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  flow_id text not null,
  result_key text not null,
  answers jsonb not null default '[]'::jsonb,
  name text,
  phone text
);

create index if not exists leads_flow_id_idx on public.leads (flow_id);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Nenhuma policy de select/insert pra role anônima/autenticada: só a
-- service role (usada pela API route do site, no servidor) grava e lê,
-- porque a service role sempre ignora RLS.
