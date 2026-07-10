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
  para onde cada resposta leva). **Está com conteúdo placeholder** — ver seção
  abaixo.
- `src/lib/links.ts` — links de destino (WhatsApp, curso, agendamento).
  **Também placeholder.**

## Pendências antes de publicar

1. **Logos de clientes**: a seção "Empresas que já confiaram" (Home e
   Formação) já é um carrossel automático e infinito
   (`src/components/ui/ClientLogos.tsx`), hoje com os nomes em chips de
   texto no lugar das logos. Quando enviarem os arquivos, é só trocar cada
   item do array `clients` por uma `<Image>` mantendo a mesma lista — o
   carrossel e o fade nas bordas continuam funcionando do mesmo jeito.
2. **Fluxo real do pop-up**: as perguntas e ramificações do pop-up de
   qualificação (`src/lib/qualification-flows.ts`) estão com um fluxo
   placeholder só para o site funcionar de ponta a ponta. Assim que vocês
   definirem o fluxo real e para onde cada resposta deve levar, é só
   substituir o conteúdo desse arquivo.
3. **Links de destino**: `src/lib/links.ts` aponta tudo para um número de
   WhatsApp de exemplo. Trocar pelo WhatsApp oficial, link do curso/checkout
   e link de agendamento reais.

A logo oficial já está integrada (`public/logo.png`, usada em
`src/components/Logo.tsx` e como favicon em `src/app/icon.png`).

## Deploy

Projeto pronto para deploy direto na [Vercel](https://vercel.com/new) (stack
padrão Next.js, sem configuração extra). Se surgir necessidade de banco de
dados (ex. armazenar leads capturados no pop-up), a recomendação é
[Supabase](https://supabase.com).
