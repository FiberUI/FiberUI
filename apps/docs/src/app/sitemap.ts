import { MetadataRoute } from "next";
import { getPageImage, source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
    const url = "https://r.fiberui.com";

    const pages = source.getPages().map((page) => ({
        url: `${url}${page.url}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
        images: [getPageImage(page).url],
    }));

    return [
        {
            url: url,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        ...pages,
    ];
}
