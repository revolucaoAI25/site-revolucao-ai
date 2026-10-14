import type { ReactNode } from "react";

/**
 * Layout raiz próprio do funil de conversa (/apresentacao): sem a fonte, o
 * CSS global e os dados estruturados do resto do site. É página de anúncio,
 * aberta num celular qualquer em rede ruim, então cada byte que não é da
 * própria conversa (a fonte Inter sozinha são 48 KB) atrasa o carregamento
 * e o disparo do Pixel. Todo o visual está em apresentacao/chat.module.css.
 */
export default function ChatRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, background: "#1c1d1c" }}>{children}</body>
    </html>
  );
}
