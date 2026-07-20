"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import {
  emptyOnboardingData,
  type OnboardingData,
  type TipoAgente,
} from "@/lib/onboarding-types";
import { CalcomTutorialVideo } from "./CalcomTutorialVideo";
import { VideoPlaceholder } from "./VideoPlaceholder";

const SUPPORT_EMAIL = "suporte@revolucao-ai.com";
const FACEBOOK_BM_EMAIL = "jvitor.no@gmail.com";

type ObjectSection =
  | "contato"
  | "calcom"
  | "facebookBm"
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

/** Verifica campos obrigatórios e retorna uma mensagem explicando o que falta ou está curto demais. */
function requireAll(fields: { label: string; value: string; minLen?: number }[]): string | null {
  const missing = fields.filter((f) => !f.value.trim());
  if (missing.length > 0) {
    return `Preencha antes de continuar: ${missing.map((f) => f.label).join(", ")}.`;
  }
  const short = fields.find((f) => f.minLen && f.value.trim().length < f.minLen);
  if (short) {
    return `A resposta em "${short.label}" está curta demais — capriche nos detalhes (mínimo ${short.minLen} caracteres) antes de continuar.`;
  }
  return null;
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
      {helper && <p className="text-sm text-muted-2 leading-relaxed mb-2">{helper}</p>}
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
      {helper && <p className="text-sm text-muted-2 leading-relaxed mb-2">{helper}</p>}
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

function ToggleField({
  label,
  value,
  onChange,
  required,
  helper,
  options = ["Sim", "Não"],
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  helper?: string;
  options?: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {helper && <p className="text-sm text-muted-2 leading-relaxed mb-2">{helper}</p>}
      <div className="grid grid-cols-2 gap-3 max-w-xs">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors cursor-pointer ${
              value === opt
                ? "bg-accent text-[#07090a]"
                : "border border-white/15 text-muted hover:text-text"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function FileUploadField({
  label,
  helper,
  required,
  value,
  onChange,
  checkoutId,
}: {
  label: string;
  helper?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  checkoutId: string | null;
}) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setFileName(file.name);
    setUploading(true);

    if (!checkoutId) {
      // Pré-visualização: não envia de verdade, só simula pra dar pra testar o formulário.
      setTimeout(() => {
        onChange(`pré-visualização: ${file.name}`);
        setUploading(false);
      }, 400);
      return;
    }

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("checkoutId", checkoutId);
      const res = await fetch("/api/plataforma-business-info/upload-documento", {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error();
      const json = (await res.json()) as { path: string };
      onChange(json.path);
    } catch {
      setError("Não foi possível enviar o arquivo — tenta de novo.");
      onChange("");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {helper && <p className="text-sm text-muted-2 leading-relaxed mb-2">{helper}</p>}
      <label className="flex items-center justify-center gap-3 w-full rounded-2xl border border-dashed border-white/15 bg-surface-2 px-5 py-6 cursor-pointer hover:border-accent/40 transition-colors text-center">
        <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleFile} />
        <span className="text-sm font-medium text-muted">
          {uploading
            ? "Enviando..."
            : fileName
              ? `Arquivo selecionado: ${fileName}`
              : value
                ? "Arquivo enviado — clique pra trocar"
                : "Clique pra escolher o arquivo (foto ou PDF)"}
        </span>
      </label>
      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-accent/30 bg-accent-soft px-5 py-4 text-sm text-muted leading-relaxed">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold">
        i
      </span>
      <div>{children}</div>
    </div>
  );
}

type Step = {
  id: string;
  title: string;
  render: (
    data: OnboardingData,
    patch: ReturnType<typeof makePatcher>,
    setData: Dispatch<SetStateAction<OnboardingData>>,
    checkoutId: string | null
  ) => React.ReactNode;
  validate: (data: OnboardingData) => string | null;
};

const steps: Step[] = [
  {
    id: "contato",
    title: "Contato",
    validate: (d) => {
      const err = requireAll([
        { label: "Seu nome", value: d.contato.nomeResponsavel, minLen: 2 },
        { label: "E-mail", value: d.contato.email, minLen: 5 },
        { label: "WhatsApp", value: d.contato.telefone, minLen: 8 },
      ]);
      if (err) return err;
      if (!d.contato.email.includes("@")) return 'Informe um e-mail válido em "E-mail".';
      return null;
    },
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
          required
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
    validate: (d) => {
      if (d.tipoAgente === "")
        return "Selecione se o agente é pra agendamento, venda direta ou os dois antes de continuar.";
      if (d.tipoAgente === "venda-direta") return null;
      return requireAll([
        { label: "E-mail de login no Cal.com", value: d.calcom.email, minLen: 5 },
        { label: "Senha do Cal.com", value: d.calcom.senha, minLen: 3 },
        { label: "Quantidade de agendas no Cal.com", value: d.calcom.quantidadeAgendas, minLen: 1 },
        { label: "Duração padrão do atendimento", value: d.calcom.duracaoAtendimento, minLen: 1 },
        { label: "Disponibilidade padrão", value: d.calcom.disponibilidadePadrao, minLen: 1 },
      ]);
    },
    render: (data, patch, setData) => (
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-semibold mb-3">
            Seu agente vai fechar reuniões (agendamento) ou vender direto na conversa?
            <span className="text-accent"> *</span>
          </label>
          <p className="text-sm text-muted-2 leading-relaxed mb-3">
            Isso muda completamente o fluxo que o agente vai seguir — se ele precisa levar o
            lead até uma reunião marcada, ou se ele mesmo conduz a venda até o pagamento.
          </p>
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
              <p className="text-sm text-muted-2 leading-relaxed mb-4">
                Assista ao vídeo abaixo pra criar sua conta gratuita no Cal.com — é lá que
                seu agente vai marcar as reuniões automaticamente. Depois de criar, informe
                o login abaixo pra gente configurar tudo.
              </p>
              <CalcomTutorialVideo />
            </div>
            <Field
              label="E-mail de login no Cal.com"
              required
              value={data.calcom.email}
              onChange={(v) => patch("calcom")("email", v)}
            />
            <Field
              label="Senha do Cal.com"
              required
              value={data.calcom.senha}
              onChange={(v) => patch("calcom")("senha", v)}
              helper="Precisamos disso pra configurar sua agenda dentro da plataforma — fica salvo com o mesmo acesso restrito de todos os seus outros dados aqui."
            />
            <TextArea
              label="Quantas agendas (calendários) você vai sincronizar no Cal.com?"
              required
              rows={3}
              helper="Se você tiver mais de um funcionário, closer ou vendedor que também vai ter reuniões agendadas pela IA, é preciso sincronizar (conectar) a agenda de cada um deles no Cal.com — não só a sua. Descreva quantas agendas serão sincronizadas e pra quem é cada uma. Se alguma estiver numa conta diferente da que você passou o login acima, avise aqui: vamos precisar do acesso dela também."
              value={data.calcom.quantidadeAgendas}
              onChange={(v) => patch("calcom")("quantidadeAgendas", v)}
            />
            <Field
              label="Qual a duração padrão de cada atendimento/reunião agendada?"
              required
              placeholder="Ex.: 30 minutos"
              value={data.calcom.duracaoAtendimento}
              onChange={(v) => patch("calcom")("duracaoAtendimento", v)}
            />
            <TextArea
              label="Qual a disponibilidade padrão pra agendar atendimentos?"
              required
              rows={3}
              helper="Dias da semana e horários em que o agente pode oferecer horários pro lead escolher. Ex.: segunda a sexta, das 9h às 18h, com 15 minutos de intervalo entre reuniões."
              value={data.calcom.disponibilidadePadrao}
              onChange={(v) => patch("calcom")("disponibilidadePadrao", v)}
            />
          </div>
        )}
      </div>
    ),
  },
  {
    id: "facebook-bm",
    title: "Acesso à Business Manager (Facebook)",
    validate: (d) =>
      requireAll([
        {
          label: "Você já tem uma Business Manager (BM) no Facebook?",
          value: d.facebookBm.temBm,
          minLen: 1,
        },
        {
          label: "Confirmação de acesso concedido",
          value: d.facebookBm.acessoConcedido,
          minLen: 1,
        },
        { label: "Documento (CNPJ ou outro) enviado", value: d.facebookBm.documento, minLen: 5 },
      ]),
    render: (data, patch, _setData, checkoutId) => (
      <div className="flex flex-col gap-5">
        <Callout>
          <span className="text-text font-semibold">Por que pedimos isso:</span> pra conectar
          o número de WhatsApp do seu agente à API oficial da Meta — o que garante mais
          estabilidade e a possibilidade de enviar mensagens em maior volume — a gente precisa
          ter acesso de administrador na Business Manager (BM) do Facebook vinculada ao seu
          negócio. É por dentro da BM que a Meta libera e verifica essa conexão.
        </Callout>
        <Callout>
          <span className="text-text font-semibold">Como conceder o acesso:</span> entre em{" "}
          <span className="text-text font-semibold">business.facebook.com</span> →
          Configurações da empresa → Usuários → Pessoas (ou Parceiros de negócios) →
          Adicionar → informe o e-mail abaixo e escolha a opção{" "}
          <span className="text-text font-semibold">Controle total</span> — não funciona com
          acesso parcial ou só de anúncios.
        </Callout>
        <div className="rounded-2xl border border-accent/40 bg-accent-soft px-5 py-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-1">
            Adicione este e-mail com Controle total
          </p>
          <p className="text-lg font-black tracking-tight text-accent break-all">
            {FACEBOOK_BM_EMAIL}
          </p>
        </div>
        <ToggleField
          label="Você já tem uma Business Manager (BM) no Facebook?"
          required
          value={data.facebookBm.temBm}
          onChange={(v) => patch("facebookBm")("temBm", v)}
        />
        {data.facebookBm.temBm === "Não" && (
          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-surface-2/50 p-6">
            <div>
              <p className="text-sm font-semibold mb-2">Como criar sua Business Manager (BM)</p>
              <p className="text-sm text-muted-2 leading-relaxed mb-4">
                Sem problema — leva poucos minutos. Acesse business.facebook.com, clique em
                &quot;Criar conta&quot;, informe o nome da sua empresa, seu nome completo e um
                e-mail comercial, e confirme os dados básicos do negócio. Assista ao vídeo
                abaixo se preferir ver o passo a passo, e depois volte aqui pra adicionar o
                e-mail acima com Controle total.
              </p>
              <VideoPlaceholder label="Como criar sua Business Manager no Facebook" />
            </div>
          </div>
        )}
        <ToggleField
          label={`Confirma que já adicionou ${FACEBOOK_BM_EMAIL} com Controle total?`}
          required
          value={data.facebookBm.acessoConcedido}
          onChange={(v) => patch("facebookBm")("acessoConcedido", v)}
          helper="Se ainda não deu o acesso, pode fazer isso logo depois de enviar o formulário — só não esquece, porque sem esse acesso a gente não consegue conectar o WhatsApp do agente."
        />
        <FileUploadField
          label="Envie o CNPJ (ou outro documento, se não tiver CNPJ)"
          required
          value={data.facebookBm.documento}
          onChange={(v) => patch("facebookBm")("documento", v)}
          checkoutId={checkoutId}
          helper="Precisamos disso pra fazer a verificação da conta dentro da BM. Se seu negócio não tiver CNPJ, envie outro documento (CPF, RG etc.). Aceita foto ou PDF."
        />
        <div className="rounded-2xl border border-white/10 bg-surface-2/50 p-5 text-sm text-muted leading-relaxed">
          Depois que você conceder o acesso, a gente faz as configurações necessárias na BM e a
          verificação da conta. Se precisarmos de alguma informação a mais durante esse
          processo, entramos em contato direto com você pra concluir a conexão.
        </div>
      </div>
    ),
  },
  {
    id: "negocio",
    title: "Sobre o seu negócio",
    validate: (d) =>
      requireAll([
        { label: "Nome da empresa", value: d.negocio.nomeEmpresa, minLen: 2 },
        { label: "Como funciona seu produto/serviço", value: d.negocio.comoFunciona, minLen: 10 },
        { label: "Valor dos serviços", value: d.negocio.valor, minLen: 1 },
        { label: "Horários de funcionamento", value: d.negocio.horarios, minLen: 1 },
        { label: "História do negócio", value: d.negocio.historia, minLen: 1 },
        { label: "Site", value: d.negocio.site, minLen: 1 },
        { label: "Redes sociais", value: d.negocio.redesSociais, minLen: 1 },
        { label: "Endereço", value: d.negocio.endereco, minLen: 1 },
        { label: "Estrutura física", value: d.negocio.estruturaFisica, minLen: 1 },
        { label: "Depoimentos de clientes", value: d.negocio.depoimentos, minLen: 1 },
        { label: "Algo a acrescentar sobre o negócio", value: d.negocio.extras, minLen: 1 },
        { label: "Link de arquivos e materiais", value: d.negocio.linkArquivos, minLen: 5 },
      ]),
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
          helper="Considere todos os serviços que oferece, principais e secundários, e descreva em detalhes. É a base que o agente usa pra explicar o negócio pro lead — quanto mais completo, menos ele vai 'inventar' ou responder de forma genérica."
          value={data.negocio.comoFunciona}
          onChange={(v) => patch("negocio")("comoFunciona", v)}
          rows={5}
        />
        <TextArea
          label="Qual o valor dos seus serviços?"
          required
          helper='Inclua formas e condições de pagamento e promoções vigentes. Isso evita que o agente passe um valor errado ou desatualizado pro lead. Se o valor não deve ser informado por mensagem, escreva "Nunca informar valores".'
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
          required
          helper="Data de fundação, tradição, crescimento, casos, princípios — ajuda o agente a responder com mais contexto quando o lead perguntar. Se não tiver nada relevante, escreva 'não se aplica'."
          value={data.negocio.historia}
          onChange={(v) => patch("negocio")("historia", v)}
        />
        <Field
          label="Site"
          required
          helper="Se não tiver site, escreva 'não tenho'."
          value={data.negocio.site}
          onChange={(v) => patch("negocio")("site", v)}
        />
        <TextArea
          label="Redes sociais"
          required
          helper="Quais (Instagram, TikTok etc.) e os @ de cada uma. Se não tiver, escreva 'não tenho'."
          value={data.negocio.redesSociais}
          onChange={(v) => patch("negocio")("redesSociais", v)}
          rows={2}
        />
        <Field
          label="Endereço"
          required
          helper="Se for só remoto/online, escreva 'atendimento remoto'."
          value={data.negocio.endereco}
          onChange={(v) => patch("negocio")("endereco", v)}
        />
        <TextArea
          label="Estrutura física"
          required
          helper="Equipamentos, espaço, tecnologia, profissionais — só faz sentido se quiser que o agente fale sobre isso quando perguntado. Se não se aplica ao seu negócio, escreva 'não se aplica'."
          value={data.negocio.estruturaFisica}
          onChange={(v) => patch("negocio")("estruturaFisica", v)}
        />
        <TextArea
          label="Depoimentos de clientes"
          required
          helper="Se quiser que a IA use depoimentos reais pra ajudar a fechar uma venda, cole-os aqui (texto é suficiente — prints vão no link de arquivos abaixo). Se ainda não tiver, escreva 'não tenho depoimentos ainda'."
          value={data.negocio.depoimentos}
          onChange={(v) => patch("negocio")("depoimentos", v)}
        />
        <TextArea
          label="Algo a acrescentar sobre o negócio?"
          required
          helper="Qualquer coisa que não coube nas perguntas acima. Se não tiver mais nada, escreva 'sem mais informações'."
          value={data.negocio.extras}
          onChange={(v) => patch("negocio")("extras", v)}
        />
        <Callout>
          <span className="text-text font-semibold">
            Isso faz muita diferença na qualidade do agente.
          </span>{" "}
          Reúna numa única pasta do Google Drive tudo que puder ajudar: fotos de antes e
          depois (quando fizer sentido pro seu negócio), prints de depoimentos e avaliações de
          clientes (Google, Instagram, WhatsApp), vídeos, áudios, catálogos, tabelas de preço,
          apresentações — qualquer material que a equipe e o agente possam usar. Deixe a pasta
          com o acesso liberado por link (&quot;qualquer pessoa com o link pode visualizar&quot;)
          e cole o link abaixo.
        </Callout>
        <Field
          label="Link da pasta com fotos, depoimentos, vídeos, áudios e outros materiais"
          required
          helper="Google Drive, WeTransfer etc. É o principal jeito da gente conhecer visualmente o seu negócio — capriche."
          value={data.negocio.linkArquivos}
          onChange={(v) => patch("negocio")("linkArquivos", v)}
        />
      </div>
    ),
  },
  {
    id: "leads-funil",
    title: "Leads e perfil de cliente",
    validate: (d) =>
      requireAll([
        { label: "Origem dos leads", value: d.leadsFunil.origemLeads, minLen: 1 },
        { label: "Estratégia de funil de vendas", value: d.leadsFunil.estrategiaFunil, minLen: 1 },
        { label: "Persona ou ICP", value: d.leadsFunil.perfilLead, minLen: 1 },
        { label: "Objetivos comuns do lead", value: d.leadsFunil.objetivosLead, minLen: 1 },
        {
          label: "Agendamento condicionado ao ICP",
          value: d.leadsFunil.icpObrigatorio,
          minLen: 1,
        },
      ]),
    render: (data, patch) => (
      <div className="flex flex-col gap-5">
        <TextArea
          label="Qual a origem dos leads?"
          required
          helper="Ex.: tráfego pago, orgânico via Instagram, disparo de mensagens, indicação. Ajuda o agente a entender o contexto de quem está chegando — um lead de anúncio geralmente sabe menos sobre o negócio do que uma indicação, por exemplo."
          value={data.leadsFunil.origemLeads}
          onChange={(v) => patch("leadsFunil")("origemLeads", v)}
        />
        <TextArea
          label="Como é a estratégia de funil de vendas para cada produto/serviço?"
          required
          helper="Descreva o caminho que o lead percorre até fechar — isso define em que ponto da conversa o agente deve tentar avançar pro próximo passo (agendar, vender, pedir dado de contato etc.)."
          value={data.leadsFunil.estrategiaFunil}
          onChange={(v) => patch("leadsFunil")("estrategiaFunil", v)}
        />
        <TextArea
          label="Qual a descrição da persona ou ICP (perfil de cliente ideal) do negócio?"
          required
          helper="Quanto mais claro o perfil ideal, melhor o agente consegue identificar (e priorizar) os leads com mais chance de fechar."
          value={data.leadsFunil.perfilLead}
          onChange={(v) => patch("leadsFunil")("perfilLead", v)}
        />
        <TextArea
          label="Quais os objetivos mais comuns dos leads ao entrar em contato?"
          required
          helper="Ex.: agendar consulta, tirar dúvidas, comprar produto. Ajuda o agente a reconhecer rápido a intenção do lead logo nas primeiras mensagens."
          value={data.leadsFunil.objetivosLead}
          onChange={(v) => patch("leadsFunil")("objetivosLead", v)}
        />
        <TextArea
          label="O agendamento só deve ser feito se o lead cumprir todos os requisitos de ICP?"
          required
          helper="Explique quais são esses requisitos, se houver — isso evita que o agente marque reuniões com leads fora do perfil, o que costuma gerar no-show e desperdiçar sua agenda. Se não houver restrição, escreva 'não, agenda pra qualquer lead'."
          value={data.leadsFunil.icpObrigatorio}
          onChange={(v) => patch("leadsFunil")("icpObrigatorio", v)}
        />
      </div>
    ),
  },
  {
    id: "fluxo",
    title: "Fluxo de atendimento",
    validate: (d) =>
      requireAll([
        { label: "Script de atendimento", value: d.fluxoAtendimento.scriptPrincipal, minLen: 20 },
        {
          label: "Como lidar quando o lead foge do script",
          value: d.fluxoAtendimento.comoLidarForaDoScript,
          minLen: 1,
        },
        {
          label: "Quando acionar um humano",
          value: d.fluxoAtendimento.quandoAcionarHumano,
          minLen: 1,
        },
        { label: "Celular a notificar", value: d.fluxoAtendimento.celularNotificar, minLen: 8 },
        { label: "Mensagem pro atendente humano", value: d.fluxoAtendimento.mensagemHumano, minLen: 1 },
        {
          label: "Lógica do agendamento",
          value: d.fluxoAtendimento.comoFuncionaAgendamento,
          minLen: 1,
        },
        {
          label: "Pagamento antecipado",
          value: d.fluxoAtendimento.pagamentoAntecipado,
          minLen: 1,
        },
      ]),
    render: (data, patch) => (
      <div className="flex flex-col gap-5">
        <Callout>
          <span className="text-text font-semibold">Essa é a parte mais importante do formulário.</span>{" "}
          O agente vai seguir exatamente o que você escrever aqui — quanto mais detalhado
          e preciso o passo a passo, melhor ele vai se comportar. Dedique um tempo real pra
          essa resposta: descreva como a conversa deve começar, quais perguntas de
          qualificação fazer (e em que ordem), o que fazer com cada tipo de resposta, e como
          a conversa deve terminar. Se isso não estiver muito claro, o agente vai ter um
          comportamento diferente do que você espera.
        </Callout>
        <TextArea
          label="Qual script ou fluxo de atendimento o agente deve seguir?"
          required
          helper="Passo a passo completo: como recebe o lead, quantas perguntas faz, quais são elas, como conduz a conversa, quais as ramificações possíveis (o que fazer se o lead responder X, Y ou Z). Quanto mais detalhado, mais fiel o agente vai ser ao que você espera."
          value={data.fluxoAtendimento.scriptPrincipal}
          onChange={(v) => patch("fluxoAtendimento")("scriptPrincipal", v)}
          rows={10}
          emphasis
        />
        <TextArea
          label="Como lidar quando o lead foge do script principal?"
          required
          helper="Ex.: pergunta sobre preço antes da hora, já é cliente e quer tirar dúvida, quer reagendar ou desmarcar. Isso evita que o agente trave ou responda algo fora de contexto quando a conversa não segue o roteiro esperado."
          value={data.fluxoAtendimento.comoLidarForaDoScript}
          onChange={(v) => patch("fluxoAtendimento")("comoLidarForaDoScript", v)}
          rows={5}
        />
        <TextArea
          label="Em quais casos devemos acionar um humano ou pausar a interação?"
          required
          helper="Ex.: lead irritado, pedido de reembolso, dúvida técnica que o agente não sabe responder. Define o limite de atuação do agente antes de passar a conversa pra sua equipe."
          value={data.fluxoAtendimento.quandoAcionarHumano}
          onChange={(v) => patch("fluxoAtendimento")("quandoAcionarHumano", v)}
        />
        <Field
          label="Número de celular a notificar quando pausar ou o lead pedir um humano"
          required
          value={data.fluxoAtendimento.celularNotificar}
          onChange={(v) => patch("fluxoAtendimento")("celularNotificar", v)}
          placeholder="(31) 91234-5678"
        />
        <TextArea
          label="Qual mensagem devemos enviar para esse atendente humano?"
          required
          helper="O texto exato (ou o modelo) que vai avisar sua equipe que um lead precisa de atenção humana."
          value={data.fluxoAtendimento.mensagemHumano}
          onChange={(v) => patch("fluxoAtendimento")("mensagemHumano", v)}
        />
        <TextArea
          label="Como funciona a lógica do agendamento no dia a dia?"
          required
          helper="Ex.: precisa de intervalo entre reuniões, o lead pode reagendar direto com o agente, tem restrição de dias por profissional etc. (A quantidade de agendas e a disponibilidade padrão já foram cobertas na etapa do Cal.com — aqui é sobre as regras de condução da conversa.) Se não tiver nenhuma regra especial, escreva 'sem regras especiais'."
          value={data.fluxoAtendimento.comoFuncionaAgendamento}
          onChange={(v) => patch("fluxoAtendimento")("comoFuncionaAgendamento", v)}
        />
        <TextArea
          label="Em caso de compra direta ou pagamento antecipado, quais links/informações de pagamento devem ser enviados?"
          required
          helper="Se não houver pagamento antecipado no seu processo, escreva 'não se aplica'."
          value={data.fluxoAtendimento.pagamentoAntecipado}
          onChange={(v) => patch("fluxoAtendimento")("pagamentoAntecipado", v)}
        />
      </div>
    ),
  },
  {
    id: "follow-ups",
    title: "Follow-ups e lembretes",
    validate: (d) =>
      requireAll([
        { label: "Enviar follow-up", value: d.followUps.enviarFollowUp, minLen: 1 },
        { label: "Quantidade de follow-ups", value: d.followUps.quantidadeFollowUp, minLen: 1 },
        {
          label: "Primeiro follow-up após",
          value: d.followUps.primeiroFollowUpApos,
          minLen: 1,
        },
        {
          label: "Cadência dos próximos follow-ups",
          value: d.followUps.cadenciaProximos,
          minLen: 1,
        },
        { label: "Roteiros de follow-up", value: d.followUps.jaTemRoteiros, minLen: 1 },
        { label: "Lembretes de reunião", value: d.followUps.enviarLembretes, minLen: 1 },
      ]),
    render: (data, patch) => (
      <div className="flex flex-col gap-5">
        <Callout>
          Se você não usa follow-up hoje ou não sabe responder alguma dessas perguntas, sem
          problema — escreva &quot;não sei&quot; ou &quot;não tenho isso definido&quot; que a
          gente decide o que faz mais sentido pro seu negócio.
        </Callout>
        <Field
          label="Devemos enviar follow-up quando o lead deixar de responder?"
          required
          value={data.followUps.enviarFollowUp}
          onChange={(v) => patch("followUps")("enviarFollowUp", v)}
          placeholder="Sim / Não"
        />
        <Field
          label="Quantas mensagens de follow-up enviar pra quem parou de responder?"
          required
          value={data.followUps.quantidadeFollowUp}
          onChange={(v) => patch("followUps")("quantidadeFollowUp", v)}
        />
        <Field
          label="O primeiro follow-up deve ser feito após quanto tempo de inatividade?"
          required
          value={data.followUps.primeiroFollowUpApos}
          onChange={(v) => patch("followUps")("primeiroFollowUpApos", v)}
        />
        <Field
          label="Os próximos follow-ups devem seguir qual cadência?"
          required
          helper="Ex.: de 24 em 24 horas."
          value={data.followUps.cadenciaProximos}
          onChange={(v) => patch("followUps")("cadenciaProximos", v)}
        />
        <TextArea
          label="Você já tem os roteiros de cada mensagem de follow-up?"
          required
          helper="Se sim, cole-os aqui. Se não tiver, escreva 'não tenho' que a gente escreve por você."
          value={data.followUps.jaTemRoteiros}
          onChange={(v) => patch("followUps")("jaTemRoteiros", v)}
        />
        <Field
          label="Devemos enviar lembretes de reuniões agendadas? Quantos e quanto tempo antes?"
          required
          value={data.followUps.enviarLembretes}
          onChange={(v) => patch("followUps")("enviarLembretes", v)}
        />
      </div>
    ),
  },
  {
    id: "personalidade",
    title: "Personalidade do agente",
    validate: (d) =>
      requireAll([
        { label: "Nome do agente", value: d.personalidade.nomeAssistente, minLen: 1 },
        { label: "Comportamento", value: d.personalidade.comportamento, minLen: 1 },
        { label: "Assuntos a evitar", value: d.personalidade.assuntosEvitar, minLen: 1 },
        {
          label: "Mensagem para assunto evitado",
          value: d.personalidade.mensagemAssuntoEvitado,
          minLen: 1,
        },
      ]),
    render: (data, patch) => (
      <div className="flex flex-col gap-5">
        <Field
          label="Qual nome o agente terá?"
          required
          helper="Se não tiver preferência, escreva 'sem preferência' que a gente sugere um."
          value={data.personalidade.nomeAssistente}
          onChange={(v) => patch("personalidade")("nomeAssistente", v)}
        />
        <TextArea
          label="Como você deseja que ele se comporte?"
          required
          helper="Ex.: amigável, animado, sério, formal, persuasivo. Define o tom de voz do agente em toda conversa — se não tiver preferência, escreva 'sem preferência'."
          value={data.personalidade.comportamento}
          onChange={(v) => patch("personalidade")("comportamento", v)}
        />
        <TextArea
          label="Gostaria que o agente evitasse falar de algum assunto?"
          required
          helper="Se não houver nenhuma restrição, escreva 'nenhum'."
          value={data.personalidade.assuntosEvitar}
          onChange={(v) => patch("personalidade")("assuntosEvitar", v)}
        />
        <TextArea
          label="Se sim, qual mensagem devemos enviar quando perguntarem sobre isso?"
          required
          helper="Se a resposta anterior foi 'nenhum', pode escrever 'não se aplica' aqui."
          value={data.personalidade.mensagemAssuntoEvitado}
          onChange={(v) => patch("personalidade")("mensagemAssuntoEvitado", v)}
        />
      </div>
    ),
  },
  {
    id: "faq",
    title: "Perguntas frequentes",
    validate: (d) =>
      requireAll([{ label: "Perguntas e respostas frequentes", value: d.faq, minLen: 10 }]),
    render: (data, _patch, setData) => (
      <div className="flex flex-col gap-5">
        <Callout>
          Quais são as principais perguntas que seu negócio recebe no dia a dia — e as
          respostas ideais para elas? Isso vira a base de conhecimento do agente pra
          dúvidas fora do script principal. Siga o modelo:
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
    validate: () => null,
    render: (data, _patch, setData) => (
      <div className="flex flex-col gap-5">
        <Field
          label="Tem mais algum arquivo, print, vídeo ou áudio pra nos passar? (opcional)"
          helper="Se sobrou algo que não coube no link de arquivos lá na etapa 'Sobre o seu negócio', cole outro link aqui."
          value={data.linkArquivosAdicionais}
          onChange={(v) => setData((prev) => ({ ...prev, linkArquivosAdicionais: v }))}
        />
        <TextArea
          label="Alguma consideração adicional que não foi coberta? (opcional)"
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

function SupportNote() {
  return (
    <p className="text-center text-xs text-muted-2">
      Dúvidas enquanto preenche?{" "}
      <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent hover:underline">
        {SUPPORT_EMAIL}
      </a>
    </p>
  );
}

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
  const isLastStep = stepIndex === steps.length - 1;

  function goBack() {
    setError(null);
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function goNext() {
    const validationError = step.validate(data);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    if (isLastStep) {
      handleSubmit();
    } else {
      setStepIndex((i) => Math.min(steps.length - 1, i + 1));
    }
  }

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
        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12h6M9 16h6M9 8h2M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h1 className="text-2xl font-black tracking-tight">
            Formulário de onboarding do seu agente
          </h1>
        </div>
        <p className="text-muted leading-relaxed mb-4">
          Esse formulário existe pra entender à fundo o seu negócio e montar a primeira
          versão do seu agente de IA. Responda com{" "}
          <span className="text-text font-semibold">cuidado, atenção e o máximo de detalhes possível</span>{" "}
          — o agente só vai saber o que você contar aqui. Quanto mais preciso e completo,
          melhor ele vai atender e qualificar seus leads.
        </p>
        <p className="text-muted leading-relaxed mb-4">
          Todas as perguntas são obrigatórias — se alguma não se aplicar ao seu negócio, é só
          escrever isso mesmo (&quot;não se aplica&quot;, &quot;não sei&quot; etc.) que a gente
          ajusta. Se travar em algum campo, é porque a resposta ainda está curta demais ou
          faltou preencher algo — o próprio formulário avisa exatamente onde.
        </p>
        <p className="text-muted leading-relaxed mb-8">
          Tempo estimado: 20-30 minutos. Vale reservar um tempo tranquilo pra preencher com
          calma, principalmente a parte do script de atendimento — é a que mais define o
          comportamento do seu agente. Qualquer dúvida, manda um e-mail pra{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent hover:underline">
            {SUPPORT_EMAIL}
          </a>
          .
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
        <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden mb-3">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {steps.map((s, i) => (
            <span
              key={s.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === stepIndex
                  ? "w-6 bg-accent"
                  : i < stepIndex
                    ? "w-1.5 bg-accent/50"
                    : "w-1.5 bg-surface-2"
              }`}
            />
          ))}
        </div>
      </div>

      <div key={step.id} className="card-surface rounded-3xl p-8 sm:p-10 animate-fade-in-up">
        <h2 className="text-xl font-black tracking-tight mb-6">{step.title}</h2>
        {step.render(data, patch, setData, checkoutId)}
      </div>

      {error && (
        <p className="text-sm text-red-400 text-center font-medium leading-relaxed">{error}</p>
      )}

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goBack}
          disabled={stepIndex === 0}
          className="rounded-full border border-white/15 text-muted px-6 py-3 text-sm font-semibold hover:text-text transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full bg-accent text-[#07090a] font-semibold px-8 py-3 text-sm shadow-[0_8px_30px_-8px_rgba(0,200,83,0.55)] hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLastStep ? (loading ? "Enviando..." : isPreview ? "Simular envio" : "Enviar formulário") : "Próxima etapa"}
        </button>
      </div>

      <SupportNote />
    </div>
  );
}
