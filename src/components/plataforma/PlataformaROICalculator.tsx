"use client";

import { useMemo, useState } from "react";

function planoIndicado(volume: number) {
  if (volume <= 200) return "Start";
  if (volume <= 500) return "Growth";
  if (volume <= 1000) return "Scale";
  return "Enterprise";
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
  const [volume, setVolume] = useState(300);
  const [taxaAtual, setTaxaAtual] = useState(10);
  const [taxaComAgente, setTaxaComAgente] = useState(20);

  const { reunioesAtuais, reunioesComAgente, delta, plano } = useMemo(() => {
    const reunioesAtuais = volume * (taxaAtual / 100);
    const reunioesComAgente = volume * (taxaComAgente / 100);
    return {
      reunioesAtuais,
      reunioesComAgente,
      delta: reunioesComAgente - reunioesAtuais,
      plano: planoIndicado(volume),
    };
  }, [volume, taxaAtual, taxaComAgente]);

  const maxValue = Math.max(reunioesAtuais, reunioesComAgente, 1);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="card-surface rounded-3xl p-8 flex flex-col gap-7">
        <Slider
          label="Conversas/leads recebidos por mês"
          value={volume}
          onChange={setVolume}
          min={50}
          max={2000}
          step={10}
          format={(v) => v.toLocaleString("pt-BR")}
        />
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
        <p className="text-xs text-muted-2 leading-relaxed">
          Com esse volume de conversas, o plano indicado é o{" "}
          <span className="text-text font-semibold">{plano}</span>.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-3xl p-8 border border-accent/30 bg-accent-soft text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
            Reuniões a mais por mês
          </p>
          <p className="text-5xl font-black tracking-tight text-accent">
            +{Math.max(Math.round(delta), 0).toLocaleString("pt-BR")}
          </p>
        </div>

        <div className="card-surface rounded-3xl p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-6">
            Reuniões agendadas por mês
          </p>
          <div className="flex flex-col gap-5">
            <ComparisonBar label="Hoje" value={reunioesAtuais} maxValue={maxValue} />
            <ComparisonBar
              label="Com o agente"
              value={reunioesComAgente}
              maxValue={maxValue}
              accent
            />
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
