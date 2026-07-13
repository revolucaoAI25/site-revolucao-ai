"use client";

import { useMemo, useState } from "react";

const PRECOS = { mensal: 497.9, anual: 337 } as const;

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
  const [taxaAgendamento, setTaxaAgendamento] = useState(15);
  const [taxaFechamento, setTaxaFechamento] = useState(20);
  const [plano, setPlano] = useState<"mensal" | "anual">("anual");

  const { reunioes, vendas, faturamento, investimento, roi } = useMemo(() => {
    const reunioes = leadsPorMes * (taxaAgendamento / 100);
    const vendas = reunioes * (taxaFechamento / 100);
    const faturamento = vendas * ticketMedio;
    const investimento = PRECOS[plano];
    const roi = investimento > 0 ? faturamento / investimento : 0;
    return { reunioes, vendas, faturamento, investimento, roi };
  }, [ticketMedio, leadsPorMes, taxaAgendamento, taxaFechamento, plano]);

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
        <Slider
          label="Taxa de agendamento / resposta"
          value={taxaAgendamento}
          onChange={setTaxaAgendamento}
          min={5}
          max={40}
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

        <div>
          <p className="text-sm font-medium text-muted mb-2.5">
            Plano considerado
          </p>
          <div className="flex gap-2">
            {(["mensal", "anual"] as const).map((opcao) => (
              <button
                key={opcao}
                type="button"
                onClick={() => setPlano(opcao)}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold capitalize transition-colors cursor-pointer ${
                  plano === opcao
                    ? "bg-accent text-[#07090a]"
                    : "border border-white/15 text-muted hover:text-text"
                }`}
              >
                {opcao}
              </button>
            ))}
          </div>
        </div>
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
              label="Reuniões / contatos"
              value={reunioes}
              widthPercent={barWidth(reunioes)}
            />
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
              sobre o investimento no plano {plano} (
              {formatBRL(investimento, 2)})
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-2 leading-relaxed">
          Estimativa com base nos números que você preencheu acima — ajuste as
          taxas conforme a realidade do seu negócio. Não é garantia de
          resultado.
        </p>
      </div>
    </div>
  );
}
