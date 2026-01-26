import { MetadataRoute } from "next";
import { getPageImage, source } from "@/lib/source";

const BASE_URL = "https://r.fiberui.com";

const getImageUrl = (imgUrl: string) => {
    return `${BASE_URL}${imgUrl}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
    const pages = source.getPages().map((page) => ({
        url: `${BASE_URL}${page.url}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
        images: [getImageUrl(getPageImage(page).url)],
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        ...pages,
    ];
}
