import Image from "next/image";

/**
 * Composição com a marca (estátua) e prints reais do nosso Instagram
 * (@revolucao.ai) — estátua no topo, os dois celulares sobrepostos por
 * baixo, no mesmo arranjo do material visual já usado pela marca.
 */
export function InstagramShowcase() {
  return (
    <div className="relative mx-auto h-[400px] w-[300px] sm:h-[450px] sm:w-[340px]">
      <div className="glow h-[320px] w-[320px] left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2" />
      <Image
        src="/instagram/statue.png"
        alt="Marca Revolução AI"
        width={367}
        height={380}
        className="absolute left-1/2 top-0 w-[68%] -translate-x-1/2"
      />
      <Image
        src="/instagram/phone-grid.png"
        alt="Posts do Revolução AI no Instagram"
        width={205}
        height={300}
        className="absolute left-[-4%] top-[38%] w-[58%] -rotate-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
      />
      <Image
        src="/instagram/phone-profile.png"
        alt="Perfil do Revolução AI no Instagram"
        width={259}
        height={380}
        className="absolute right-[-4%] top-[30%] w-[66%] rotate-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
      />
    </div>
  );
}
