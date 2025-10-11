import "@/app/global.css";
import { BaseLayoutProps } from "fumadocs-ui/layouts/links";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";
import { JSX } from "react";

const inter = Inter({
    subsets: ["latin"],
});

export default function Layout({ children }: BaseLayoutProps): JSX.Element {
    return (
        <html lang="en" className={inter.className} suppressHydrationWarning>
            <body className="flex min-h-screen flex-col">
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    );
}
