import { ModalProvider } from "@/components/modal/ModalProvider";

export default function PlataformaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ModalProvider>{children}</ModalProvider>;
}
