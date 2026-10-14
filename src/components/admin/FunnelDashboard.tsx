import type { ReactNode } from "react";
import Link from "next/link";
import {
  CTA_LOCATIONS,
  FUNIL_STEPS,
  FUNNEL_PAGES,
  QUESTION_LABELS,
  V2_SECTIONS,
  type FunnelPage,
} from "@/lib/funnel-tracking";
import type { FunnelDashboardData, RecentSession } from "@/lib/funnel-analytics";

const PERIODS = [7, 14, 30, 90];
export const TZ = "America/Sao_Paulo";

export function pct(part: number, total: number): string {
  if (total <= 0) return "—";
  const value = (part / total) * 100;
  return `${value < 10 && value > 0 ? value.toFixed(1).replace(".", ",") : Math.round(value)}%`;
}

export function Card({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="card-surface rounded-3xl p-6 min-w-0">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-2">{title}</h2>
      {hint && <p className="text-muted text-sm mt-1.5 mb-5">{hint}</p>}
      {!hint && <div className="mb-5" />}
      {children}
    </section>
  );
}

export function Tile({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="card-surface rounded-3xl p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-2 mb-2">{label}</p>
      <p className={`text-3xl font-black tracking-tight ${accent ? "text-accent" : ""}`}>{value}</p>
      {sub && <p className="text-muted text-sm mt-1">{sub}</p>}
    </div>
  );
}

/** Uma linha de barra: rótulo, barra proporcional e o número escrito (nunca só a cor). */
export function BarRow({
  label,
  value,
  max,
  right,
  note,
  badge,
}: {
  label: string;
  value: number;
  max: number;
  right: string;
  note?: string;
  badge?: string;
}) {
  const width = max > 0 && value > 0 ? Math.max((value / max) * 100, 2) : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-1.5 text-sm">
        <span className="text-text flex items-center gap-2 min-w-0">
          <span className="truncate">{label}</span>
          {badge && (
            <span className="shrink-0 rounded-full border border-accent/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
              {badge}
            </span>
          )}
        </span>
        <span className="shrink-0 font-semibold text-text tabular-nums">{right}</span>
      </div>
      <div className="h-3 rounded-full bg-surface-2 overflow-hidden">
        <div className="h-full rounded-full bg-accent" style={{ width: `${width}%` }} />
      </div>
      {note && <p className="text-muted-2 text-xs mt-1">{note}</p>}
    </div>
  );
}

function SimpleList({ items, total }: { items: { key: string; sessions: number }[]; total: number }) {
  if (items.length === 0) return <p className="text-muted text-sm">Sem dados.</p>;
  const max = Math.max(...items.map((i) => i.sessions), 1);
  return (
    <div className="flex flex-col gap-3.5">
      {items.slice(0, 6).map((item) => (
        <BarRow
          key={item.key}
          label={item.key}
          value={item.sessions}
          max={max}
          right={`${item.sessions} · ${pct(item.sessions, total)}`}
        />
      ))}
    </div>
  );
}

/** Últimos N dias (fuso de São Paulo), com zero nos dias sem visita. */
export function lastDays(days: number): string[] {
  const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ });
  const out: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    out.push(fmt.format(new Date(Date.now() - i * 86_400_000)));
  }
  return out;
}

export function shortDate(iso: string) {
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
}

function DailyChart({ data, days }: { data: FunnelDashboardData; days: number }) {
  const series = lastDays(Math.min(days, 90)).map((day) => {
    const row = data.by_day.find((d) => d.day === day);
    return { day, sessions: row?.sessions ?? 0, leads: row?.leads ?? 0, checkouts: row?.checkouts ?? 0 };
  });
  const max = Math.max(...series.map((s) => s.sessions), 1);
  const peak = series.reduce((a, b) => (b.sessions > a.sessions ? b : a), series[0]);

  return (
    <div>
      <div
        role="img"
        aria-label={`Visitas por dia. Pico de ${peak.sessions} em ${shortDate(peak.day)}.`}
        className="flex items-end gap-[3px] h-40"
      >
        {series.map((s) => (
          <div key={s.day} className="flex-1 h-full flex items-end" title={`${shortDate(s.day)} — ${s.sessions} visitas, ${s.leads} leads, ${s.checkouts} cliques no checkout`}>
            <div
              className={`w-full rounded-t-sm ${s.sessions > 0 ? "bg-accent" : "bg-white/10"}`}
              style={{ height: s.sessions > 0 ? `${Math.max((s.sessions / max) * 100, 3)}%` : "2px" }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-muted-2">
        <span>{shortDate(series[0].day)}</span>
        <span>Pico: {peak.sessions} visitas em {shortDate(peak.day)}</span>
        <span>{shortDate(series[series.length - 1].day)}</span>
      </div>
    </div>
  );
}

function FunilSteps({ data }: { data: FunnelDashboardData }) {
  const bySteps = new Map(data.by_step.map((s) => [s.step, s.sessions]));
  const rows = FUNIL_STEPS.map((step) => ({ ...step, sessions: bySteps.get(step.id) ?? 0 }));

  let biggestDrop = { index: -1, lost: 0 };
  rows.forEach((row, i) => {
    if (i === 0) return;
    const lost = rows[i - 1].sessions - row.sessions;
    if (lost > biggestDrop.lost) biggestDrop = { index: i, lost };
  });

  const base = Math.max(data.sessions, rows[0].sessions, 1);
  return (
    <div className="flex flex-col gap-4">
      {rows.map((row, i) => {
        const prev = i > 0 ? rows[i - 1].sessions : null;
        const lost = prev !== null ? prev - row.sessions : 0;
        return (
          <BarRow
            key={row.id}
            label={`${i + 1}. ${row.label}`}
            value={row.sessions}
            max={base}
            right={`${row.sessions} · ${pct(row.sessions, data.sessions)}`}
            badge={i === biggestDrop.index && lost > 0 ? "maior queda" : undefined}
            note={prev !== null && prev > 0 && lost > 0 ? `Saíram aqui: ${lost} (${pct(lost, prev)} de quem chegou na etapa anterior)` : undefined}
          />
        );
      })}
      <BarRow
        label={`${rows.length + 1}. Clicou no botão de compra`}
        value={data.checkout_sessions}
        max={base}
        right={`${data.checkout_sessions} · ${pct(data.checkout_sessions, data.sessions)}`}
        note={
          rows[rows.length - 1].sessions > 0
            ? `${pct(data.checkout_sessions, rows[rows.length - 1].sessions)} de quem viu a oferta clicou`
            : undefined
        }
      />
    </div>
  );
}

function Answers({ data }: { data: FunnelDashboardData }) {
  const groups = Object.keys(QUESTION_LABELS)
    .map((q) => ({ q, items: data.answers.filter((a) => a.question === q) }))
    .filter((g) => g.items.length > 0);
  if (groups.length === 0) return <p className="text-muted text-sm">Ninguém respondeu ainda nesse período.</p>;
  return (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
      {groups.map((g) => {
        const total = g.items.reduce((sum, i) => sum + i.sessions, 0);
        const max = Math.max(...g.items.map((i) => i.sessions), 1);
        return (
          <div key={g.q}>
            <p className="text-sm font-semibold mb-3">{QUESTION_LABELS[g.q]}</p>
            <div className="flex flex-col gap-3">
              {g.items.map((item) => (
                <BarRow
                  key={item.label}
                  label={item.label}
                  value={item.sessions}
                  max={max}
                  right={`${item.sessions} · ${pct(item.sessions, total)}`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    timeZone: TZ,
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const APP_LABELS: Record<string, string> = {
  instagram: "app do Instagram",
  facebook: "app do Facebook",
  tiktok: "app do TikTok",
};

function RecentSessions({ recent, page }: { recent: RecentSession[]; page: FunnelPage }) {
  if (recent.length === 0) return <p className="text-muted text-sm">Nenhuma visita nesse período.</p>;
  return (
    <div className="flex flex-col gap-2">
      {recent.map((s) => {
        const stepLabel =
          page === "funil-10k"
            ? s.max_step_index !== null
              ? FUNIL_STEPS[s.max_step_index]?.label ?? "—"
              : "—"
            : s.max_scroll !== null
              ? `rolou ${s.max_scroll}%`
              : "não rolou";
        const status = s.clicked
          ? { text: "Clicou no checkout", cls: "bg-accent text-[#07090a]" }
          : s.is_lead
            ? { text: "Virou lead", cls: "bg-accent-soft text-accent border border-accent/30" }
            : s.answers.length > 0 || (s.max_scroll ?? 0) >= 25
              ? { text: "Saiu no meio", cls: "bg-white/[0.06] text-text" }
              : { text: "Só abriu", cls: "bg-white/[0.04] text-muted-2" };
        const app = s.pv?.in_app && APP_LABELS[s.pv.in_app];
        return (
          <details key={s.session_id} className="group card-surface rounded-2xl px-4 py-3">
            <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-1.5 text-sm [&::-webkit-details-marker]:hidden">
              <span className="text-muted-2 tabular-nums sm:w-28 shrink-0">{formatWhen(s.first_seen)}</span>
              <span className="text-muted shrink-0">
                {s.pv?.device === "mobile" ? "Celular" : s.pv?.device === "desktop" ? "Computador" : "—"}
                {app ? ` · ${app}` : ""}
              </span>
              <span className="text-text min-w-0 basis-full sm:basis-0 sm:flex-1 order-last sm:order-none">
                Foi até: <span className="font-semibold">{stepLabel}</span>
              </span>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${status.cls}`}>
                {status.text}
              </span>
            </summary>
            <div className="mt-3 pt-3 border-t border-white/10 text-sm flex flex-col gap-2">
              {s.answers.length === 0 ? (
                <p className="text-muted-2">Não respondeu nenhuma pergunta.</p>
              ) : (
                s.answers.map((a, i) => (
                  <p key={i} className="text-muted">
                    <span className="text-muted-2">
                      {(a.question && QUESTION_LABELS[a.question]) ?? a.question}:
                    </span>{" "}
                    <span className="text-text">{a.label}</span>
                  </p>
                ))
              )}
              {(s.pv?.utm_campaign || s.pv?.utm_source) && (
                <p className="text-muted-2 text-xs">
                  Origem: {s.pv?.utm_source || "—"} · campanha: {s.pv?.utm_campaign || "—"}
                </p>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}

function PillLink({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
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

export function FunnelControls({ page, days }: { page: FunnelPage; days: number }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        {FUNNEL_PAGES.map((p) => (
          <PillLink key={p.id} href={`/admin/funis?pagina=${p.id}&dias=${days}`} active={p.id === page}>
            {p.label}
          </PillLink>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {PERIODS.map((d) => (
          <PillLink key={d} href={`/admin/funis?pagina=${page}&dias=${d}`} active={d === days}>
            {d} dias
          </PillLink>
        ))}
      </div>
    </div>
  );
}

export function FunnelDashboard({
  page,
  days,
  data,
  recent,
}: {
  page: FunnelPage;
  days: number;
  data: FunnelDashboardData;
  recent: RecentSession[];
}) {
  const isQuiz = page === "funil-10k";
  const bounced = Math.max(data.sessions - data.engaged, 0);
  const offerStepSessions = data.by_step.find((s) => s.step === "offer")?.sessions ?? 0;
  const scrollMap = new Map(data.scroll.map((s) => [s.percent, s.sessions]));
  const sectionMap = new Map(data.sections.map((s) => [s.section, s.sessions]));
  const offerSectionSessions = sectionMap.get("oferta") ?? 0;

  if (data.sessions === 0) {
    return (
      <Card title="Sem visitas nesse período">
        <p className="text-muted text-sm leading-relaxed max-w-xl">
          Assim que alguém abrir a página, os números aparecem aqui. As suas próprias visitas de teste
          podem ser deixadas de fora abrindo a página com <code className="text-text">?notrack</code> no
          final do endereço (e <code className="text-text">?track</code> pra voltar a contar).
        </p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Tile label="Visitas" value={String(data.sessions)} sub={`${bounced} saíram sem interagir`} />
        <Tile
          label="Interagiram"
          value={pct(data.engaged, data.sessions)}
          sub={isQuiz ? "responderam ao menos 1 pergunta" : "rolaram ao menos 25% da página"}
        />
        {isQuiz ? (
          <Tile label="Viraram lead" value={String(data.leads)} sub={`${pct(data.leads, data.sessions)} das visitas`} accent />
        ) : (
          <Tile
            label="Chegaram na oferta"
            value={String(offerSectionSessions)}
            sub={`${pct(offerSectionSessions, data.sessions)} das visitas`}
          />
        )}
        <Tile
          label="Clicaram na compra"
          value={String(data.checkout_sessions)}
          sub={
            isQuiz
              ? `${pct(data.checkout_sessions, data.sessions)} das visitas · ${pct(data.checkout_sessions, offerStepSessions)} de quem viu a oferta`
              : `${pct(data.checkout_sessions, data.sessions)} das visitas`
          }
          accent
        />
      </div>

      <Card title="Visitas por dia" hint="Passe o mouse (ou toque) numa barra pra ver visitas, leads e cliques do dia.">
        <DailyChart data={data} days={days} />
      </Card>

      {isQuiz ? (
        <Card
          title="Funil etapa por etapa"
          hint="Quantas pessoas chegaram em cada tela. A porcentagem é sobre o total de visitas."
        >
          <FunilSteps data={data} />
        </Card>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card title="Até onde rolaram" hint="Maior ponto da página que cada visita alcançou.">
            <div className="flex flex-col gap-4">
              {[25, 50, 75, 100].map((mark) => (
                <BarRow
                  key={mark}
                  label={`${mark}% da página`}
                  value={scrollMap.get(mark) ?? 0}
                  max={data.sessions}
                  right={`${scrollMap.get(mark) ?? 0} · ${pct(scrollMap.get(mark) ?? 0, data.sessions)}`}
                />
              ))}
            </div>
          </Card>
          <Card title="Seções que chegaram a ver" hint="Conta quando a seção entra na tela.">
            <div className="flex flex-col gap-4">
              {V2_SECTIONS.map((section) => (
                <BarRow
                  key={section.id}
                  label={section.label}
                  value={sectionMap.get(section.id) ?? 0}
                  max={data.sessions}
                  right={`${sectionMap.get(section.id) ?? 0} · ${pct(sectionMap.get(section.id) ?? 0, data.sessions)}`}
                />
              ))}
            </div>
          </Card>
        </div>
      )}

      <Card title="Cliques no botão de compra" hint="Cada botão da página, com o total de cliques e de pessoas diferentes.">
        {data.ctas.length === 0 ? (
          <p className="text-muted text-sm">Ninguém clicou no período.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {[...data.ctas]
              .sort((a, b) => b.clicks - a.clicks)
              .map((c) => (
                <BarRow
                  key={c.location}
                  label={CTA_LOCATIONS[c.location] ?? c.location}
                  value={c.clicks}
                  max={Math.max(...data.ctas.map((x) => x.clicks), 1)}
                  right={`${c.clicks} cliques · ${c.sessions} pessoas`}
                />
              ))}
          </div>
        )}
      </Card>

      {isQuiz && (
        <Card title="O que as pessoas responderam" hint="Inclui quem saiu antes de deixar nome e telefone.">
          <Answers data={data} />
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="De onde vêm" hint="Fonte e campanha vêm dos UTMs do link do anúncio.">
          <div className="flex flex-col gap-7">
            <div>
              <p className="text-sm font-semibold mb-3">Campanha</p>
              <SimpleList items={data.utm_campaign} total={data.sessions} />
            </div>
            <div>
              <p className="text-sm font-semibold mb-3">Fonte</p>
              <SimpleList items={data.utm_source} total={data.sessions} />
            </div>
          </div>
        </Card>
        <Card
          title="Aparelho e navegador"
          hint="Quem abre dentro do app do Instagram/Facebook costuma ter mais perda de carregamento."
        >
          <div className="flex flex-col gap-7">
            <div>
              <p className="text-sm font-semibold mb-3">Aparelho</p>
              <SimpleList items={data.devices} total={data.sessions} />
            </div>
            <div>
              <p className="text-sm font-semibold mb-3">Abriu dentro de</p>
              <SimpleList
                items={data.in_app.map((i) => ({
                  key: i.key === "nenhum" ? "Navegador normal" : (APP_LABELS[i.key] ?? i.key),
                  sessions: i.sessions,
                }))}
                total={data.sessions}
              />
            </div>
          </div>
        </Card>
      </div>

      <Card
        title="Últimas visitas"
        hint={
          isQuiz
            ? "Clique numa linha pra ver o que a pessoa respondeu — inclusive quem saiu no meio."
            : "Clique numa linha pra ver a origem da visita."
        }
      >
        <RecentSessions recent={recent} page={page} />
      </Card>
    </div>
  );
}
