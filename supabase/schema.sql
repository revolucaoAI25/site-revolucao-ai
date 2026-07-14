-- Rodar no SQL editor do projeto Supabase.
-- Guarda cada resposta final do pop-up de qualificação (Agentes de IA e
-- Formação) — os dois fluxos pedem nome, WhatsApp e e-mail antes de
-- mostrar o resultado.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  flow_id text not null,
  result_key text not null,
  answers jsonb not null default '[]'::jsonb,
  name text,
  phone text
);

-- Rodar em bancos já existentes (criados antes do e-mail passar a ser
-- coletado no pop-up): adiciona a coluna sem quebrar o que já existe.
alter table public.leads add column if not exists email text;

create index if not exists leads_flow_id_idx on public.leads (flow_id);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Nenhuma policy de select/insert pra role anônima/autenticada: só a
-- service role (usada pela API route do site, no servidor) grava e lê,
-- porque a service role sempre ignora RLS.

-- Registra cada tentativa de assinatura do Lead Extractor (checkout do
-- Asaas), desde o momento em que a pessoa envia o formulário — mesmo que
-- ela abandone antes de pagar. `status` vai de 'iniciado' pra 'confirmado'
-- quando o webhook de pagamento confirmado chega (ver /api/asaas-webhook).
create table if not exists public.asaas_checkouts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  plano text not null,
  nome text not null,
  email text not null,
  cpf_cnpj text not null,
  telefone text not null,
  asaas_customer_id text,
  status text not null default 'iniciado',
  confirmed_at timestamptz
);

create index if not exists asaas_checkouts_customer_id_idx
  on public.asaas_checkouts (asaas_customer_id);
create index if not exists asaas_checkouts_created_at_idx
  on public.asaas_checkouts (created_at desc);

alter table public.asaas_checkouts enable row level security;

-- Mesma regra do leads: sem policy pra anon/authenticated, só a service
-- role (usada pelas rotas /api/asaas-subscription e /api/asaas-webhook)
-- grava e atualiza.
