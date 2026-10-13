import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // A v1 da LP do Zero aos 10K foi substituída pela v2. Qualquer link
      // antigo (anúncio, WhatsApp, favoritos) cai na v2, mantendo UTMs.
      // Temporário (307) de propósito, pra ser fácil de desfazer.
      {
        source: "/zero-aos-10k",
        destination: "/zero-aos-10k-v2",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
