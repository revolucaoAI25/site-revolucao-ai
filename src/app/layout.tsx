import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://revolucao.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Revolução AI — Agentes de IA para pré-vendas",
    template: "%s | Revolução AI",
  },
  description:
    "O Revolução AI implementa agentes de IA para pré-vendas via WhatsApp e ensina outras pessoas a construírem uma agência de IA de resultado.",
  openGraph: {
    title: "Revolução AI",
    description:
      "Agentes de IA para pré-vendas e formação para agências de IA.",
    url: siteUrl,
    siteName: "Revolução AI",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://calendly.com" />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
