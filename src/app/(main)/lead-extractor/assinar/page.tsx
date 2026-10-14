import type { Metadata } from "next";
import { Suspense } from "react";
import { AssinarForm } from "@/components/lead-extractor/AssinarForm";

export const metadata: Metadata = {
  title: "Assinar — Lead Extractor",
  robots: { index: false, follow: false },
};

export default function AssinarPage() {
  return (
    <Suspense fallback={null}>
      <AssinarForm />
    </Suspense>
  );
}
