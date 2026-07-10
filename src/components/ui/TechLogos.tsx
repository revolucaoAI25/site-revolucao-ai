import Image from "next/image";

type TechItem = {
  name: string;
  src: string;
  width: number;
  height: number;
};

const techs: TechItem[] = [
  { name: "Google Gemini", src: "/partners/gemini.png", width: 500, height: 185 },
  { name: "Claude (Anthropic)", src: "/partners/claude.png", width: 248, height: 58 },
  { name: "OpenAI", src: "/partners/openai.png", width: 2000, height: 544 },
  { name: "Meta", src: "/partners/meta.png", width: 1567, height: 1041 },
  { name: "WhatsApp", src: "/partners/whatsapp.png", width: 960, height: 962 },
];

const LOGO_HEIGHT = 32;

export function TechLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {techs.map((tech) => {
        const width = Math.round((tech.width / tech.height) * LOGO_HEIGHT);
        return (
          <div
            key={tech.name}
            className="flex shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-surface px-7 py-6"
            title={tech.name}
          >
            <Image
              src={tech.src}
              alt={tech.name}
              width={width}
              height={LOGO_HEIGHT}
              className="object-contain"
              style={{ height: LOGO_HEIGHT, width }}
            />
          </div>
        );
      })}
    </div>
  );
}
