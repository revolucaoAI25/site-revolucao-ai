import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo.png"
        alt="Revolução AI"
        width={32}
        height={32}
        className="h-8 w-8 shrink-0 rounded-full"
        priority
      />
      <span className="font-black tracking-tight text-base sm:text-lg text-text">
        Revolução AI
      </span>
    </span>
  );
}
