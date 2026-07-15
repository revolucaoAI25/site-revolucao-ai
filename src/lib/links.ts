export const WHATSAPP_NUMBER_DISPLAY = "+55 31 3157-6084";
export const WHATSAPP_LINK = "https://wa.me/553131576084";

/**
 * WhatsApp próprio do Lead Extractor (diferente do WhatsApp geral da
 * Revolução AI acima) — usado nos CTAs de contato e checkout dessa LP.
 */
export const LEAD_EXTRACTOR_WHATSAPP_NUMBER_DISPLAY = "+55 31 3157-5625";
export const LEAD_EXTRACTOR_WHATSAPP_LINK = "https://wa.me/553131575625";
export const EMAIL = "contato@revolucao-ai.com";
export const INSTAGRAM_HANDLE = "@revolucao.ai";
export const INSTAGRAM_LINK = "https://instagram.com/revolucao.ai";
export const ADDRESS = "Rua Sergipe, 1440 - Savassi, Belo Horizonte (MG)";
export const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Rua+Sergipe,+1440+-+Savassi,+Belo+Horizonte+-+MG";

/**
 * Calendly da apresentação do agente de IA — resultado "qualificado" do
 * pop-up de Agentes de IA.
 */
export const CALENDLY_AGENTE_LINK =
  "https://calendly.com/d/cxjt-7t2-nxc/apresentacao-agente-de-ia";

/**
 * PLACEHOLDER — o cliente disse que vai enviar uma agenda própria pra
 * reunião de vendas da Formação. Até lá, reutiliza a mesma do agente de IA
 * (ele mesmo confirmou que pode ser assim por enquanto).
 */
export const CALENDLY_FORMACAO_LINK = CALENDLY_AGENTE_LINK;

/**
 * Ebook gratuito — resultado "sem orçamento agora" do pop-up de Formação.
 */
export const PRODUTO_GRATUITO_LINK =
  "https://docs.google.com/document/d/11u8-q8Z2Qr_j5W7udWUTlWlp1MsjpXDVhcWOth5ncBc/edit?usp=sharing";

/**
 * Curso Zero aos 10K (R$37) — resultado "baixo ticket" do pop-up de
 * Formação, pra quem consegue investir algo mas não chega aos R$3.000 da
 * reunião.
 */
export const PRODUTO_LOW_TICKET_LINK =
  "https://revolucao-ai.pages.net.br/zero-aos-10k-4";

/**
 * LP do Lead Extractor — resultado "só preciso de uma base de leads pra
 * prospectar" do pop-up de Agentes de IA. Rota interna (abre em nova aba
 * porque é fora do fluxo do site institucional, ver src/app/lead-extractor).
 */
export const LEAD_EXTRACTOR_LINK = "/lead-extractor";

/**
 * Checkout do Lead Extractor — formulário próprio (nome/e-mail/CPF-CNPJ)
 * que cria a assinatura direto na API do Asaas e redireciona pra fatura
 * (cartão, boleto ou Pix), ver src/app/lead-extractor/assinar.
 */
export const LEAD_EXTRACTOR_CHECKOUT_MENSAL_LINK = "/lead-extractor/assinar?plano=mensal";
export const LEAD_EXTRACTOR_CHECKOUT_ANUAL_LINK = "/lead-extractor/assinar?plano=anual";

/**
 * LP da Plataforma (acesso self-service à Chatflux + add-on Agente
 * Pronto) — resultado "outro produto" do pop-up de Agentes de IA, pra
 * quem quer resultado com IA mas não tem orçamento pra implementação
 * completa. Rota interna, ver src/app/plataforma.
 */
export const OUTRO_PRODUTO_LINK = "/plataforma";
