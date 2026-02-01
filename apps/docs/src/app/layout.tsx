import "@/app/global.css";
import Script from "next/script";

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
    title: {
        template: "%s | Fiber UI",
        default: "Fiber UI | Accessible & Beautiful React Component Library",
    },
    description:
        "Fiber UI is a modern React component library built with Tailwind CSS and React Aria. Create accessible, customizable, and beautiful UI components for your web projects.",
    applicationName: "Fiber UI",
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
    authors: [{ name: "Rajat Verma", url: "https://r.fiberui.com" }],
    creator: "Rajat Verma",
    publisher: "Rajat Verma",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        url: "https://r.fiberui.com/",
        title: {
            template: "%s | Fiber UI",
            default:
                "Fiber UI | Accessible & Beautiful React Component Library",
        },
        description:
            "Fiber UI is a modern React component library built with Tailwind CSS and React Aria. Create accessible, customizable, and beautiful UI components for your web projects.",
        siteName: "Fiber UI",
        images: [
            {
                url: "https://r.fiberui.com/og-img.png",
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
        title: {
            template: "%s | Fiber UI",
            default:
                "Fiber UI | Accessible & Beautiful React Component Library",
        },
        description:
            "Fiber UI is a modern React component library built with Tailwind CSS and React Aria. Create accessible, customizable, and beautiful UI components for your web projects.",
        images: ["https://r.fiberui.com/og-img.png"],
    },
    metadataBase: new URL("https://r.fiberui.com/"),
    alternates: {
        canonical: "/",
    },
};

// Removed JSON-LD schemas
export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={cn(notoSansFont.className, frauncesSerifFont.className)}
            suppressHydrationWarning
        >
            <GoogleAnalyticsScript />

            <body className="flex min-h-screen flex-col">
                <RootProvider>{children}</RootProvider>
                <Toaster />
            </body>
        </html>
    );
}

const GoogleAnalyticsScript = () => {
    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-JD87FR42B4"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-JD87FR42B4');
        `}
            </Script>
        </>
    );
};
