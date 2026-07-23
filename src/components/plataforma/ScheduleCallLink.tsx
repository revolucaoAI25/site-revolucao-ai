"use client";

import { useQualificationModal } from "@/components/modal/ModalProvider";

export function ScheduleCallLink({ children }: { children: React.ReactNode }) {
  const { open } = useQualificationModal();
  return (
    <button
      type="button"
      onClick={() => open("plataforma-upgrade")}
      className="text-accent hover:underline font-semibold cursor-pointer"
    >
      {children}
    </button>
  );
}
