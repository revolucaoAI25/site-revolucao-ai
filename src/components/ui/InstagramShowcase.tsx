import Image from "next/image";

/**
 * Visual com prints reais do nosso Instagram (@revolucao.ai), usado para
 * reforçar a origem em conteúdo da marca. Duas imagens separadas (perfil +
 * grid de posts) sobrepostas, no estilo do material visual já usado pela
 * marca em outros materiais.
 */
export function InstagramShowcase() {
  return (
    <div className="relative mx-auto h-[360px] w-[280px] sm:h-[420px] sm:w-[320px]">
      <div className="glow h-[300px] w-[300px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <Image
        src="/instagram/phone-profile.png"
        alt="Perfil do Revolução AI no Instagram"
        width={259}
        height={380}
        className="absolute left-0 top-2 w-[62%] -rotate-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] sm:top-4"
      />
      <Image
        src="/instagram/phone-grid.png"
        alt="Posts do Revolução AI no Instagram"
        width={205}
        height={300}
        className="absolute bottom-2 right-0 w-[54%] rotate-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] sm:bottom-4"
      />
    </div>
  );
}
