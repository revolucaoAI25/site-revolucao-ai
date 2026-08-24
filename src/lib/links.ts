export const WHATSAPP_NUMBER_DISPLAY = "+55 31 3157-6084";
export const WHATSAPP_LINK = "https://wa.me/553131576084";

/**
 * WhatsApp próprio do Lead Extractor (diferente do WhatsApp geral da
 * Revolução AI acima) — usado nos CTAs de contato e checkout dessa LP.
 */
export const LEAD_EXTRACTOR_WHATSAPP_NUMBER_DISPLAY = "+55 31 3157-3153";
export const LEAD_EXTRACTOR_WHATSAPP_LINK = "https://wa.me/553131573153";
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
 * Curso Zero aos 10K (R$37,90) — resultado "baixo ticket" do pop-up de
 * Formação, pra quem consegue investir algo mas não chega aos R$3.000 da
 * reunião. Rota interna (ver src/app/zero-aos-10k) — antes apontava pra
 * uma LP hospedada fora do site (pages.net.br).
 */
export const PRODUTO_LOW_TICKET_LINK = "/zero-aos-10k";

/**
 * Checkout do curso Zero aos 10K — hospedado na Kiwify (fora do Asaas,
 * produto de baixo ticket separado dos outros produtos do site).
 */
export const ZERO_AOS_10K_CHECKOUT_LINK = "https://pay.kiwify.com.br/MnBz0ac";

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
 * URL da plataforma Lead Extractor em si (fora do site institucional) —
 * pra onde o cliente entra com o login/senha criados automaticamente
 * assim que o pagamento é confirmado (ver /api/asaas-webhook e
 * LeadExtractorCredentials.tsx).
 */
export const LEAD_EXTRACTOR_APP_LINK = "https://lead-extractor-revolucao-ai.up.railway.app/";

/**
 * Guia completo de uso do Lead Extractor (Google Docs) — mostrado junto
 * com login/senha assim que a conta é criada (LeadExtractorCredentials.tsx).
 * Fecha o onboarding sozinho, sem precisar de nenhum guia individual do time.
 */
export const LEAD_EXTRACTOR_GUIDE_LINK =
  "https://docs.google.com/document/d/1fjWZz_HizcIbrskeWzrWN8SITCWEBt5dj3SQkwr0fuk/edit?usp=sharing";

/**
 * LP da Plataforma (acesso self-service à Chatflux + add-on Agente
 * Pronto) — resultado "outro produto" do pop-up de Agentes de IA, pra
 * quem quer resultado com IA mas não tem orçamento pra implementação
 * completa. Rota interna, ver src/app/plataforma.
 */
export const OUTRO_PRODUTO_LINK = "/plataforma";
