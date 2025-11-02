import "./global.css";
import "@repo/ui/globals.css";
import type { Metadata } from "next";

import { Fraunces, Noto_Sans } from "next/font/google";

// const geistSans = localFont({
//     src: "./fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
// });
// const geistMono = localFont({
//     src: "./fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
// });

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${notoSansFont.className} ${frauncesSerifFont.className}`}
            >
                {children}

                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "SoftwareApplication",
                            name: "Fiber UI",
                            url: "https://fiberui.com/",
                            applicationCategory: "WebApplication",
                            operatingSystem: "All",
                            author: {
                                "@type": "Person",
                                name: "Rajat Verma",
                            },
                            description:
                                "Fiber UI is a modern React component library built with Tailwind CSS and React Aria. Create accessible, customizable, and beautiful UI components for your web projects.",
                            softwareVersion: "1.0.0",
                        }),
                    }}
                />
            </body>
        </html>
    );
}
