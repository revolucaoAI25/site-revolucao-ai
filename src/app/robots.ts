import type { MetadataRoute } from "next";

const siteUrl = "https://www.revolucao-ai.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api/", "/*/assinar/obrigado"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
