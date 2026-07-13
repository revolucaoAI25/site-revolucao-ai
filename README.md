# Revolução AI — Site institucional

Site em Next.js (App Router) + Tailwind CSS v4, com 3 páginas: Home,
Agentes de IA e Formação. Tema escuro com acento verde, conforme briefing.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

- `src/app/page.tsx` — Home
- `src/app/agentes-de-ia/page.tsx` — página de vendas de Agentes de IA
- `src/app/formacao/page.tsx` — página de vendas da Formação
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
  apresentação do agente de IA e o ebook gratuito da Formação já são os
  reais. Agenda da reunião de vendas da Formação, ferramenta de extração de
  leads, "outro produto" e produto de baixo ticket ainda **placeholder**.
- `src/app/api/lead/route.ts` — recebe o resultado final de cada pop-up
  (fluxo, respostas dadas e, no caso da Formação, nome/WhatsApp), salva no
  Supabase e encaminha pro webhook próprio do cliente, se configurado. Ver
  seção **Leads do pop-up (Supabase e webhook)** abaixo.

## Pendências antes de publicar

1. **Links ainda placeholder** em `src/lib/links.ts`, todos apontando pro
   WhatsApp oficial como fallback:
   - `FERRAMENTA_EXTRACAO_LINK` (ferramenta de extração de leads, Agentes de IA);
   - `OUTRO_PRODUTO_LINK` (oferta pra quem não fecha o ticket da implementação
     completa, Agentes de IA);
   - `PRODUTO_LOW_TICKET_LINK` (Formação, orçamento até R$3.000).

   Trocar pelas páginas/links definitivos de cada um quando estiverem prontos.
2. **`CALENDLY_FORMACAO_LINK`** em `src/lib/links.ts` reutiliza o mesmo link
   do Calendly de Agentes de IA como placeholder (autorizado pelo cliente).
   Trocar pelo link definitivo da reunião de vendas da Formação assim que o
   cliente enviar.
3. **`LEAD_WEBHOOK_URL`** já tem o valor definitivo (Make.com) configurado em
   `.env.local` para rodar localmente. Falta só adicionar essa mesma
   variável em Project Settings → Environment Variables na Vercel antes do
   deploy de produção (arquivos `.env*` não vão pro Git, então essa etapa é
   manual).

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

## Deploy

Projeto pronto para deploy direto na [Vercel](https://vercel.com/new) (stack
padrão Next.js, sem configuração extra além das variáveis do Supabase acima,
se quiser os leads salvos desde o primeiro deploy).
