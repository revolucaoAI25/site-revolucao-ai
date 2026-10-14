import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ModalProvider } from "@/components/modal/ModalProvider";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModalProvider>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </ModalProvider>
  );
}
