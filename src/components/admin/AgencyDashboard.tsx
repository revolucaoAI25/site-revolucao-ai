import Link from "next/link";
import { BarRow, Card, Tile, TZ, lastDays, pct, shortDate } from "@/components/admin/FunnelDashboard";
import {
  CHAT_STEPS,
  VOLUME_OPTIONS,
  type AgencyLeadRow,
} from "@/lib/agency-funnel";
import type { FunnelDashboardResult } from "@/lib/funnel-analytics";

export const AGENCY_PERIODS = [7, 14, 30, 90];

const STEP_LABELS: Record<string, string> = {
  hook_intro: "Abertura (40 a 100 consultas)",
  hook_proof: "Prova (25.000 leads, +100 empresas)",
  hook_case_medico: "Casos (clínica e médico)",
  nome: "Pergunta: nome",
  area_atuacao: "Pergunta: área de atuação",
  problema: "Pergunta: o que mais trava",
  hook_pilares: "Os 3 pilares",
  volume_leads: "Pergunta: leads por mês",
  whatsapp: "Pergunta: WhatsApp",
  instagram: "Pergunta: Instagram",
  hook_benefits: "Benefícios (24/7, setup)",
  final: "Botão final (agendar / WhatsApp / Plataforma)",
};

function PillLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        active ? "bg-accent text-[#07090a]" : "bg-white/[0.04] text-muted hover:text-text"
      }`}
    >
      {children}
    </Link>
  );
}

export function AgencyControls({ aba, days }: { aba: "metricas" | "kanban"; days: number }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex gap-2">
        <PillLink href={`/admin/agencia?aba=metricas&dias=${days}`} active={aba === "metricas"}>
          Métricas
        </PillLink>
        <PillLink href={`/admin/agencia?aba=kanban&dias=${days}`} active={aba === "kanban"}>
          Kanban
        </PillLink>
      </div>
      {aba === "metricas" && (
        <div className="flex flex-wrap gap-2">
          {AGENCY_PERIODS.map((d) => (
            <PillLink key={d} href={`/admin/agencia?aba=metricas&dias=${d}`} active={d === days}>
              {d} dias
            </PillLink>
          ))}
        </div>
      )}
    </div>
  );
}

const dayKey = (iso: string) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date(iso));
const isScheduled = (l: AgencyLeadRow) => l.stage === "agendou";

function countBy(leads: AgencyLeadRow[], key: (l: AgencyLeadRow) => string | null | undefined, fallback: string) {
  const map = new Map<string, number>();
  for (const l of leads) {
    const k = key(l)?.trim() || fallback;
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

function GroupTable({
  title,
  hint,
  leads,
  field,
  fallback,
}: {
  title: string;
  hint: string;
  leads: AgencyLeadRow[];
  field: "utm_campaign" | "utm_medium" | "utm_content" | "utm_source";
  fallback: string;
}) {
  const groups = new Map<string, { started: number; qualified: number; scheduled: number }>();
  for (const l of leads) {
    const k = l[field]?.trim() || fallback;
    const g = groups.get(k) ?? { started: 0, qualified: 0, scheduled: 0 };
    g.started += 1;
    if (l.qualified) g.qualified += 1;
    if (isScheduled(l)) g.scheduled += 1;
    groups.set(k, g);
  }
  const rows = [...groups.entries()].sort((a, b) => b[1].started - a[1].started).slice(0, 10);

  return (
    <Card title={title} hint={hint}>
      {rows.length === 0 ? (
        <p className="text-muted text-sm">Sem dados.</p>
      ) : (
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm min-w-[340px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-muted-2">
                <th className="font-semibold pb-2 pr-3">Nome</th>
                <th className="font-semibold pb-2 px-2 text-right">Começ.</th>
                <th className="font-semibold pb-2 px-2 text-right">Qualific.</th>
                <th className="font-semibold pb-2 px-2 text-right">Agend.</th>
                <th className="font-semibold pb-2 pl-2 text-right">Taxa*</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([name, g]) => (
                <tr key={name} className="border-t border-white/5">
                  <td className="py-2 pr-3 max-w-[180px] truncate" title={name}>
                    {name}
                  </td>
                  <td className="py-2 px-2 text-right tabular-nums">{g.started}</td>
                  <td className="py-2 px-2 text-right tabular-nums">{g.qualified}</td>
                  <td className="py-2 px-2 text-right tabular-nums font-semibold text-accent">{g.scheduled}</td>
                  <td className="py-2 pl-2 text-right tabular-nums">{pct(g.scheduled, g.qualified)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-muted-2 text-xs mt-3">Começ. = começaram a conversa · Qualific. = qualificados · Agend. = agendaram · *Agendaram ÷ qualificados.</p>
        </div>
      )}
    </Card>
  );
}

function DailyLeadsChart({ leads, days }: { leads: AgencyLeadRow[]; days: number }) {
  const series = lastDays(Math.min(days, 90)).map((day) => {
    const ofDay = leads.filter((l) => dayKey(l.created_at) === day);
    return { day, started: ofDay.length, scheduled: ofDay.filter(isScheduled).length };
  });
  const max = Math.max(...series.map((s) => s.started), 1);
  const peak = series.reduce((a, b) => (b.started > a.started ? b : a), series[0]);

  return (
    <div>
      <div
        role="img"
        aria-label={`Leads por dia. Pico de ${peak.started} em ${shortDate(peak.day)}.`}
        className="flex items-end gap-[3px] h-40"
      >
        {series.map((s) => (
          <div
            key={s.day}
            className="relative flex-1 h-full flex items-end"
            title={`${shortDate(s.day)} — ${s.started} começaram, ${s.scheduled} agendaram`}
          >
            <div
              className={`relative w-full rounded-t-sm ${s.started > 0 ? "bg-accent/35" : "bg-white/10"}`}
              style={{ height: s.started > 0 ? `${Math.max((s.started / max) * 100, 3)}%` : "2px" }}
            >
              {s.scheduled > 0 && (
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-t-sm bg-accent"
                  style={{ height: `${(s.scheduled / s.started) * 100}%` }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-muted-2">
        <span>{shortDate(series[0].day)}</span>
        <span>
          Pico: {peak.started} em {shortDate(peak.day)}
        </span>
        <span>{shortDate(series[series.length - 1].day)}</span>
      </div>
      <div className="flex gap-5 mt-3 text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-accent/35" /> Começaram a conversa
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-accent" /> Desses, agendaram
        </span>
      </div>
    </div>
  );
}

export function AgencyMetrics({
  leads,
  visitors,
  days,
}: {
  leads: AgencyLeadRow[];
  visitors: FunnelDashboardResult;
  days: number;
}) {
  const visitorData = visitors.status === "ok" ? visitors.data : null;
  const visits = visitorData?.sessions ?? 0;

  const started = leads.length;
  const answeredVolume = leads.filter((l) => l.volume_leads).length;
  const qualified = leads.filter((l) => l.qualified).length;
  const reachedFinal = leads.filter((l) => l.qualified && l.final_at).length;
  const openedCalendar = leads.filter((l) => l.qualified && l.calendly_opened_at).length;
  const scheduled = leads.filter(isScheduled).length;
  const whatsapp = leads.filter((l) => l.destination === "whatsapp").length;
  const plataforma = leads.filter((l) => l.destination === "plataforma").length;
  const canceled = leads.filter((l) => l.status === "cancelou").length;
  const base = Math.max(started, 1);

  const faixaCounts = VOLUME_OPTIONS.map((o) => ({
    label: o.label,
    count: leads.filter((l) => l.volume_faixa === o.key).length,
  }));
  const problemaCounts = countBy(
    leads.filter((l) => l.problema),
    (l) => l.problema,
    "—"
  );
  const deviceCounts = countBy(leads, (l) => l.device, "desconhecido");
  const inAppCounts = countBy(leads, (l) => (l.in_app === "nenhum" ? "Navegador normal" : l.in_app ? `app do ${l.in_app}` : null), "desconhecido");

  // Onde as pessoas saem (visitas anônimas, inclusive quem não chegou a dar o nome).
  const bySteps = new Map(visitorData?.by_step.map((s) => [s.step, s.sessions]) ?? []);
  const stepRows = [...CHAT_STEPS.map((s) => s.id), "final"].map((id) => ({
    id,
    label: STEP_LABELS[id] ?? id,
    sessions: bySteps.get(id) ?? 0,
  }));
  let biggestDrop = { index: -1, lost: 0 };
  stepRows.forEach((row, i) => {
    if (i === 0) return;
    const lost = stepRows[i - 1].sessions - row.sessions;
    if (lost > biggestDrop.lost) biggestDrop = { index: i, lost };
  });

  if (started === 0 && visits === 0) {
    return (
      <Card title="Sem movimento nesse período">
        <p className="text-muted text-sm leading-relaxed max-w-xl">
          Assim que alguém abrir <code className="text-text">/apresentacao</code> e responder o nome,
          os números aparecem aqui. Suas visitas de teste podem ficar de fora abrindo a página com{" "}
          <code className="text-text">?notrack</code> no final do endereço.
        </p>
      </Card>
    );
  }

  const funnelRows = [
    { label: "Começaram a conversa (deram o nome)", value: started },
    { label: "Informaram quantos leads recebem por mês", value: answeredVolume },
    { label: "Qualificados (mais de 50 leads por mês)", value: qualified },
    { label: "Qualificados que chegaram no botão final", value: reachedFinal },
    { label: "Qualificados que abriram a agenda", value: openedCalendar },
    { label: "Agendaram", value: scheduled },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Tile
          label="Visitas"
          value={visitorData ? String(visits) : "—"}
          sub={visitorData ? `${pct(started, visits)} começaram a conversa` : "Rode o SQL das métricas dos funis"}
        />
        <Tile label="Começaram a conversa" value={String(started)} sub="deram pelo menos o nome" />
        <Tile
          label="Qualificados"
          value={String(qualified)}
          sub={`${pct(qualified, answeredVolume)} de quem informou os leads por mês`}
          accent
        />
        <Tile
          label="Agendaram"
          value={String(scheduled)}
          sub={`${pct(scheduled, qualified)} dos qualificados`}
          accent
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <Tile label="Foram pro WhatsApp" value={String(whatsapp)} sub="1 a 50 leads por mês" />
        <Tile label="Foram pra Plataforma" value={String(plataforma)} sub="ainda sem leads" />
        <Tile label="Abriram a agenda" value={String(openedCalendar)} sub={`${pct(scheduled, openedCalendar)} deles agendaram`} />
        <Tile label="Cancelaram" value={String(canceled)} sub="desfizeram o agendamento" />
      </div>

      <Card title="Leads por dia" hint="Passe o mouse (ou toque) numa barra pra ver os números do dia.">
        <DailyLeadsChart leads={leads} days={days} />
      </Card>

      <Card
        title="Funil de qualificação"
        hint="De quem começou a conversa até o agendamento. A porcentagem é sobre quem começou."
      >
        <div className="flex flex-col gap-4">
          {funnelRows.map((row, i) => (
            <BarRow
              key={row.label}
              label={`${i + 1}. ${row.label}`}
              value={row.value}
              max={base}
              right={`${row.value} · ${pct(row.value, started)}`}
            />
          ))}
        </div>
      </Card>

      {visitorData && (
        <Card
          title="Onde as pessoas saem da conversa"
          hint="Conta toda visita, inclusive de quem nunca chegou a dar o nome. A porcentagem é sobre o total de visitas."
        >
          <div className="flex flex-col gap-4">
            {stepRows.map((row, i) => {
              const prev = i > 0 ? stepRows[i - 1].sessions : null;
              const lost = prev !== null ? prev - row.sessions : 0;
              return (
                <BarRow
                  key={row.id}
                  label={`${i + 1}. ${row.label}`}
                  value={row.sessions}
                  max={Math.max(visits, stepRows[0].sessions, 1)}
                  right={`${row.sessions} · ${pct(row.sessions, visits)}`}
                  badge={i === biggestDrop.index && lost > 0 ? "maior queda" : undefined}
                  note={prev !== null && prev > 0 && lost > 0 ? `Saíram aqui: ${lost} (${pct(lost, prev)} de quem chegou na etapa anterior)` : undefined}
                />
              );
            })}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GroupTable
          title="Por campanha"
          hint="Vem do utm_campaign do link do anúncio."
          leads={leads}
          field="utm_campaign"
          fallback="(sem campanha)"
        />
        <GroupTable
          title="Por conjunto de anúncios"
          hint="Vem do utm_medium do link do anúncio."
          leads={leads}
          field="utm_medium"
          fallback="(sem conjunto)"
        />
        <GroupTable
          title="Por anúncio"
          hint="Vem do utm_content do link do anúncio."
          leads={leads}
          field="utm_content"
          fallback="(sem anúncio)"
        />
        <GroupTable
          title="Por fonte"
          hint="Vem do utm_source do link do anúncio."
          leads={leads}
          field="utm_source"
          fallback="(direto)"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Leads por mês que recebem" hint="Define pra onde a pessoa vai no final.">
          <div className="flex flex-col gap-3.5">
            {faixaCounts.map((f) => (
              <BarRow
                key={f.label}
                label={f.label}
                value={f.count}
                max={Math.max(...faixaCounts.map((x) => x.count), 1)}
                right={`${f.count} · ${pct(f.count, answeredVolume)}`}
              />
            ))}
          </div>
        </Card>
        <Card title="O que mais trava as vendas" hint="Resposta da pergunta 3 da conversa.">
          {problemaCounts.length === 0 ? (
            <p className="text-muted text-sm">Sem dados.</p>
          ) : (
            <div className="flex flex-col gap-3.5">
              {problemaCounts.map(([label, count]) => (
                <BarRow
                  key={label}
                  label={label}
                  value={count}
                  max={problemaCounts[0][1]}
                  right={`${count} · ${pct(count, problemaCounts.reduce((s, [, c]) => s + c, 0))}`}
                />
              ))}
            </div>
          )}
        </Card>
        <Card title="Aparelho" hint="Dos leads que começaram a conversa.">
          <div className="flex flex-col gap-3.5">
            {deviceCounts.map(([label, count]) => (
              <BarRow
                key={label}
                label={label === "mobile" ? "Celular" : label === "desktop" ? "Computador" : label}
                value={count}
                max={deviceCounts[0][1]}
                right={`${count} · ${pct(count, started)}`}
              />
            ))}
          </div>
        </Card>
        <Card title="Abriu dentro de" hint="Navegador do Instagram/Facebook costuma perder mais gente.">
          <div className="flex flex-col gap-3.5">
            {inAppCounts.map(([label, count]) => (
              <BarRow
                key={label}
                label={label}
                value={count}
                max={inAppCounts[0][1]}
                right={`${count} · ${pct(count, started)}`}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
