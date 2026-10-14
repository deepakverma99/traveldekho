import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://traveldekho.live";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/admin/",
                "/vendor/dashboard/",
                "/api/",
                "/*?*sort=*",
                "/*?*filter=*",
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}