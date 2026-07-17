import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.revolucao-ai.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Revolução AI — Agentes de IA para pré-vendas",
    template: "%s | Revolução AI",
  },
  description:
    "O Revolução AI implementa agentes de IA para pré-vendas via WhatsApp e ensina outras pessoas a construírem uma agência de IA de resultado.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Revolução AI",
    description:
      "Agentes de IA para pré-vendas e formação para agências de IA.",
    url: siteUrl,
    siteName: "Revolução AI",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Revolução AI" }],
  },
  twitter: {
    card: "summary",
    title: "Revolução AI",
    description:
      "Agentes de IA para pré-vendas e formação para agências de IA.",
    images: ["/logo.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Revolução AI",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: ["https://instagram.com/revolucao.ai"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-31-3157-6084",
    contactType: "customer service",
    areaServed: "BR",
    availableLanguage: "Portuguese",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
