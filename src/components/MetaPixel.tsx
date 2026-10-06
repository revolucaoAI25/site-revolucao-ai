const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const PIXEL_SNIPPET = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');
`;

/**
 * Meta Pixel (Facebook/Instagram Ads) — só carrega nas páginas que
 * explicitamente renderizam este componente (hoje: /funil-10k e
 * /zero-aos-10k-v2), não em todo o site. Precisa de
 * NEXT_PUBLIC_META_PIXEL_ID configurado (.env.local local, Vercel em
 * produção); sem essa variável, não renderiza nada e as chamadas de
 * evento em src/lib/pixel.ts viram no-op.
 *
 * É um <script> inline no HTML (não next/script com afterInteractive) de
 * propósito: o PageView dispara assim que o navegador lê o HTML, sem
 * esperar o JavaScript do site baixar e hidratar. Com afterInteractive, em
 * celular com 4G lento o PageView saía ~1s depois da página já aparecer —
 * quem fechava nesse intervalo contava como clique no anúncio sem
 * "visualização da página de destino", derrubando o connect rate.
 *
 * Server Component de propósito: o script precisa estar no HTML inicial.
 */
export function MetaPixel() {
  if (!PIXEL_ID) return null;

  return (
    <>
      <script id="meta-pixel-base" dangerouslySetInnerHTML={{ __html: PIXEL_SNIPPET }} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
