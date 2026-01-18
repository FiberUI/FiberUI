import "@repo/ui/globals.css";
import "@/app/global.css";

import { RootProvider } from "fumadocs-ui/provider/next";
import { Fraunces, Noto_Sans } from "next/font/google";
import { cn } from "@repo/ui/lib/utils";
import { Toaster } from "@repo/ui/components/toast";
import { Metadata } from "next";

const notoSansFont = Noto_Sans({
    subsets: ["latin"],
});

const frauncesSerifFont = Fraunces({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Fiber UI | Accessible & Beautiful React Component Library",
    description:
        "Fiber UI is a modern React component library built with Tailwind CSS and React Aria. Create accessible, customizable, and beautiful UI components for your web projects.",
    keywords: [
        "Fiber UI",
        "React component library",
        "Tailwind CSS",
        "React Aria",
        "accessible components",
        "customizable React components",
        "UI library",
        "web development",
        "frontend development",
    ],
    authors: [{ name: "Rajat Verma" }],
    robots: "index, follow",
    openGraph: {
        type: "website",
        url: "https://fiberui.com/",
        title: "Fiber UI | Accessible & Beautiful React Component Library",
        description:
            "Fiber UI is a modern React component library built with Tailwind CSS and React Aria. Create accessible, customizable, and beautiful UI components for your web projects.",
        siteName: "Fiber UI",
        images: [
            {
                url: "https://fiberui.com/og-img.png",
                width: 1200,
                height: 630,
                alt: "Fiber UI Landing Page",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@rajatverma3112",
        creator: "@rajatverma3112",
        title: "Fiber UI | Accessible & Beautiful React Component Library",
        description:
            "Fiber UI is a modern React component library built with Tailwind CSS and React Aria. Create accessible, customizable, and beautiful UI components for your web projects.",
        images: ["https://fiberui.com/og-img.png"],
    },
    metadataBase: new URL("https://fiberui.com/"),
};

export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={cn(notoSansFont.className, frauncesSerifFont.className)}
            suppressHydrationWarning
        >
            <body className="flex min-h-screen flex-col">
                <RootProvider>{children}</RootProvider>
                <Toaster />
            </body>
        </html>
    );
}
