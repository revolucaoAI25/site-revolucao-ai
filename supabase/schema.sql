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

-- Preenchidos pelo /api/asaas-webhook assim que o pagamento é confirmado —
-- cria automaticamente a conta do cliente na plataforma Lead Extractor via
-- API de provisionamento (ver src/lib/lead-extractor-api.ts) e guarda aqui
-- o id do usuário criado e a senha gerada, pra página de obrigado
-- (?checkoutId=...) mostrar o login pronto pro cliente.
alter table public.asaas_checkouts add column if not exists lead_extractor_user_id text;
alter table public.asaas_checkouts add column if not exists lead_extractor_password text;

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
  -- Preenchido pelo cliente no formulário de onboarding multi-etapas
  -- (/plataforma/onboarding?checkoutId=..., linkado a partir da página de
  -- obrigado quando agente_pronto é true) — objeto rico (ver OnboardingData
  -- em src/lib/onboarding-types.ts) com contato, tipo de atendimento,
  -- credenciais do Cal.com, dados do negócio, funil, script de atendimento,
  -- follow-ups, personalidade e FAQ, usado pra montar a primeira versão do
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

-- Bucket privado pra documentos enviados no formulário de onboarding
-- (CNPJ/documento pra verificação da Business Manager do Facebook, ver
-- etapa "facebook-bm" em OnboardingForm.tsx). Só a service role
-- acessa/gera link assinado — o upload passa por
-- /api/plataforma-business-info/upload-documento e a visualização no
-- admin por /api/admin/onboarding-documento-url, nunca direto do
-- navegador do cliente.
insert into storage.buckets (id, name, public)
values ('onboarding-documentos', 'onboarding-documentos', false)
on conflict (id) do nothing;

-- Painel /admin (dashboard, kanban e tabela): não precisa de nenhuma
-- tabela nova, só lê leads/asaas_checkouts acima com a service role,
-- depois que o Supabase Auth (login em /admin/login) já confirmou a
-- sessão. Pra criar o primeiro usuário que vai logar no admin: no painel
-- do Supabase, Authentication → Users → Add user (defina e-mail e senha
-- ali mesmo, não precisa de fluxo de cadastro).

-- ---------------------------------------------------------------------------
-- Métricas dos funis (/funil-10k e /zero-aos-10k-v2) — painel /admin/funis.
--
-- Cada linha é um evento de comportamento ANÔNIMO (visualizou a página,
-- chegou numa etapa, respondeu uma pergunta, clicou no checkout...). Não
-- guarda IP nem nome/telefone: só um id de sessão aleatório gerado no
-- navegador (sessionStorage). É por isso que dá pra ver até onde quem NÃO
-- chegou a preencher o formulário foi, e o que respondeu antes de sair.
-- Gravada por /api/track com a service role (RLS ligado, sem policy).
-- ---------------------------------------------------------------------------
create table if not exists public.funnel_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  page text not null,
  session_id text not null,
  event text not null,
  step text,
  data jsonb not null default '{}'::jsonb
);

create index if not exists funnel_events_page_created_idx
  on public.funnel_events (page, created_at desc);
create index if not exists funnel_events_session_idx
  on public.funnel_events (session_id);

alter table public.funnel_events enable row level security;

-- Números do painel, calculados no banco (assim o admin não puxa milhares
-- de linhas pro servidor). p_days = janela móvel, em dias.
create or replace function public.funnel_dashboard(p_page text, p_days integer default 7)
returns jsonb
language sql
stable
as $$
  with ev as (
    select * from public.funnel_events
    where page = p_page
      and created_at >= now() - make_interval(days => greatest(p_days, 1))
  ),
  sess as (
    select
      session_id,
      min(created_at) as first_seen,
      bool_or(event = 'contact_submit') as is_lead,
      bool_or(event = 'checkout_click') as clicked,
      bool_or(event in ('answer', 'scroll_depth', 'checkout_click')) as engaged,
      (array_agg(data order by created_at) filter (where event = 'page_view'))[1] as pv
    from ev
    group by session_id
  )
  select jsonb_build_object(
    'sessions', (select count(*) from sess),
    'leads', (select count(*) from sess where is_lead),
    'checkout_sessions', (select count(*) from sess where clicked),
    'engaged', (select count(*) from sess where engaged),
    'by_day', (
      select coalesce(jsonb_agg(d order by d.day), '[]'::jsonb) from (
        select to_char((first_seen at time zone 'America/Sao_Paulo')::date, 'YYYY-MM-DD') as day,
               count(*) as sessions,
               count(*) filter (where is_lead) as leads,
               count(*) filter (where clicked) as checkouts
        from sess group by 1
      ) d
    ),
    'by_step', (
      select coalesce(jsonb_agg(jsonb_build_object('step', s.step, 'sessions', s.n)), '[]'::jsonb) from (
        select step, count(distinct session_id) as n
        from ev where event = 'step_view' and step is not null group by step
      ) s
    ),
    'answers', (
      select coalesce(jsonb_agg(jsonb_build_object('question', a.q, 'label', a.l, 'sessions', a.n) order by a.q, a.n desc), '[]'::jsonb) from (
        select data->>'question' as q, data->>'label' as l, count(distinct session_id) as n
        from ev where event = 'answer' group by 1, 2
      ) a
    ),
    'scroll', (
      select coalesce(jsonb_agg(jsonb_build_object('percent', c.p, 'sessions', c.n) order by c.p), '[]'::jsonb) from (
        select (data->>'percent')::int as p, count(distinct session_id) as n
        from ev where event = 'scroll_depth' group by 1
      ) c
    ),
    'sections', (
      select coalesce(jsonb_agg(jsonb_build_object('section', c.s, 'sessions', c.n)), '[]'::jsonb) from (
        select data->>'section' as s, count(distinct session_id) as n
        from ev where event = 'section_view' group by 1
      ) c
    ),
    'ctas', (
      select coalesce(jsonb_agg(jsonb_build_object('location', c.loc, 'clicks', c.clicks, 'sessions', c.n)), '[]'::jsonb) from (
        select coalesce(data->>'location', 'outro') as loc, count(*) as clicks, count(distinct session_id) as n
        from ev where event = 'checkout_click' group by 1
      ) c
    ),
    'devices', (
      select coalesce(jsonb_agg(jsonb_build_object('key', c.k, 'sessions', c.n) order by c.n desc), '[]'::jsonb) from (
        select coalesce(pv->>'device', 'desconhecido') as k, count(*) as n from sess group by 1
      ) c
    ),
    'in_app', (
      select coalesce(jsonb_agg(jsonb_build_object('key', c.k, 'sessions', c.n) order by c.n desc), '[]'::jsonb) from (
        select coalesce(pv->>'in_app', 'desconhecido') as k, count(*) as n from sess group by 1
      ) c
    ),
    'utm_source', (
      select coalesce(jsonb_agg(jsonb_build_object('key', c.k, 'sessions', c.n) order by c.n desc), '[]'::jsonb) from (
        select coalesce(nullif(pv->>'utm_source', ''), '(direto)') as k, count(*) as n from sess group by 1
      ) c
    ),
    'utm_campaign', (
      select coalesce(jsonb_agg(jsonb_build_object('key', c.k, 'sessions', c.n) order by c.n desc), '[]'::jsonb) from (
        select coalesce(nullif(pv->>'utm_campaign', ''), '(sem campanha)') as k, count(*) as n from sess group by 1
      ) c
    )
  );
$$;

-- Últimas sessões, uma por visita: até onde foi, o que respondeu, se virou
-- lead ou clicou no checkout. É aqui que aparece quem respondeu só uma parte.
create or replace function public.funnel_recent_sessions(
  p_page text, p_days integer default 7, p_limit integer default 60
)
returns jsonb
language sql
stable
as $$
  with ev as (
    select * from public.funnel_events
    where page = p_page
      and created_at >= now() - make_interval(days => greatest(p_days, 1))
  ),
  agg as (
    select
      session_id,
      min(created_at) as first_seen,
      max(created_at) as last_seen,
      max(case when event = 'step_view' then (data->>'index')::int end) as max_step_index,
      max(case when event = 'scroll_depth' then (data->>'percent')::int end) as max_scroll,
      bool_or(event = 'contact_submit') as is_lead,
      bool_or(event = 'checkout_click') as clicked,
      (array_agg(data order by created_at) filter (where event = 'page_view'))[1] as pv,
      coalesce(
        jsonb_agg(jsonb_build_object('question', data->>'question', 'label', data->>'label') order by created_at)
          filter (where event = 'answer'),
        '[]'::jsonb
      ) as answers
    from ev
    group by session_id
    order by max(created_at) desc
    limit greatest(p_limit, 1)
  )
  select coalesce(jsonb_agg(to_jsonb(agg) order by agg.last_seen desc), '[]'::jsonb) from agg;
$$;

-- Só a service role (o painel /admin) chama essas funções — sem isso, a
-- chave pública (anon) conseguiria ler as métricas pela API do Supabase.
revoke all on function public.funnel_dashboard(text, integer) from public, anon, authenticated;
revoke all on function public.funnel_recent_sessions(text, integer, integer) from public, anon, authenticated;
grant execute on function public.funnel_dashboard(text, integer) to service_role;
grant execute on function public.funnel_recent_sessions(text, integer, integer) to service_role;
