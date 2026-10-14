import type { Metadata } from "next";
import { Suspense } from "react";
import { PlataformaAssinarForm } from "@/components/plataforma/PlataformaAssinarForm";

export const metadata: Metadata = {
  title: "Assinar — Plataforma",
  robots: { index: false, follow: false },
};

export default function AssinarPage() {
  return (
    <Suspense fallback={null}>
      <PlataformaAssinarForm />
    </Suspense>
  );
}
