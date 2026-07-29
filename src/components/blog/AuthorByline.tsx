import Image from "next/image";

export function AuthorByline({ date }: { date: string }) {
  const formatted = new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-3">
      <Image
        src="/team/lucas.jpg"
        alt="Lucas Magalhães, fundador do Revolução AI"
        width={44}
        height={44}
        className="rounded-full object-cover border border-white/10"
      />
      <div className="text-sm">
        <p className="font-semibold text-text">Lucas Magalhães</p>
        <p className="text-muted-2">
          Fundador do Revolução AI · {formatted}
        </p>
      </div>
    </div>
  );
}
