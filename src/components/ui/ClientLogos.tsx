import Image from "next/image";

type LogoItem = {
  kind: "logo";
  name: string;
  src: string;
  width: number;
  height: number;
};

type PersonItem = {
  kind: "person";
  name: string;
  src: string;
};

type ClientItem = LogoItem | PersonItem;

const clients: ClientItem[] = [
  { kind: "logo", name: "Governo de Minas Gerais", src: "/clients/minas-gerais.png", width: 1280, height: 270 },
  { kind: "logo", name: "Casoca", src: "/clients/casoca.png", width: 554, height: 554 },
  { kind: "logo", name: "Bubble Box", src: "/clients/bubble-box.png", width: 554, height: 554 },
  { kind: "person", name: "Patricia Davidson", src: "/clients/patricia-davidson.png" },
  { kind: "logo", name: "Guedes & Cruz Advogados", src: "/clients/guedes-cruz.png", width: 303, height: 167 },
  { kind: "person", name: "Luiz Guedes", src: "/clients/luiz-guedes.png" },
  { kind: "logo", name: "GiO Estética Avançada", src: "/clients/gio-estetica.png", width: 225, height: 225 },
  { kind: "person", name: "Paulo Bernardo", src: "/clients/paulo-bernardo.png" },
  { kind: "logo", name: "Kanpai", src: "/clients/kanpai.png", width: 500, height: 500 },
  { kind: "person", name: "Benjamim Morais", src: "/clients/benjamim-morais.png" },
  { kind: "logo", name: "CBM Agro & Gestão de Passivos", src: "/clients/cbm-agro.png", width: 225, height: 225 },
  { kind: "person", name: "Andreia Antoniolli", src: "/clients/andreia-antoniolli.png" },
  { kind: "logo", name: "Bar do Lopes", src: "/clients/bar-do-lopes.png", width: 225, height: 225 },
  { kind: "person", name: "Willian Celso", src: "/clients/willian-celso.png" },
  { kind: "person", name: "Dra. Ryuza Gonçalves", src: "/clients/ryuza-goncalves.png" },
];

// Duplicada para o loop do CSS ficar contínuo (anda -50% e reinicia sem corte).
const track = [...clients, ...clients];

const LOGO_HEIGHT = 56;

function LogoChip({ item }: { item: LogoItem }) {
  const width = Math.round((item.width / item.height) * LOGO_HEIGHT);
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-surface px-5"
      style={{ height: LOGO_HEIGHT + 24 }}
      title={item.name}
    >
      <Image
        src={item.src}
        alt={item.name}
        width={width}
        height={LOGO_HEIGHT}
        className="rounded-md object-contain"
        style={{ height: LOGO_HEIGHT, width }}
      />
    </div>
  );
}

function PersonChip({ item }: { item: PersonItem }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-surface py-2 pl-2 pr-5">
      <Image
        src={item.src}
        alt={item.name}
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
      <span className="text-sm font-medium text-muted whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

export function ClientLogos() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="flex w-max items-center gap-4 animate-marquee">
        {track.map((item, index) =>
          item.kind === "logo" ? (
            <LogoChip key={`${item.name}-${index}`} item={item} />
          ) : (
            <PersonChip key={`${item.name}-${index}`} item={item} />
          )
        )}
      </div>
    </div>
  );
}
