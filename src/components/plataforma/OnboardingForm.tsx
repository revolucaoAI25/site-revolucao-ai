"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import {
  emptyOnboardingData,
  type OnboardingData,
  type TipoAgente,
} from "@/lib/onboarding-types";
import { VideoPlaceholder } from "./VideoPlaceholder";

type ObjectSection =
  | "contato"
  | "calcom"
  | "negocio"
  | "leadsFunil"
  | "fluxoAtendimento"
  | "followUps"
  | "personalidade";

function makePatcher(setData: Dispatch<SetStateAction<OnboardingData>>) {
  return function patch<S extends ObjectSection>(section: S) {
    return (field: keyof OnboardingData[S], value: string) => {
      setData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    };
  };
}

function Field({
  label,
  value,
  onChange,
  required,
  helper,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  helper?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {helper && <p className="text-xs text-muted-2 leading-relaxed mb-2">{helper}</p>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-surface-2 px-5 py-3.5 font-medium placeholder:text-muted focus:outline-none focus:border-accent/50"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  required,
  helper,
  placeholder,
  rows = 4,
  emphasis = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  helper?: string;
  placeholder?: string;
  rows?: number;
  emphasis?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {helper && <p className="text-xs text-muted-2 leading-relaxed mb-2">{helper}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full rounded-2xl border bg-surface-2 px-5 py-3.5 font-medium placeholder:text-muted focus:outline-none resize-y ${
          emphasis
            ? "border-accent/40 focus:border-accent/70"
            : "border-white/10 focus:border-accent/50"
        }`}
      />
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-accent/30 bg-accent-soft px-5 py-4 text-sm text-muted leading-relaxed">
      {children}
    </div>
  );
}

type Step = {
  id: string;
  title: string;
  render: (data: OnboardingData, patch: ReturnType<typeof makePatcher>, setData: Dispatch<SetStateAction<OnboardingData>>) => React.ReactNode;
  isValid: (data: OnboardingData) => boolean;
};

const steps: Step[] = [
  {
    id: "contato",
    title: "Contato",
    isValid: (d) => d.contato.nomeResponsavel.trim().length > 1 && d.contato.email.includes("@"),
    render: (data, patch) => (
      <div className="flex flex-col gap-5">
        <Field
          label="Seu nome"
          required
          value={data.contato.nomeResponsavel}
          onChange={(v) => patch("contato")("nomeResponsavel", v)}
        />
        <Field
          label="E-mail"
          required
          value={data.contato.email}
          onChange={(v) => patch("contato")("email", v)}
        />
        <Field
          label="WhatsApp"
          value={data.contato.telefone}
          onChange={(v) => patch("contato")("telefone", v)}
          placeholder="(31) 91234-5678"
        />
      </div>
    ),
  },
  {
    id: "tipo-agente",
    title: "Tipo de atendimento",
    isValid: (d) => d.tipoAgente !== "" && (d.tipoAgente === "venda-direta" || (d.calcom.email.trim().length > 2)),
    render: (data, patch, setData) => (
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-semibold mb-3">
            Seu agente vai fechar reuniões (agendamento) ou vender direto na conversa?
            <span className="text-accent"> *</span>
          </label>
          <div className="grid sm:grid-cols-3 gap-3">
            {(
              [
                { value: "agendamento", label: "Agendamento" },
                { value: "venda-direta", label: "Venda direta" },
                { value: "ambos", label: "Os dois" },
              ] as { value: TipoAgente; label: string }[]
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setData((prev) => ({ ...prev, tipoAgente: opt.value }))}
                className={`rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors cursor-pointer ${
                  data.tipoAgente === opt.value
                    ? "bg-accent text-[#07090a]"
                    : "border border-white/15 text-muted hover:text-text"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {(data.tipoAgente === "agendamento" || data.tipoAgente === "ambos") && (
          <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-surface-2/50 p-6">
            <div>
              <p className="text-sm font-semibold mb-2">Como criar sua conta no Cal.com</p>
              <p className="text-xs text-muted-2 leading-relaxed mb-4">
                Assista ao vídeo abaixo pra criar sua conta gratuita no Cal.com — é lá que
                seu agente vai marcar as reuniões automaticamente. Depois de criar, informe
                o login abaixo pra gente configurar tudo.
              </p>
              <VideoPlaceholder label="Como criar sua conta no Cal.com" />
            </div>
            <Field
              label="E-mail de login no Cal.com"
              required
              value={data.calcom.email}
              onChange={(v) => patch("calcom")("email", v)}
            />
            <Field
              label="Senha do Cal.com"
              value={data.calcom.senha}
              onChange={(v) => patch("calcom")("senha", v)}
              helper="Só usamos isso pra configurar sua agenda — fica salvo com o mesmo acesso restrito de todos os seus outros dados aqui."
            />
          </div>
        )}
      </div>
    ),
  },
  {
    id: "negocio",
    title: "Sobre o seu negócio",
    isValid: (d) => d.negocio.nomeEmpresa.trim().length > 1 && d.negocio.comoFunciona.trim().length > 10 && d.negocio.horarios.trim().length > 1 && d.negocio.valor.trim().length > 1,
    render: (data, patch) => (
      <div className="flex flex-col gap-5">
        <Field
          label="Nome da empresa"
          required
          helper="Será usado pelo agente para se apresentar."
          value={data.negocio.nomeEmpresa}
          onChange={(v) => patch("negocio")("nomeEmpresa", v)}
        />
        <TextArea
          label="Como funciona seu produto/serviço?"
          required
          helper="Considere todos os serviços que oferece, principais e secundários — descreva em detalhes."
          value={data.negocio.comoFunciona}
          onChange={(v) => patch("negocio")("comoFunciona", v)}
          rows={5}
        />
        <TextArea
          label="Qual o valor dos seus serviços?"
          required
          helper='Inclua formas e condições de pagamento e promoções vigentes. Se o valor não deve ser informado aos leads, escreva "Nunca informar valores".'
          value={data.negocio.valor}
          onChange={(v) => patch("negocio")("valor", v)}
        />
        <Field
          label="Horários de funcionamento"
          required
          value={data.negocio.horarios}
          onChange={(v) => patch("negocio")("horarios", v)}
        />
        <TextArea
          label="História do negócio"
          helper="Data de fundação, tradição, crescimento, casos, princípios — só se quiser que o agente conte isso quando perguntado."
          value={data.negocio.historia}
          onChange={(v) => patch("negocio")("historia", v)}
        />
        <Field
          label="Site"
          value={data.negocio.site}
          onChange={(v) => patch("negocio")("site", v)}
        />
        <TextArea
          label="Redes sociais"
          helper="Quais (Instagram, TikTok etc.) e os @ de cada uma."
          value={data.negocio.redesSociais}
          onChange={(v) => patch("negocio")("redesSociais", v)}
          rows={2}
        />
        <Field
          label="Endereço"
          helper="Deixe em branco se for só remoto."
          value={data.negocio.endereco}
          onChange={(v) => patch("negocio")("endereco", v)}
        />
        <TextArea
          label="Estrutura física"
          helper="Equipamentos, espaço, tecnologia, profissionais — só se quiser que o agente fale sobre isso."
          value={data.negocio.estruturaFisica}
          onChange={(v) => patch("negocio")("estruturaFisica", v)}
        />
        <TextArea
          label="Depoimentos de clientes"
          helper="Se quiser que a IA use depoimentos reais pra ajudar a fechar uma venda, cole-os aqui."
          value={data.negocio.depoimentos}
          onChange={(v) => patch("negocio")("depoimentos", v)}
        />
        <TextArea
          label="Algo a acrescentar sobre o negócio?"
          value={data.negocio.extras}
          onChange={(v) => patch("negocio")("extras", v)}
        />
        <Field
          label="Link de arquivos e materiais (opcional)"
          helper="Google Drive, WeTransfer etc. com apresentações, fotos, vídeos ou outros materiais úteis."
          value={data.negocio.linkArquivos}
          onChange={(v) => patch("negocio")("linkArquivos", v)}
        />
      </div>
    ),
  },
  {
    id: "leads-funil",
    title: "Leads e perfil de cliente",
    isValid: () => true,
    render: (data, patch) => (
      <div className="flex flex-col gap-5">
        <TextArea
          label="Qual a origem dos leads?"
          helper="Ex.: tráfego pago, orgânico via Instagram, disparo de mensagens, indicação."
          value={data.leadsFunil.origemLeads}
          onChange={(v) => patch("leadsFunil")("origemLeads", v)}
        />
        <TextArea
          label="Como é a estratégia de funil de vendas para cada produto/serviço?"
          value={data.leadsFunil.estrategiaFunil}
          onChange={(v) => patch("leadsFunil")("estrategiaFunil", v)}
        />
        <TextArea
          label="Qual a descrição da persona ou ICP (perfil de cliente ideal) do negócio?"
          value={data.leadsFunil.perfilLead}
          onChange={(v) => patch("leadsFunil")("perfilLead", v)}
        />
        <TextArea
          label="Quais os objetivos mais comuns dos leads ao entrar em contato?"
          helper="Ex.: agendar consulta, tirar dúvidas, comprar produto."
          value={data.leadsFunil.objetivosLead}
          onChange={(v) => patch("leadsFunil")("objetivosLead", v)}
        />
        <TextArea
          label="O agendamento só deve ser feito se o lead cumprir todos os requisitos de ICP?"
          helper="Explique quais são esses requisitos, se houver."
          value={data.leadsFunil.icpObrigatorio}
          onChange={(v) => patch("leadsFunil")("icpObrigatorio", v)}
        />
      </div>
    ),
  },
  {
    id: "fluxo",
    title: "Fluxo de atendimento",
    isValid: (d) => d.fluxoAtendimento.scriptPrincipal.trim().length > 20,
    render: (data, patch) => (
      <div className="flex flex-col gap-5">
        <Callout>
          <span className="text-text font-semibold">Essa é a parte mais importante do formulário.</span>{" "}
          O agente vai seguir exatamente o que você escrever aqui — quanto mais detalhado
          e preciso o passo a passo, melhor ele vai se comportar. Dedique um tempo real pra
          essa resposta: descreva como a conversa deve começar, quais perguntas de
          qualificação fazer (e em que ordem), o que fazer com cada tipo de resposta, e como
          a conversa deve terminar.
        </Callout>
        <TextArea
          label="Qual script ou fluxo de atendimento o agente deve seguir?"
          required
          helper="Passo a passo completo: como recebe o lead, quantas perguntas faz, quais são elas, como conduz a conversa, quais as ramificações possíveis."
          value={data.fluxoAtendimento.scriptPrincipal}
          onChange={(v) => patch("fluxoAtendimento")("scriptPrincipal", v)}
          rows={10}
          emphasis
        />
        <TextArea
          label="Como lidar quando o lead foge do script principal?"
          helper="Ex.: pergunta sobre preço antes da hora, já é cliente e quer tirar dúvida, quer reagendar ou desmarcar."
          value={data.fluxoAtendimento.comoLidarForaDoScript}
          onChange={(v) => patch("fluxoAtendimento")("comoLidarForaDoScript", v)}
          rows={5}
        />
        <TextArea
          label="Em quais casos devemos acionar um humano ou pausar a interação?"
          value={data.fluxoAtendimento.quandoAcionarHumano}
          onChange={(v) => patch("fluxoAtendimento")("quandoAcionarHumano", v)}
        />
        <Field
          label="Número de celular a notificar quando pausar ou o lead pedir um humano"
          value={data.fluxoAtendimento.celularNotificar}
          onChange={(v) => patch("fluxoAtendimento")("celularNotificar", v)}
          placeholder="(31) 91234-5678"
        />
        <TextArea
          label="Qual mensagem devemos enviar para esse atendente humano?"
          value={data.fluxoAtendimento.mensagemHumano}
          onChange={(v) => patch("fluxoAtendimento")("mensagemHumano", v)}
        />
        <TextArea
          label="Como funciona o agendamento? Existem múltiplas agendas a conectar?"
          value={data.fluxoAtendimento.comoFuncionaAgendamento}
          onChange={(v) => patch("fluxoAtendimento")("comoFuncionaAgendamento", v)}
        />
        <TextArea
          label="Em caso de compra direta ou pagamento antecipado, quais links/informações de pagamento devem ser enviados?"
          value={data.fluxoAtendimento.pagamentoAntecipado}
          onChange={(v) => patch("fluxoAtendimento")("pagamentoAntecipado", v)}
        />
      </div>
    ),
  },
  {
    id: "follow-ups",
    title: "Follow-ups e lembretes",
    isValid: () => true,
    render: (data, patch) => (
      <div className="flex flex-col gap-5">
        <Field
          label="Devemos enviar follow-up quando o lead deixar de responder?"
          value={data.followUps.enviarFollowUp}
          onChange={(v) => patch("followUps")("enviarFollowUp", v)}
          placeholder="Sim / Não"
        />
        <Field
          label="Quantas mensagens de follow-up enviar pra quem parou de responder?"
          value={data.followUps.quantidadeFollowUp}
          onChange={(v) => patch("followUps")("quantidadeFollowUp", v)}
        />
        <Field
          label="O primeiro follow-up deve ser feito após quanto tempo de inatividade?"
          value={data.followUps.primeiroFollowUpApos}
          onChange={(v) => patch("followUps")("primeiroFollowUpApos", v)}
        />
        <Field
          label="Os próximos follow-ups devem seguir qual cadência?"
          helper="Ex.: de 24 em 24 horas."
          value={data.followUps.cadenciaProximos}
          onChange={(v) => patch("followUps")("cadenciaProximos", v)}
        />
        <TextArea
          label="Você já tem os roteiros de cada mensagem de follow-up?"
          helper="Se sim, cole-os aqui."
          value={data.followUps.jaTemRoteiros}
          onChange={(v) => patch("followUps")("jaTemRoteiros", v)}
        />
        <Field
          label="Devemos enviar lembretes de reuniões agendadas? Quantos e quanto tempo antes?"
          value={data.followUps.enviarLembretes}
          onChange={(v) => patch("followUps")("enviarLembretes", v)}
        />
      </div>
    ),
  },
  {
    id: "personalidade",
    title: "Personalidade do agente",
    isValid: () => true,
    render: (data, patch) => (
      <div className="flex flex-col gap-5">
        <Field
          label="Qual nome o agente terá?"
          value={data.personalidade.nomeAssistente}
          onChange={(v) => patch("personalidade")("nomeAssistente", v)}
        />
        <TextArea
          label="Como você deseja que ele se comporte?"
          helper="Ex.: amigável, animado, sério, formal, persuasivo."
          value={data.personalidade.comportamento}
          onChange={(v) => patch("personalidade")("comportamento", v)}
        />
        <TextArea
          label="Gostaria que o agente evitasse falar de algum assunto?"
          value={data.personalidade.assuntosEvitar}
          onChange={(v) => patch("personalidade")("assuntosEvitar", v)}
        />
        <TextArea
          label="Se sim, qual mensagem devemos enviar quando perguntarem sobre isso?"
          value={data.personalidade.mensagemAssuntoEvitado}
          onChange={(v) => patch("personalidade")("mensagemAssuntoEvitado", v)}
        />
      </div>
    ),
  },
  {
    id: "faq",
    title: "Perguntas frequentes",
    isValid: (d) => d.faq.trim().length > 10,
    render: (data, _patch, setData) => (
      <div className="flex flex-col gap-5">
        <Callout>
          Quais são as principais perguntas que seu negócio recebe no dia a dia — e as
          respostas ideais para elas? Siga o modelo:
          <br />
          <br />
          <span className="text-text">P: Vocês fazem avaliação física?</span>
          <br />
          <span className="text-text">R: Sim, a avaliação física é opcional e custa R$ 100,00.</span>
        </Callout>
        <TextArea
          label="Escreva todas as perguntas e respostas"
          required
          value={data.faq}
          onChange={(v) => setData((prev) => ({ ...prev, faq: v }))}
          rows={10}
        />
      </div>
    ),
  },
  {
    id: "revisao",
    title: "Revisão final",
    isValid: () => true,
    render: (data, _patch, setData) => (
      <div className="flex flex-col gap-5">
        <TextArea
          label="Alguma consideração adicional que não foi coberta?"
          value={data.consideracoesAdicionais}
          onChange={(v) => setData((prev) => ({ ...prev, consideracoesAdicionais: v }))}
        />
        <div className="rounded-2xl border border-white/10 bg-surface-2/50 p-5 text-sm text-muted leading-relaxed">
          Confere se está tudo certo nas etapas anteriores antes de enviar — depois do
          envio, nosso time já começa a montar a primeira versão do seu agente com base
          nessas respostas.
        </div>
      </div>
    ),
  },
];

export function OnboardingForm({ checkoutId }: { checkoutId: string | null }) {
  const isPreview = !checkoutId;
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<OnboardingData>(emptyOnboardingData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const patch = makePatcher(setData);
  const step = steps[stepIndex];
  const canAdvance = step.isValid(data);
  const isLastStep = stepIndex === steps.length - 1;

  async function handleSubmit() {
    if (isPreview) {
      setDone(true);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/plataforma-business-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkoutId, businessInfo: data }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Não foi possível enviar — tenta de novo em alguns instantes.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="card-surface rounded-3xl p-8 sm:p-10 text-center">
        <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="text-xl font-black tracking-tight mb-3">
          {isPreview ? "Pré-visualização concluída" : "Informações recebidas!"}
        </h2>
        <p className="text-muted leading-relaxed text-sm max-w-md mx-auto">
          {isPreview
            ? "No modo real (com um checkout válido), essa tela confirmaria o envio pro nosso time começar a montar o agente."
            : "Nosso time já vai começar a montar a primeira versão do seu agente com base nessas respostas."}
        </p>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="card-surface rounded-3xl p-8 sm:p-10">
        {isPreview && (
          <div className="mb-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-xs font-semibold text-amber-300">
            Modo de pré-visualização — nenhuma resposta será salva.
          </div>
        )}
        <h1 className="text-2xl font-black tracking-tight mb-4">
          Formulário de onboarding do seu agente
        </h1>
        <p className="text-muted leading-relaxed mb-4">
          Esse formulário existe pra entender à fundo o seu negócio e montar a primeira
          versão do seu agente de IA. Responda com{" "}
          <span className="text-text font-semibold">cuidado, atenção e o máximo de detalhes possível</span>{" "}
          — o agente só vai saber o que você contar aqui. Quanto mais preciso e completo,
          melhor ele vai atender e qualificar seus leads.
        </p>
        <p className="text-muted leading-relaxed mb-8">
          Tempo estimado: 20-30 minutos. Vale reservar um tempo tranquilo pra preencher com
          calma, principalmente a parte do script de atendimento — é a que mais define o
          comportamento do seu agente.
        </p>
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="inline-flex w-full items-center justify-center rounded-full bg-accent text-[#07090a] font-semibold px-6 py-3.5 shadow-[0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark transition-colors cursor-pointer"
        >
          Começar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {isPreview && (
        <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-xs font-semibold text-amber-300">
          Modo de pré-visualização — nenhuma resposta será salva.
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2 text-xs font-semibold uppercase tracking-widest text-muted-2">
          <span>
            Etapa {stepIndex + 1} de {steps.length}
          </span>
          <span>{step.title}</span>
        </div>
        <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="card-surface rounded-3xl p-8 sm:p-10">
        <h2 className="text-xl font-black tracking-tight mb-6">{step.title}</h2>
        {step.render(data, patch, setData)}
      </div>

      {error && <p className="text-sm text-red-400 text-center">{error}</p>}

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
          disabled={stepIndex === 0}
          className="rounded-full border border-white/15 text-muted px-6 py-3 text-sm font-semibold hover:text-text transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          Voltar
        </button>
        {isLastStep ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canAdvance || loading}
            className="inline-flex items-center justify-center rounded-full bg-accent text-[#07090a] font-semibold px-8 py-3 text-sm shadow-[0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Enviando..." : isPreview ? "Simular envio" : "Enviar formulário"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}
            disabled={!canAdvance}
            className="inline-flex items-center justify-center rounded-full bg-accent text-[#07090a] font-semibold px-8 py-3 text-sm shadow-[0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Próxima etapa
          </button>
        )}
      </div>
    </div>
  );
}
