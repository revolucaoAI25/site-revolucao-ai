# Revolução AI — Site institucional

Site em Next.js (App Router) + Tailwind CSS v4, com 3 páginas: Home,
Agentes de IA e Formação. Tema escuro com acento verde, conforme briefing.
Inclui também a LP própria do **Lead Extractor** (`/lead-extractor`), um
produto separado com header/footer próprios.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

- `src/app/(site)/` — grupo de rotas do site institucional (Home, Agentes de
  IA, Formação), com layout próprio (`(site)/layout.tsx`) que injeta o
  `Nav`, o `Footer` e o `ModalProvider`. O layout raiz (`src/app/layout.tsx`)
  só cuida de `<html>`/`<body>`, fontes e metadata — é o que permite o Lead
  Extractor existir como página separada, sem o menu do site principal.
  - `(site)/page.tsx` — Home
  - `(site)/agentes-de-ia/page.tsx` — página de vendas de Agentes de IA
  - `(site)/formacao/page.tsx` — página de vendas da Formação
- `src/app/lead-extractor/page.tsx` — LP própria do Lead Extractor (produto
  separado, header/footer próprios, sem o pop-up de qualificação). É o
  destino do resultado "só preciso de uma base de leads pra prospectar" do
  pop-up de Agentes de IA (`LEAD_EXTRACTOR_LINK` em `src/lib/links.ts`),
  aberta em nova aba. Vídeo de demonstração via
  `src/components/lead-extractor/PandaVideoEmbed.tsx` (Panda Video),
  calculadora de ROI interativa via
  `src/components/lead-extractor/ROICalculator.tsx` (funil estimado +
  faturamento/retorno, com base nos números que o visitante preenche) e
  screenshots reais em `public/lead-extractor/`. Os botões de assinatura
  (`LEAD_EXTRACTOR_CHECKOUT_MENSAL_LINK` / `..._ANUAL_LINK`) levam pro
  checkout próprio em `src/app/lead-extractor/assinar/`, que cria a
  assinatura direto na API do Asaas — ver seção **Checkout do Lead
  Extractor (Asaas)** abaixo.
- `src/app/plataforma/page.tsx` — LP do produto de entrada "Plataforma"
  (acesso self-service à Chatflux + add-on opcional Agente Pronto), mesmo
  padrão de página separada do Lead Extractor. É o destino do resultado
  "outro produto" do pop-up de Agentes de IA (`OUTRO_PRODUTO_LINK` em
  `src/lib/links.ts`), pra quem quer resultado com IA mas não tem
  orçamento pra implementação completa. Checkout próprio em
  `src/app/plataforma/assinar/`, ver seção **Checkout da Plataforma**
  abaixo.
- `src/components/` — componentes compartilhados (Nav, Footer, cards, FAQ, etc.)
- `src/components/modal/` — pop-up de qualificação (perguntas ramificadas) que
  abre nos CTAs principais
- `src/lib/qualification-flows.ts` — conteúdo do pop-up (perguntas, opções e
  para onde cada resposta leva). Os fluxos de **Agentes de IA** (`agentesFlow`)
  e de **Formação** (`formacaoFlow`) já são os reais, combinados com o
  cliente. O resultado "qualificado" de cada um abre uma agenda do Calendly
  **embutida no próprio pop-up** (`src/components/modal/CalendlyEmbed.tsx`),
  sem sair do site. O script do Calendly já começa a carregar assim que o
  pop-up abre (`ModalProvider`), antes mesmo do usuário responder as
  perguntas, pra agenda aparecer sem demora quando ele chegar no resultado.
  Antes de mostrar o resultado, os dois fluxos pedem nome, e-mail e WhatsApp
  (`src/components/modal/ContactForm.tsx`).
- `src/lib/links.ts` — WhatsApp, e-mail, Instagram, endereço, Calendly da
  apresentação do agente de IA, o ebook gratuito, o curso Zero aos 10K
  (baixo ticket) da Formação, a LP do Lead Extractor e a LP da Plataforma
  (`OUTRO_PRODUTO_LINK`) já são os reais. Agenda da reunião de vendas da
  Formação ainda **placeholder** (reaproveitando a do agente de IA).
- `src/app/api/lead/route.ts` — recebe o resultado final de cada pop-up
  (fluxo, respostas dadas e, no caso da Formação, nome/WhatsApp), salva no
  Supabase e encaminha pro webhook próprio do cliente, se configurado. Ver
  seção **Leads do pop-up (Supabase e webhook)** abaixo.
- `src/app/admin/` — painel interno (dashboard, kanban e tabela) com todo
  mundo que passou pelo pop-up ou pelos checkouts (Lead Extractor e
  Plataforma), protegido por login (Supabase Auth). Ver seção **Painel
  admin** abaixo.

## Pendências antes de publicar

1. **`CALENDLY_FORMACAO_LINK`** em `src/lib/links.ts` reutiliza o mesmo link
   do Calendly de Agentes de IA como placeholder (autorizado pelo cliente).
   Trocar pelo link definitivo da reunião de vendas da Formação assim que o
   cliente enviar.
2. **`LEAD_WEBHOOK_URL`** já tem o valor definitivo (Make.com) configurado em
   `.env.local` para rodar localmente. Falta só adicionar essa mesma
   variável em Project Settings → Environment Variables na Vercel antes do
   deploy de produção (arquivos `.env*` não vão pro Git, então essa etapa é
   manual).
3. **`ASAAS_API_KEY`** ainda não configurada — ver seção **Checkout do Lead
   Extractor (Asaas)** abaixo. Sem ela, o formulário de assinatura mostra um
   aviso pedindo pra falar pelo WhatsApp, sem quebrar o resto do site.

A logo oficial já está integrada (`public/logo.png`, usada em
`src/components/Logo.tsx` e como favicon em `src/app/icon.png`). O carrossel
de clientes (`src/components/ui/ClientLogos.tsx`) já usa as logos e fotos
reais enviadas, salvas em `public/clients/`. Para adicionar mais um cliente,
é só colocar o arquivo em `public/clients/` e acrescentar uma entrada no
array `clients` desse componente (`kind: "logo"` para marca ou `kind:
"person"` para avatar + nome, no estilo Instagram).

## Leads do pop-up (Supabase e webhook)

Toda vez que o pop-up de qualificação chega num resultado, o site salva no
Supabase: o fluxo (`agentes` ou `formacao`), o resultado final, a trilha de
perguntas/respostas e o nome, e-mail e WhatsApp da pessoa (os dois fluxos
pedem contato antes de mostrar o resultado). Quando o resultado tem agenda
do Calendly embutida, o widget avisa a página (via `postMessage`) assim
que a pessoa conclui um agendamento de verdade — `CalendlyEmbed.tsx`
escuta esse evento e `/api/lead/schedule` marca esse mesmo lead com
`scheduled_at`, pra aparecer como "agendou" no painel admin (ver abaixo).

Pra ativar o Supabase:

1. Criar um projeto no [Supabase](https://supabase.com).
2. Rodar `supabase/schema.sql` no SQL editor do projeto (cria a tabela
   `leads`, com RLS ligado e sem policy pública — só a service role grava).
3. Configurar as variáveis de ambiente (local em `.env.local`, e na Vercel
   em Project Settings → Environment Variables):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (a service role key, nunca a `anon` — essa
     fica só no servidor, nunca é exposta ao navegador)

Sem essas variáveis configuradas, o site funciona normalmente — a rota
`/api/lead` só loga um aviso e não salva nada, então dá pra publicar antes
do Supabase estar pronto.

Além do Supabase, só quando o resultado é o **material gratuito** (quem
não tem orçamento agora e vai receber o ebook) o lead também é encaminhado
pro webhook próprio do cliente — configurar a variável `LEAD_WEBHOOK_URL`
com a URL do Zapier/Make/n8n/CRM que deve recebê-lo. Os demais resultados
da Formação (baixo ticket, reunião) só ficam salvos no Supabase, sem
encaminhamento pro webhook. Sem essa variável configurada, esse
encaminhamento simplesmente não acontece (não afeta o Supabase nem o
funcionamento do pop-up).

## Checkout do Lead Extractor (Asaas)

O botão "Quero assinar" de cada plano leva pro formulário próprio em
`/lead-extractor/assinar?plano=mensal|anual` (nome, e-mail, CPF/CNPJ e
WhatsApp — o telefone vai pro Asaas **sem** o 55 do país, só DDD + número;
foi um bug já corrigido, o Asaas rejeita o número com o código do país
junto). Ao enviar, `src/app/api/asaas-subscription/route.ts` cria (ou
reaproveita, pelo CPF/CNPJ) o cliente no Asaas e cria o checkout
(`/v3/checkouts`, `src/lib/asaas.ts`) — dependendo do plano:

- **Mensal**: `chargeTypes: ["RECURRENT"]` — assinatura recorrente de
  verdade, sem data de fim, cancela quando quiser. Travada em
  `billingTypes: ["CREDIT_CARD"]` — o Asaas só aceita cartão pra cobrança
  recorrente automática (boleto/Pix são cobranças avulsas, não haveria
  como recobrar sozinho no ciclo seguinte). Já foi produção com
  `billingTypes` incluindo boleto/Pix nesse caso, e o Asaas rejeitava o
  checkout com "O campo billingTypes é inválido" — bug corrigido.
- **Anual**: `chargeTypes: ["INSTALLMENT"]` — cobrança única do valor
  cheio (R$4.044) parcelada em até 12x, travada em
  `billingTypes: ["CREDIT_CARD"]`. O parcelamento no cartão é autorizado de
  uma vez só pela operadora, então quem assina não consegue escapar do
  compromisso trocando de cartão ou deixando de pagar uma parcela no meio
  do caminho (o que aconteceria com boleto/Pix "parcelado", que são cobranças
  independentes a cada mês).

Em ambos os casos o navegador é redirecionado pro checkout hospedado no
próprio Asaas pra concluir o pagamento — o site nunca recebe nem processa
dado de cartão. Assim que a pessoa termina o checkout, o próprio Asaas
(via `callback.successUrl`) redireciona de volta pra
`/lead-extractor/assinar/obrigado`, avisando que o time entra em contato
nas próximas horas com os acessos.

### Registro do lead e ativação (Supabase)

Assim que o formulário é enviado — antes mesmo de saber se a pessoa vai
concluir o pagamento — os dados já são salvos na tabela
`public.asaas_checkouts` (`supabase/schema.sql`), com `status: 'iniciado'`,
pra não perder o lead se ela abandonar o checkout. Quando o webhook do
Asaas confirma o pagamento (`PAYMENT_CONFIRMED`/`PAYMENT_RECEIVED`), o
`/api/asaas-webhook` atualiza esse mesmo registro pra `status: 'confirmado'`
— é o "cliente ativo".

Variáveis de ambiente necessárias (local em `.env.local`, e na Vercel em
Project Settings → Environment Variables):

- `ASAAS_API_KEY` — chave de API da conta Asaas (produção).
- `ASAAS_ENV` — `production` (padrão, pode deixar de fora) ou `sandbox`
  pra testar contra o ambiente de testes do Asaas antes de ir com a chave
  de produção.
- `ASAAS_CHECKOUT_STARTED_WEBHOOK_URL` — opcional; URL do Make.com/Zapier/etc
  que recebe uma notificação assim que a pessoa envia o formulário
  (nome/e-mail/CPF-CNPJ/telefone/plano), antes mesmo de ir pro pagamento.
- `ASAAS_WEBHOOK_TOKEN` — opcional; se configurado, `/api/asaas-webhook`
  passa a exigir esse token no header `asaas-access-token` (configurável
  no painel do Asaas ao cadastrar o webhook), rejeitando o resto.
- `ASAAS_WEBHOOK_FORWARD_URL` — opcional; URL do Make.com/Zapier/etc que
  recebe uma notificação (já com nome/e-mail/telefone do cliente) toda vez
  que um pagamento é confirmado, pra alguém liberar o acesso manualmente
  (além da atualização automática no Supabase acima).

Sem `ASAAS_API_KEY` configurada, o formulário mostra um aviso pedindo pra
chamar no WhatsApp em vez de quebrar — dá pra publicar o resto do site
antes da chave estar pronta. Sem `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY`
configuradas, o registro do lead simplesmente não acontece (não quebra o
checkout). Falta configurar no painel do Asaas o webhook apontando pra
`/api/asaas-webhook` (eventos de pagamento).

## Checkout da Plataforma (produto de entrada, `/plataforma`)

Mesma ideia do Lead Extractor acima (checkout hospedado no Asaas, nunca
processa cartão no site), mas com uma diferença: o add-on **Agente
Pronto** soma uma taxa única de implementação (R$1.000) à assinatura
mensal do plano escolhido (Start/Growth/Scale) — e o Asaas não deixa
combinar uma cobrança única com uma recorrente no mesmo checkout. Por
isso, quando o cliente escolhe o Agente Pronto, o fluxo é **encadeado em
dois checkouts**:

1. `/plataforma/assinar?plano=X&agentePronto=1` → `POST
   /api/plataforma-subscription` cria o cliente no Asaas e o primeiro
   checkout, de cobrança única (`chargeTypes: ["DETACHED"]`) da taxa de
   R$1.000 (`createFeeCheckout`, `src/lib/asaas-plataforma.ts`).
2. Ao pagar, o Asaas redireciona (`callback.successUrl`) pra `GET
   /api/plataforma-subscription/continue`, que cria o **segundo**
   checkout — agora sim a assinatura mensal recorrente
   (`chargeTypes: ["RECURRENT"]`, `createSubscriptionCheckout`) — e
   redireciona de novo pro Asaas.
3. Só depois de pagar os dois é que o navegador chega em
   `/plataforma/assinar/obrigado`.

Sem o Agente Pronto, é só o passo 2 — igual ao Lead Extractor.

Cada tentativa fica registrada em `public.plataforma_checkouts`
(`supabase/schema.sql`), com `status` passando por `iniciado` →
`taxa_confirmada` (só quando tem Agente Pronto, ao pagar a taxa) →
`confirmado` (ao confirmar a assinatura). O `/api/asaas-webhook` já
existente distingue as duas cobranças pelo campo `payment.subscription`
do evento (presente só na cobrança recorrente).

Na página de obrigado, se o cliente escolheu Agente Pronto, aparece um
formulário pra contar sobre o negócio (o que vende, público-alvo,
objeções, etc.) — salvo em `business_info` (jsonb) via `POST
/api/plataforma-business-info`, pro time montar a primeira versão do
agente. Usa as mesmas variáveis de ambiente do Asaas já documentadas
acima (`ASAAS_API_KEY`, `ASAAS_ENV`, `ASAAS_CHECKOUT_STARTED_WEBHOOK_URL`,
`ASAAS_WEBHOOK_TOKEN`, `ASAAS_WEBHOOK_FORWARD_URL`) — não precisa de
nenhuma variável nova.

## Painel admin (`/admin`)

Visão completa de tudo que passa pelo site: quem preencheu o pop-up, quem
agendou reunião, quem iniciou o checkout do Lead Extractor ou da
Plataforma, e quem confirmou a compra. Três telas, todas lendo os mesmos
dados (`src/lib/admin-data.ts`, que junta `leads` + `asaas_checkouts` +
`plataforma_checkouts` num formato só):

- **`/admin`** — dashboard com números gerais (leads por fluxo, quantos
  agendaram, checkouts iniciados/confirmados e taxa de confirmação — do
  Lead Extractor e da Plataforma, separadamente) e um detalhamento por
  resultado do pop-up.
- **`/admin/kanban`** — cada registro (pop-up, Lead Extractor ou
  Plataforma) num card, organizado em 4 colunas por estágio: preencheu →
  agendou → iniciou checkout → confirmado. O estágio já vem preenchido
  automaticamente (pelo site, quando confirma um agendamento ou um
  pagamento), mas dá pra **arrastar um card pra outra coluna** a qualquer
  momento pra corrigir ou mover à mão — e editar
  (nome/e-mail/telefone/estágio) ou excluir cada card direto ali.
- **`/admin/tabela`** — tabela detalhada, com busca por nome/e-mail/telefone,
  filtro por fonte/estágio/data (De/Até, por dia), edição por linha, exclusão
  individual e exclusão em massa (seleciona várias linhas com as caixinhas e
  clica em "Excluir selecionados").

Toda edição/exclusão passa por `/api/admin/records` (`src/app/api/admin/records/route.ts`),
que exige sessão válida (verificada de novo ali, além do proxy — rota de
API não passa pelo layout do admin) antes de tocar no Supabase.

### Login (Supabase Auth)

O painel é protegido por login de verdade (e-mail/senha via Supabase
Auth) — `src/proxy.ts` (o antigo "middleware", renomeado nessa versão do
Next.js) barra qualquer acesso a `/admin/*` sem sessão válida, redirecionando
pra `/admin/login`; o layout em `src/app/admin/(dashboard)/layout.tsx`
repete a checagem do lado do servidor, como recomenda a documentação do
Next.js (proxy sozinho não é suficiente por causa de client-side
transitions).

Pra criar o primeiro usuário que vai logar: no painel do Supabase,
**Authentication → Users → Add user** (define e-mail e senha ali mesmo,
sem precisar de fluxo de cadastro no site).

Variáveis de ambiente necessárias, além das já usadas por
`SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY`:

- `NEXT_PUBLIC_SUPABASE_URL` — mesma URL do projeto Supabase (essa é
  pública, vai pro navegador).
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — a chave **anônima/pública** do
  projeto (Project Settings → API no painel do Supabase) — **não** é a
  service role key. É só o que a tela de login usa pra autenticar; a
  leitura dos dados de leads/checkouts continua sempre com a service role,
  do lado do servidor, só depois que a sessão já foi confirmada.

Sem essas duas variáveis, `/admin/*` (exceto `/admin/login`, que só
depende delas no momento de logar) retorna erro — o painel não tem como
funcionar sem login configurado, então aqui não existe modo "degradado";
o resto do site continua funcionando normalmente, já que o proxy só roda
nas rotas `/admin`.

## SEO

Sem mexer em conteúdo/estrutura das páginas, só na parte técnica:

- `src/app/robots.ts` e `src/app/sitemap.ts` — geram `/robots.txt` e
  `/sitemap.xml` dinamicamente (rotas nativas do Next.js). O sitemap lista
  as páginas públicas (Home, Agentes de IA, Formação, Lead Extractor,
  Plataforma); o robots bloqueia `/admin`, `/api` e as páginas de
  "obrigado" do checkout.
- `src/app/layout.tsx` — `metadataBase` corrigido pro domínio real
  (`https://www.revolucao-ai.com`, antes apontava pra um domínio errado),
  Open Graph + Twitter Card padrão (com imagem), e um JSON-LD de
  `Organization` (nome, logo, Instagram, telefone) pra melhorar como o
  Google entende o negócio.
- Cada página pública (`agentes-de-ia`, `formacao`, `lead-extractor`,
  `plataforma`) ganhou seu próprio `openGraph`/`twitter` (título e
  descrição específicos, em vez de herdar o genérico do layout raiz) e
  `alternates.canonical` apontando pro próprio caminho — isso deixa o
  preview de compartilhamento (WhatsApp, redes sociais) correto pra cada
  página, não só a genérica do site inteiro.
- `/admin/*` e `/admin/login` — `robots: { index: false, follow: false }`,
  pra garantir que o painel nunca apareça no Google mesmo que alguém
  linke pra lá (já são protegidos por login, isso é defesa extra).

Pendência sua: como o domínio mudou de provedor recentemente, confirma se
`www.revolucao-ai.com` é mesmo o domínio de produção configurado na
Vercel (foi o que apareceu marcado como "Production" na tela de domínios)
— se for o apex sem `www`, é só trocar o `siteUrl` em `src/app/layout.tsx`,
`src/app/robots.ts` e `src/app/sitemap.ts`.

## Deploy

Projeto pronto para deploy direto na [Vercel](https://vercel.com/new) (stack
padrão Next.js, sem configuração extra além das variáveis do Supabase acima,
se quiser os leads salvos desde o primeiro deploy).
