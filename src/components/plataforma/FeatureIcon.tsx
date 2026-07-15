import type { ReactNode } from "react";

const paths: Record<string, ReactNode> = {
  chat: (
    <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3H6a2 2 0 0 1-2-2V6Z" />
  ),
  book: (
    <>
      <path d="M12 4.5c-1.8-1-4.2-1.3-7-.5v14c2.8-.8 5.2-.5 7 .5 1.8-1 4.2-1.3 7-.5v-14c-2.8-.8-5.2-.5-7 .5Z" />
      <path d="M12 4.5v14" />
    </>
  ),
  repeat: (
    <>
      <path d="M17 2.5l4 4-4 4" />
      <path d="M3 11.5v-1a4 4 0 0 1 4-4h14" />
      <path d="M7 21.5l-4-4 4-4" />
      <path d="M21 12.5v1a4 4 0 0 1-4 4H3" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8.5a6 6 0 0 1 12 0c0 6.5 2.5 8.5 2.5 8.5h-17s2.5-2 2.5-8.5Z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  pause: (
    <>
      <rect x="7" y="4" width="4" height="16" rx="1" />
      <rect x="13" y="4" width="4" height="16" rx="1" />
    </>
  ),
  kanban: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16M15 4v16" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2.5 20c0-3.3 2.9-6 6.5-6s6.5 2.7 6.5 6" />
      <circle cx="17.5" cy="9" r="2.3" />
      <path d="M15.8 14.2c2.7.5 5.2 2.5 5.2 5.8" />
    </>
  ),
  attachment: <path d="M8 12.5l6.5-6.5a3 3 0 1 1 4.2 4.2l-8.4 8.4a5 5 0 1 1-7.1-7.1L12 2.9" />,
  dashboard: <path d="M4 20V11M10 20V4M16 20v-6M22 20H2" />,
  link: (
    <>
      <path d="M9.5 14.5l5-5" />
      <path d="M13 5.3l1-1a3 3 0 1 1 4.2 4.2l-1 1" />
      <path d="M11 18.7l-1 1a3 3 0 1 1-4.2-4.2l1-1" />
    </>
  ),
  sliders: (
    <>
      <line x1="4" y1="6" x2="20" y2="6" />
      <circle cx="9" cy="6" r="2" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <circle cx="15" cy="12" r="2" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="7" cy="18" r="2" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4L12 3Z" />
      <path d="M19 15l.6 1.8 1.9.7-1.9.7L19 20l-.6-1.8-1.9-.7 1.9-.7.6-1.8Z" />
    </>
  ),
  inbox: (
    <>
      <path d="M3.5 12h4.5l1.7 2.5h4.6l1.7-2.5h4.5" />
      <path d="M3.5 12 5 5.5A2 2 0 0 1 6.9 4h10.2a2 2 0 0 1 1.9 1.5L20.5 12" />
      <path d="M3.5 12v5a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-5" />
    </>
  ),
  channels: (
    <>
      <path d="M3.5 5.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5.5a2 2 0 0 1-2 2H9l-3 2.3v-2.3H5.5a2 2 0 0 1-2-2V5.5Z" />
      <path d="M13 4.3h4.6a2 2 0 0 1 2 2v5.4a2 2 0 0 1-2 2H17v2.3l-2.7-2.3" />
    </>
  ),
  code: (
    <>
      <path d="M8.5 7.5 3.5 12l5 4.5" />
      <path d="M15.5 7.5l5 4.5-5 4.5" />
      <path d="M13 5l-2 14" />
    </>
  ),
};

export type FeatureIconName = keyof typeof paths;

export function FeatureIcon({ name, size = 22 }: { name: FeatureIconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
