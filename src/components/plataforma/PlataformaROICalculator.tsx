"use client";

import { useMemo, useState } from "react";

type TipoVenda = "direta" | "agendamento";

function planoIndicado(volume: number) {
  if (volume <= 200) return "Start";
  if (volume <= 500) return "Growth";
  if (volume <= 1000) return "Scale";
  return "Enterprise";
}

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

function ComparisonBar({
  label,
  value,
  maxValue,
  accent,
}: {
  label: string;
  value: number;
  maxValue: number;
  accent?: boolean;
}) {
  const widthPercent = maxValue > 0 ? Math.max((value / maxValue) * 100, 4) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 text-sm">
        <span className="text-muted">{label}</span>
        <span className={`font-semibold ${accent ? "text-accent" : "text-text"}`}>
          {Math.round(value).toLocaleString("pt-BR")}
        </span>
      </div>
      <div className="h-7 rounded-full bg-surface-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-[width] duration-300 ${
            accent ? "bg-accent" : "bg-white/20"
          }`}
          style={{ width: `${widthPercent}%` }}
        />
      </div>
    </div>
  );
}

export function PlataformaROICalculator() {
  const [ticketMedio, setTicketMedio] = useState(1500);
  const [volume, setVolume] = useState(300);
  const [tipoVenda, setTipoVenda] = useState<TipoVenda>("agendamento");
  const [taxaAtual, setTaxaAtual] = useState(10);
  const [taxaComAgente, setTaxaComAgente] = useState(20);
  const [taxaFechamento, setTaxaFechamento] = useState(25);

  const { reunioesAtuais, reunioesComAgente, vendasAtuais, vendasComAgente, faturamentoAtual, faturamentoComAgente, plano } =
    useMemo(() => {
      const plano = planoIndicado(volume);

      if (tipoVenda === "direta") {
        const vendasAtuais = volume * (taxaAtual / 100);
        const vendasComAgente = volume * (taxaComAgente / 100);
        return {
          reunioesAtuais: null as number | null,
          reunioesComAgente: null as number | null,
          vendasAtuais,
          vendasComAgente,
          faturamentoAtual: vendasAtuais * ticketMedio,
          faturamentoComAgente: vendasComAgente * ticketMedio,
          plano,
        };
      }

      const reunioesAtuais = volume * (taxaAtual / 100);
      const reunioesComAgente = volume * (taxaComAgente / 100);
      const vendasAtuais = reunioesAtuais * (taxaFechamento / 100);
      const vendasComAgente = reunioesComAgente * (taxaFechamento / 100);
      return {
        reunioesAtuais,
        reunioesComAgente,
        vendasAtuais,
        vendasComAgente,
        faturamentoAtual: vendasAtuais * ticketMedio,
        faturamentoComAgente: vendasComAgente * ticketMedio,
        plano,
      };
    }, [volume, tipoVenda, taxaAtual, taxaComAgente, taxaFechamento, ticketMedio]);

  const deltaFaturamento = faturamentoComAgente - faturamentoAtual;
  const deltaReunioes =
    reunioesAtuais !== null && reunioesComAgente !== null ? reunioesComAgente - reunioesAtuais : null;
  const maxVendas = Math.max(vendasAtuais, vendasComAgente, 1);

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
              onChange={(e) => setTicketMedio(Math.max(0, Number(e.target.value) || 0))}
              className="w-full min-w-0 bg-transparent font-semibold focus:outline-none"
            />
          </div>
        </div>

        <Slider
          label="Conversas/leads recebidos por mês"
          value={volume}
          onChange={setVolume}
          min={50}
          max={2000}
          step={10}
          format={(v) => v.toLocaleString("pt-BR")}
        />

        <PillGroup
          label="Tipo de venda"
          value={tipoVenda}
          onChange={setTipoVenda}
          options={[
            { value: "agendamento", label: "Agendamento" },
            { value: "direta", label: "Venda direta" },
          ]}
        />

        {tipoVenda === "direta" ? (
          <>
            <Slider
              label="Sua taxa de conversão direta atual"
              value={taxaAtual}
              onChange={setTaxaAtual}
              min={1}
              max={50}
              step={1}
              format={(v) => `${v}%`}
            />
            <Slider
              label="Taxa de conversão estimada com o agente"
              value={taxaComAgente}
              onChange={setTaxaComAgente}
              min={1}
              max={60}
              step={1}
              format={(v) => `${v}%`}
            />
          </>
        ) : (
          <>
            <Slider
              label="Sua taxa de agendamento atual"
              value={taxaAtual}
              onChange={setTaxaAtual}
              min={1}
              max={50}
              step={1}
              format={(v) => `${v}%`}
            />
            <Slider
              label="Taxa de agendamento estimada com o agente"
              value={taxaComAgente}
              onChange={setTaxaComAgente}
              min={1}
              max={60}
              step={1}
              format={(v) => `${v}%`}
            />
            <Slider
              label="Taxa de fechamento (reunião → venda)"
              value={taxaFechamento}
              onChange={setTaxaFechamento}
              min={5}
              max={70}
              step={1}
              format={(v) => `${v}%`}
            />
          </>
        )}

        <p className="text-xs text-muted-2 leading-relaxed">
          Com esse volume de conversas, o plano indicado é o{" "}
          <span className="text-text font-semibold">{plano}</span>.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-3xl p-8 border border-accent/30 bg-accent-soft text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
            Faturamento a mais por mês
          </p>
          <p className="text-4xl sm:text-5xl font-black tracking-tight text-accent">
            +{formatBRL(Math.max(deltaFaturamento, 0))}
          </p>
          {deltaReunioes !== null && (
            <p className="text-sm text-muted mt-2">
              e +{Math.max(Math.round(deltaReunioes), 0).toLocaleString("pt-BR")} reuniões agendadas por mês
            </p>
          )}
        </div>

        <div className="card-surface rounded-3xl p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-6">
            Vendas fechadas por mês
          </p>
          <div className="flex flex-col gap-5">
            <ComparisonBar label="Hoje" value={vendasAtuais} maxValue={maxVendas} />
            <ComparisonBar label="Com o agente" value={vendasComAgente} maxValue={maxVendas} accent />
          </div>
        </div>

        <p className="text-xs text-muted-2 leading-relaxed">
          Estimativa com base nos números que você preencheu acima — ajuste
          conforme a realidade do seu negócio. Não é garantia de resultado; o
          ganho depende de uma boa configuração do agente (script, base de
          conhecimento e follow-up).
        </p>
      </div>
    </div>
  );
}
