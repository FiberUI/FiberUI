import { getPageImage, source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { createRelativeLink } from "fumadocs-ui/mdx";
import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
    BreadcrumbList,
    WithContext as JsonLdSchema,
    TechArticle,
} from "schema-dts";

const BASE_URL = "https://r.fiberui.com";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
    const params = await props.params;
    const page = source.getPage(params.slug);

    if (!page) notFound();

    const MDX = page.data.body;

    const baseUrl = BASE_URL;

    const url = `${baseUrl}/docs/${params.slug?.join("/") || ""}`;

    const articleContent = await page.data.getText("processed");

    const articleJsonLd: JsonLdSchema<TechArticle> = {
        "@id": url,
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: page.data.title,
        description: page.data.description,
        author: {
            "@type": "Person",
            name: "Rajat Verma",
            url: "https://x.com/rajatverma3112",
        },
        image: getPageImage(page).url,
        publisher: {
            "@type": "Organization",
            name: "FiberUI",
            logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.svg`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        keywords: page.data.keywords?.join(", "),
        articleBody: articleContent,
        abstract: page.data.description,
    };

    const breadcrumbJsonLd: JsonLdSchema<BreadcrumbList> = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement:
            params.slug?.map((slugItem, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: slugItem.charAt(0).toUpperCase() + slugItem.slice(1), // Capitalize
                item: `${baseUrl}/docs/${params.slug?.slice(0, index + 1).join("/")}`,
            })) || [],
    };

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleJsonLd),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd),
                }}
            />

            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody>
                <MDX
                    components={getMDXComponents({
                        // this allows you to link to other pages with relative file paths
                        a: createRelativeLink(source, page),
                    })}
                />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return source.generateParams();
}

export async function generateMetadata(
    props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) notFound();
    const url = `${BASE_URL}/docs/${params.slug?.join("/") || ""}`;

    return {
        title: page.data.title,
        description: page.data.description,
        keywords: page.data.keywords,
        alternates: {
            canonical: url,
        },
        openGraph: {
            images: getPageImage(page).url,
            title: page.data.title,
            url,
            description: page.data.description,
            creators: "Rajat Verma",
            authors: "Rajat Verma",
        },
        twitter: {
            card: "summary_large_image",
            images: getPageImage(page).url,
            title: page.data.title,

            description: page.data.description,
            creator: "Rajat Verma",
            creatorId: "@rajatverma3112",
        },
    };
}
