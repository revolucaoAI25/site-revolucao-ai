import Image from "next/image";

type LogoItem = {
  kind: "logo";
  name: string;
  src: string;
  width: number;
  height: number;
};

type ScreenshotItem = {
  kind: "screenshot";
  name: string;
  src: string;
  width: number;
  height: number;
};

type ClientItem = LogoItem | ScreenshotItem;

const clients: ClientItem[] = [
  { kind: "logo", name: "Governo de Minas Gerais", src: "/clients/minas-gerais.png", width: 1280, height: 270 },
  { kind: "logo", name: "Casoca", src: "/clients/casoca.png", width: 554, height: 554 },
  { kind: "logo", name: "Bubble Box", src: "/clients/bubble-box.png", width: 554, height: 554 },
  { kind: "screenshot", name: "Patricia Davidson", src: "/clients/patricia-davidson.png", width: 1170, height: 696 },
  { kind: "logo", name: "Guedes & Cruz Advogados", src: "/clients/guedes-cruz.png", width: 303, height: 167 },
  { kind: "screenshot", name: "Luiz Guedes", src: "/clients/luiz-guedes.png", width: 1170, height: 467 },
  { kind: "logo", name: "GiO Estética Avançada", src: "/clients/gio-estetica.png", width: 225, height: 225 },
  { kind: "screenshot", name: "Paulo Bernardo", src: "/clients/paulo-bernardo.png", width: 1170, height: 463 },
  { kind: "logo", name: "Kanpai", src: "/clients/kanpai.png", width: 500, height: 500 },
  { kind: "screenshot", name: "Benjamim Morais", src: "/clients/benjamim-morais.png", width: 1170, height: 456 },
  { kind: "logo", name: "CBM Agro & Gestão de Passivos", src: "/clients/cbm-agro.png", width: 225, height: 225 },
  { kind: "screenshot", name: "Andreia Antoniolli", src: "/clients/andreia-antoniolli.png", width: 1170, height: 913 },
  { kind: "logo", name: "Bar do Lopes", src: "/clients/bar-do-lopes.png", width: 225, height: 225 },
  { kind: "screenshot", name: "Willian Celso", src: "/clients/willian-celso.png", width: 1170, height: 835 },
  { kind: "screenshot", name: "Dra. Ryuza Gonçalves", src: "/clients/ryuza-goncalves.png", width: 1170, height: 902 },
];

// Duplicada para o loop do CSS ficar contínuo (anda -50% e reinicia sem corte).
const track = [...clients, ...clients];

const LOGO_HEIGHT = 56;
const SCREENSHOT_HEIGHT = 132;

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

function ScreenshotChip({ item }: { item: ScreenshotItem }) {
  const width = Math.round((item.width / item.height) * SCREENSHOT_HEIGHT);
  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10"
      style={{ height: SCREENSHOT_HEIGHT }}
      title={item.name}
    >
      <Image
        src={item.src}
        alt={item.name}
        width={width}
        height={SCREENSHOT_HEIGHT}
        className="object-cover opacity-80 saturate-[0.85] brightness-95"
        style={{ height: SCREENSHOT_HEIGHT, width }}
      />
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
            <ScreenshotChip key={`${item.name}-${index}`} item={item} />
          )
        )}
      </div>
    </div>
  );
}
