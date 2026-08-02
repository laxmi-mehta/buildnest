import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/signup"],
        disallow: ["/dashboard/", "/settings/", "/projects/", "/api/"],
      },
    ],
    sitemap: "https://buildnest-saas.vercel.app/sitemap.xml",
  };
}
