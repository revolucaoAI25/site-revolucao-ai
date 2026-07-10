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
  sem sair do site.
- `src/lib/links.ts` — WhatsApp, e-mail, Instagram, endereço e Calendly da
  apresentação do agente de IA já são os reais. Agenda da reunião de vendas
  da Formação, ferramenta de extração de leads, "outro produto", produto
  gratuito e produto de baixo ticket ainda **placeholder**.

## Pendências antes de publicar

1. **Links ainda placeholder** em `src/lib/links.ts`, todos apontando pro
   WhatsApp oficial como fallback:
   - `FERRAMENTA_EXTRACAO_LINK` (ferramenta de extração de leads, Agentes de IA);
   - `OUTRO_PRODUTO_LINK` (oferta pra quem não fecha o ticket da implementação
     completa, Agentes de IA);
   - `PRODUTO_GRATUITO_LINK` (Formação, quem não tem orçamento agora);
   - `PRODUTO_LOW_TICKET_LINK` (Formação, orçamento até R$3.000).

   Trocar pelas páginas/links definitivos de cada um quando estiverem prontos.
2. **`CALENDLY_FORMACAO_LINK`** em `src/lib/links.ts` reutiliza o mesmo link
   do Calendly de Agentes de IA como placeholder (autorizado pelo cliente).
   Trocar pelo link definitivo da reunião de vendas da Formação assim que o
   cliente enviar.

A logo oficial já está integrada (`public/logo.png`, usada em
`src/components/Logo.tsx` e como favicon em `src/app/icon.png`). O carrossel
de clientes (`src/components/ui/ClientLogos.tsx`) já usa as logos e fotos
reais enviadas, salvas em `public/clients/`. Para adicionar mais um cliente,
é só colocar o arquivo em `public/clients/` e acrescentar uma entrada no
array `clients` desse componente (`kind: "logo"` para marca ou `kind:
"person"` para avatar + nome, no estilo Instagram).

## Deploy

Projeto pronto para deploy direto na [Vercel](https://vercel.com/new) (stack
padrão Next.js, sem configuração extra). Se surgir necessidade de banco de
dados (ex. armazenar leads capturados no pop-up), a recomendação é
[Supabase](https://supabase.com).
