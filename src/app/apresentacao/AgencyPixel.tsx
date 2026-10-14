/**
 * Meta Pixel do funil da agência (/apresentacao). Pixel próprio, separado do
 * do curso (MetaPixel.tsx): configurado por NEXT_PUBLIC_META_PIXEL_ID_AGENCIA.
 * Sem a variável, não carrega nada.
 *
 * O PageView é enviado de duas formas com o MESMO event_id (a Meta junta os
 * dois e conta um só): um beacon de imagem imediato, que sai mesmo se o
 * fbevents.js demorar, for bloqueado ou a pessoa sair antes, e o fbq normal,
 * que mantém o matching avançado e os eventos seguintes. É o que segura o
 * connect rate em quem clica no anúncio e abre num celular lento.
 */
const PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID_AGENCIA ?? "").replace(/\D/g, "");

const SNIPPET = `
(function () {
  var eid = 'pv-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
  window.__fbPageViewId = eid;
  var i = new Image(1, 1);
  i.referrerPolicy = 'no-referrer-when-downgrade';
  i.src = 'https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&dl=' +
    encodeURIComponent(location.href) + '&eid=' + eid + '&noscript=0';
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;t.fetchPriority='high';
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init','${PIXEL_ID}');
  fbq('track','PageView',{},{eventID:eid});
})();
`;

export function AgencyPixel() {
  if (!PIXEL_ID) return null;
  return (
    <>
      <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="" />
      <link rel="preconnect" href="https://www.facebook.com" crossOrigin="" />
      <script id="agency-pixel" dangerouslySetInnerHTML={{ __html: SNIPPET }} />
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
