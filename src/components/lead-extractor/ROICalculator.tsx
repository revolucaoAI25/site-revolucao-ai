"use client";

import { useMemo, useState } from "react";

const INVESTIMENTO_MENSAL = 337;

// Taxas médias de resposta pra prospecção fria — pesquisa de mercado (não
// exibidas ao lead, só usadas internamente pra estimar o funil a partir do
// canal escolhido). WhatsApp com mensagem padrão/genérica costuma girar em
// 5-10% de resposta; ligação fria (taxa de conexão pra agendamento) fica na
// faixa de 2-3%; usar os dois canais juntos amplia o alcance total, mas não é
// simplesmente a soma das duas taxas.
const TAXA_RESPOSTA = { whatsapp: 8, ligacao: 3, ambos: 10 } as const;

type Canal = keyof typeof TAXA_RESPOSTA;
type TipoVenda = "direta" | "agendamento";

function formatBRL(value: number, digits = 0) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: digits,
  }).format(value);
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <label className="text-sm font-medium text-muted">{label}</label>
        <span className="text-sm font-bold text-accent">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider w-full"
        style={{
          background: `linear-gradient(to right, var(--color-accent) ${percent}%, var(--color-surface-2) ${percent}%)`,
        }}
        aria-label={label}
      />
    </div>
  );
}

function PillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-muted mb-2.5">{label}</p>
      <div className="flex gap-2">
        {options.map((opcao) => (
          <button
            key={opcao.value}
            type="button"
            onClick={() => onChange(opcao.value)}
            className={`flex-1 rounded-full px-3 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
              value === opcao.value
                ? "bg-accent text-[#07090a]"
                : "border border-white/15 text-muted hover:text-text"
            }`}
          >
            {opcao.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function FunnelBar({
  label,
  value,
  widthPercent,
}: {
  label: string;
  value: number;
  widthPercent: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-semibold text-text">
          {Math.round(value).toLocaleString("pt-BR")}
        </span>
      </div>
      <div className="h-6 rounded-full bg-surface-2 overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${widthPercent}%` }}
        />
      </div>
    </div>
  );
}

export function ROICalculator() {
  const [ticketMedio, setTicketMedio] = useState(1500);
  const [leadsPorMes, setLeadsPorMes] = useState(300);
  const [canal, setCanal] = useState<Canal>("ambos");
  const [tipoVenda, setTipoVenda] = useState<TipoVenda>("agendamento");
  const [taxaConversaoChamada, setTaxaConversaoChamada] = useState(20);
  const [taxaAgendamento, setTaxaAgendamento] = useState(15);
  const [taxaFechamento, setTaxaFechamento] = useState(20);

  const { contatos, reunioes, vendas, faturamento, roi } = useMemo(() => {
    const contatos = leadsPorMes * (TAXA_RESPOSTA[canal] / 100);
    if (tipoVenda === "direta") {
      const vendas = contatos * (taxaConversaoChamada / 100);
      const faturamento = vendas * ticketMedio;
      const roi = faturamento / INVESTIMENTO_MENSAL;
      return { contatos, reunioes: null as number | null, vendas, faturamento, roi };
    }
    const reunioes = contatos * (taxaAgendamento / 100);
    const vendas = reunioes * (taxaFechamento / 100);
    const faturamento = vendas * ticketMedio;
    const roi = faturamento / INVESTIMENTO_MENSAL;
    return { contatos, reunioes, vendas, faturamento, roi };
  }, [leadsPorMes, canal, tipoVenda, taxaConversaoChamada, taxaAgendamento, taxaFechamento, ticketMedio]);

  // Escala não-linear (raiz quadrada) só pra manter as barras do funil
  // legíveis mesmo quando "vendas" é uma fração pequena de "leads" — o
  // número exato de cada estágio já está escrito ao lado da barra.
  function barWidth(value: number) {
    if (leadsPorMes <= 0 || value <= 0) return 0;
    return Math.max(Math.sqrt(value / leadsPorMes) * 100, 6);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="card-surface rounded-3xl p-8 flex flex-col gap-7">
        <div>
          <label className="text-sm font-medium text-muted block mb-2.5">
            Ticket médio do seu produto/serviço
          </label>
          <div className="flex items-center rounded-2xl border border-white/10 bg-surface-2 px-5 py-4 focus-within:border-accent/50">
            <span className="text-muted font-medium mr-1 shrink-0">R$</span>
            <input
              type="number"
              min={0}
              step={50}
              value={ticketMedio}
              onChange={(e) =>
                setTicketMedio(Math.max(0, Number(e.target.value) || 0))
              }
              className="w-full min-w-0 bg-transparent font-semibold focus:outline-none"
            />
          </div>
        </div>

        <Slider
          label="Leads extraídos por mês"
          value={leadsPorMes}
          onChange={setLeadsPorMes}
          min={50}
          max={2000}
          step={10}
          format={(v) => v.toLocaleString("pt-BR")}
        />

        <PillGroup
          label="Canal de contato"
          value={canal}
          onChange={setCanal}
          options={[
            { value: "whatsapp", label: "WhatsApp" },
            { value: "ligacao", label: "Ligação" },
            { value: "ambos", label: "Ambos" },
          ]}
        />

        <PillGroup
          label="Tipo de venda"
          value={tipoVenda}
          onChange={setTipoVenda}
          options={[
            { value: "direta", label: "Venda direta" },
            { value: "agendamento", label: "Agendamento" },
          ]}
        />

        {tipoVenda === "direta" ? (
          <Slider
            label="Taxa de conversão na chamada"
            value={taxaConversaoChamada}
            onChange={setTaxaConversaoChamada}
            min={5}
            max={50}
            step={1}
            format={(v) => `${v}%`}
          />
        ) : (
          <>
            <Slider
              label="Taxa de agendamento"
              value={taxaAgendamento}
              onChange={setTaxaAgendamento}
              min={5}
              max={50}
              step={1}
              format={(v) => `${v}%`}
            />
            <Slider
              label="Taxa de fechamento"
              value={taxaFechamento}
              onChange={setTaxaFechamento}
              min={5}
              max={50}
              step={1}
              format={(v) => `${v}%`}
            />
          </>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div className="card-surface rounded-3xl p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-6">
            Seu funil estimado
          </p>
          <div className="flex flex-col gap-5">
            <FunnelBar
              label="Leads extraídos"
              value={leadsPorMes}
              widthPercent={100}
            />
            <FunnelBar
              label="Contatos / respostas"
              value={contatos}
              widthPercent={barWidth(contatos)}
            />
            {reunioes !== null && (
              <FunnelBar
                label="Reuniões agendadas"
                value={reunioes}
                widthPercent={barWidth(reunioes)}
              />
            )}
            <FunnelBar
              label="Vendas fechadas"
              value={vendas}
              widthPercent={barWidth(vendas)}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="card-surface rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-2">
              Faturamento estimado/mês
            </p>
            <p className="text-3xl font-black tracking-tight">
              {formatBRL(faturamento)}
            </p>
          </div>
          <div className="rounded-3xl p-6 border border-accent/30 bg-accent-soft">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
              Retorno estimado
            </p>
            <p className="text-3xl font-black tracking-tight text-accent">
              {roi.toFixed(1)}x
            </p>
            <p className="text-xs text-muted mt-1">
              sobre o investimento mensal no Lead Extractor ({formatBRL(INVESTIMENTO_MENSAL, 2)})
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-2 leading-relaxed">
          Estimativa com base nos números que você preencheu acima e em taxas
          médias de resposta de prospecção fria por canal — ajuste as taxas de
          conversão conforme a realidade do seu negócio. Não é garantia de
          resultado.
        </p>
      </div>
    </div>
  );
}
