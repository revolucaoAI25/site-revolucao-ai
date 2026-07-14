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
  No fluxo de **Formação**, antes de mostrar o resultado o pop-up pede nome
  e WhatsApp (`src/components/modal/ContactForm.tsx`) — o de **Agentes de
  IA** não pede, fica anônimo.
- `src/lib/links.ts` — WhatsApp, e-mail, Instagram, endereço, Calendly da
  apresentação do agente de IA, o ebook gratuito, o curso Zero aos 10K
  (baixo ticket) da Formação e a LP do Lead Extractor já são os reais.
  Agenda da reunião de vendas da Formação, "outro produto" e o checkout do
  Lead Extractor ainda **placeholder**.
- `src/app/api/lead/route.ts` — recebe o resultado final de cada pop-up
  (fluxo, respostas dadas e, no caso da Formação, nome/WhatsApp), salva no
  Supabase e encaminha pro webhook próprio do cliente, se configurado. Ver
  seção **Leads do pop-up (Supabase e webhook)** abaixo.

## Pendências antes de publicar

1. **Links ainda placeholder** em `src/lib/links.ts`, apontando pro
   WhatsApp oficial como fallback:
   - `OUTRO_PRODUTO_LINK` (oferta pra quem não fecha o ticket da implementação
     completa, Agentes de IA).

   Trocar pela página/link definitivo quando estiver pronto.
2. **`CALENDLY_FORMACAO_LINK`** em `src/lib/links.ts` reutiliza o mesmo link
   do Calendly de Agentes de IA como placeholder (autorizado pelo cliente).
   Trocar pelo link definitivo da reunião de vendas da Formação assim que o
   cliente enviar.
3. **`LEAD_WEBHOOK_URL`** já tem o valor definitivo (Make.com) configurado em
   `.env.local` para rodar localmente. Falta só adicionar essa mesma
   variável em Project Settings → Environment Variables na Vercel antes do
   deploy de produção (arquivos `.env*` não vão pro Git, então essa etapa é
   manual).
4. **`ASAAS_API_KEY`** ainda não configurada — ver seção **Checkout do Lead
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
perguntas/respostas e — só no fluxo de Formação — nome e WhatsApp da pessoa
(Agentes de IA fica anônimo, sem pedir contato).

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
  verdade, sem data de fim — cartão, boleto ou Pix, cancela quando quiser.
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

## Deploy

Projeto pronto para deploy direto na [Vercel](https://vercel.com/new) (stack
padrão Next.js, sem configuração extra além das variáveis do Supabase acima,
se quiser os leads salvos desde o primeiro deploy).
