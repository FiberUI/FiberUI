import "@repo/ui/globals.css";
import "@/app/global.css";

import { RootProvider } from "fumadocs-ui/provider/next";
import { Noto_Sans } from "next/font/google";

const notoSansFont = Noto_Sans({
    subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={notoSansFont.className}
            suppressHydrationWarning
        >
            <body className="flex min-h-screen flex-col">
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    );
}
