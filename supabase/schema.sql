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

-- Preenchido quando a pessoa efetivamente marca um horário na agenda do
-- Calendly embutida no resultado do pop-up (ver CalendlyEmbed.tsx e
-- /api/lead/schedule) — só se aplica a resultados com agenda embutida.
alter table public.leads add column if not exists scheduled_at timestamptz;

-- Estágio do lead no painel /admin (kanban) — começa em 'preencheu' ou
-- 'agendou' automaticamente (evento real), mas pode ser movido à mão no
-- kanban a qualquer momento (ver /api/admin/records).
alter table public.leads add column if not exists stage text;
update public.leads
  set stage = case when scheduled_at is not null then 'agendou' else 'preencheu' end
  where stage is null;

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

-- Mesma ideia do leads.stage acima — estágio no kanban, editável à mão.
alter table public.asaas_checkouts add column if not exists stage text;
update public.asaas_checkouts
  set stage = case when status = 'confirmado' then 'confirmado' else 'iniciou-checkout' end
  where stage is null;

create index if not exists asaas_checkouts_customer_id_idx
  on public.asaas_checkouts (asaas_customer_id);
create index if not exists asaas_checkouts_created_at_idx
  on public.asaas_checkouts (created_at desc);

alter table public.asaas_checkouts enable row level security;

-- Mesma regra do leads: sem policy pra anon/authenticated, só a service
-- role (usada pelas rotas /api/asaas-subscription e /api/asaas-webhook)
-- grava e atualiza.

-- Registra cada tentativa de assinatura do produto de entrada "Plataforma"
-- (/plataforma — acesso self-service à Chatflux, com ou sem o add-on
-- Agente Pronto). `agente_pronto` = true segue um checkout encadeado: taxa
-- única de implementação primeiro (status vai pra 'taxa_confirmada'), só
-- depois a assinatura mensal (status vira 'confirmado'). Sem o add-on, vai
-- direto de 'iniciado' pra 'confirmado', igual ao asaas_checkouts acima.
create table if not exists public.plataforma_checkouts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  plano text not null,
  agente_pronto boolean not null default false,
  nome text not null,
  email text not null,
  cpf_cnpj text not null,
  telefone text not null,
  asaas_customer_id text,
  status text not null default 'iniciado',
  confirmed_at timestamptz,
  -- Preenchido pelo cliente na página de obrigado, só quando agente_pronto
  -- é true — informações do negócio pra gente montar a primeira versão do
  -- agente (ver /api/plataforma-business-info).
  business_info jsonb,
  stage text
);

create index if not exists plataforma_checkouts_customer_id_idx
  on public.plataforma_checkouts (asaas_customer_id);
create index if not exists plataforma_checkouts_created_at_idx
  on public.plataforma_checkouts (created_at desc);

alter table public.plataforma_checkouts enable row level security;

-- Mesma regra das tabelas acima: sem policy pra anon/authenticated, só a
-- service role (usada pelas rotas /api/plataforma-subscription,
-- /api/plataforma-business-info e /api/asaas-webhook) grava e atualiza.

-- Painel /admin (dashboard, kanban e tabela): não precisa de nenhuma
-- tabela nova, só lê leads/asaas_checkouts acima com a service role,
-- depois que o Supabase Auth (login em /admin/login) já confirmou a
-- sessão. Pra criar o primeiro usuário que vai logar no admin: no painel
-- do Supabase, Authentication → Users → Add user (defina e-mail e senha
-- ali mesmo, não precisa de fluxo de cadastro).
