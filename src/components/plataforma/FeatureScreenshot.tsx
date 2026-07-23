import Image from "next/image";

export function FeatureScreenshot({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="w-full h-auto"
      />
    </div>
  );
}
