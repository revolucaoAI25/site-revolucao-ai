"use client";

import { useState } from "react";
import type { OnboardingData } from "@/lib/onboarding-types";

const TIPO_AGENTE_LABELS: Record<string, string> = {
  agendamento: "Agendamento",
  "venda-direta": "Venda direta",
  ambos: "Agendamento e venda direta",
};

function Row({ label, value }: { label: string; value: string | undefined | null }) {
  if (!value || !value.trim()) return null;
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-1">
        {label}
      </p>
      <p className="text-sm text-text whitespace-pre-wrap leading-relaxed">{value}</p>
    </div>
  );
}

/** CNPJ/documento enviado no onboarding — armazenado como path privado no Storage, nunca como URL pública. */
function DocumentLink({ path }: { path: string | undefined }) {
  const [loading, setLoading] = useState(false);

  if (!path || !path.trim()) return null;

  if (path.startsWith("pré-visualização:")) {
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-1">
          CNPJ / documento
        </p>
        <p className="text-sm text-muted">{path} (modo de pré-visualização, sem arquivo real)</p>
      </div>
    );
  }

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/onboarding-documento-url?path=${encodeURIComponent(path!)}`
      );
      if (!res.ok) throw new Error();
      const json = (await res.json()) as { url: string };
      window.open(json.url, "_blank", "noopener,noreferrer");
    } catch {
      alert("Não foi possível abrir o documento.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-1">
        CNPJ / documento
      </p>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="text-sm text-accent hover:underline cursor-pointer disabled:opacity-50"
      >
        {loading ? "Abrindo..." : "Ver documento"}
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-t border-white/10 pt-5 first:border-t-0 first:pt-0">
      <h3 className="text-sm font-black tracking-tight text-accent">{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

export function OnboardingInfoModal({
  data,
  onClose,
}: {
  data: Partial<OnboardingData>;
  onClose: () => void;
}) {
  const hasAnyContent = Object.keys(data).length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
      />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-surface border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black tracking-tight">Onboarding do agente</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-text transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {!hasAnyContent && (
          <p className="text-sm text-muted-2">Nenhuma informação de onboarding recebida ainda.</p>
        )}

        {data.contato && (
          <Section title="Contato">
            <Row label="Nome" value={data.contato.nomeResponsavel} />
            <Row label="E-mail" value={data.contato.email} />
            <Row label="WhatsApp" value={data.contato.telefone} />
          </Section>
        )}

        {(data.tipoAgente || data.calcom) && (
          <Section title="Tipo de atendimento">
            <Row
              label="Tipo"
              value={data.tipoAgente ? TIPO_AGENTE_LABELS[data.tipoAgente] : undefined}
            />
            {data.calcom && (
              <>
                <Row label="E-mail Cal.com" value={data.calcom.email} />
                <Row label="Senha Cal.com" value={data.calcom.senha} />
                <Row label="Quantidade de agendas" value={data.calcom.quantidadeAgendas} />
                <Row label="Duração do atendimento" value={data.calcom.duracaoAtendimento} />
                <Row label="Disponibilidade padrão" value={data.calcom.disponibilidadePadrao} />
              </>
            )}
          </Section>
        )}

        {data.facebookBm && (
          <Section title="Business Manager (Facebook)">
            <Row label="Já tem BM?" value={data.facebookBm.temBm} />
            <Row label="Acesso concedido?" value={data.facebookBm.acessoConcedido} />
            <DocumentLink path={data.facebookBm.documento} />
          </Section>
        )}

        {data.negocio && (
          <Section title="Sobre o negócio">
            <Row label="Nome da empresa" value={data.negocio.nomeEmpresa} />
            <Row label="Como funciona" value={data.negocio.comoFunciona} />
            <Row label="Valor dos serviços" value={data.negocio.valor} />
            <Row label="Horários de funcionamento" value={data.negocio.horarios} />
            <Row label="História do negócio" value={data.negocio.historia} />
            <Row label="Site" value={data.negocio.site} />
            <Row label="Redes sociais" value={data.negocio.redesSociais} />
            <Row label="Endereço" value={data.negocio.endereco} />
            <Row label="Estrutura física" value={data.negocio.estruturaFisica} />
            <Row label="Depoimentos" value={data.negocio.depoimentos} />
            <Row label="Extras" value={data.negocio.extras} />
            <Row label="Link de arquivos" value={data.negocio.linkArquivos} />
          </Section>
        )}

        {data.leadsFunil && (
          <Section title="Leads e perfil de cliente">
            <Row label="Origem dos leads" value={data.leadsFunil.origemLeads} />
            <Row label="Estratégia de funil" value={data.leadsFunil.estrategiaFunil} />
            <Row label="Perfil / ICP" value={data.leadsFunil.perfilLead} />
            <Row label="Objetivos comuns do lead" value={data.leadsFunil.objetivosLead} />
            <Row label="ICP obrigatório p/ agendar" value={data.leadsFunil.icpObrigatorio} />
          </Section>
        )}

        {data.fluxoAtendimento && (
          <Section title="Fluxo de atendimento">
            <Row label="Script principal" value={data.fluxoAtendimento.scriptPrincipal} />
            <Row
              label="Fora do script"
              value={data.fluxoAtendimento.comoLidarForaDoScript}
            />
            <Row label="Quando acionar humano" value={data.fluxoAtendimento.quandoAcionarHumano} />
            <Row label="Celular a notificar" value={data.fluxoAtendimento.celularNotificar} />
            <Row label="Mensagem pro humano" value={data.fluxoAtendimento.mensagemHumano} />
            <Row
              label="Como funciona o agendamento"
              value={data.fluxoAtendimento.comoFuncionaAgendamento}
            />
            <Row label="Pagamento antecipado" value={data.fluxoAtendimento.pagamentoAntecipado} />
          </Section>
        )}

        {data.followUps && (
          <Section title="Follow-ups e lembretes">
            <Row label="Enviar follow-up?" value={data.followUps.enviarFollowUp} />
            <Row label="Quantidade" value={data.followUps.quantidadeFollowUp} />
            <Row label="Primeiro follow-up após" value={data.followUps.primeiroFollowUpApos} />
            <Row label="Cadência seguinte" value={data.followUps.cadenciaProximos} />
            <Row label="Roteiros prontos" value={data.followUps.jaTemRoteiros} />
            <Row label="Lembretes de reunião" value={data.followUps.enviarLembretes} />
          </Section>
        )}

        {data.personalidade && (
          <Section title="Personalidade do agente">
            <Row label="Nome do agente" value={data.personalidade.nomeAssistente} />
            <Row label="Comportamento" value={data.personalidade.comportamento} />
            <Row label="Assuntos a evitar" value={data.personalidade.assuntosEvitar} />
            <Row
              label="Mensagem p/ assunto evitado"
              value={data.personalidade.mensagemAssuntoEvitado}
            />
          </Section>
        )}

        {data.faq && (
          <Section title="FAQ">
            <Row label="Perguntas e respostas" value={data.faq} />
          </Section>
        )}

        {(data.linkArquivosAdicionais || data.consideracoesAdicionais) && (
          <Section title="Revisão final">
            <Row label="Arquivos adicionais" value={data.linkArquivosAdicionais} />
            <Row label="Considerações adicionais" value={data.consideracoesAdicionais} />
          </Section>
        )}
      </div>
    </div>
  );
}
