import "@repo/ui/globals.css";
import "@/app/global.css";

import { RootProvider } from "fumadocs-ui/provider/next";
import { Fraunces, Noto_Sans } from "next/font/google";
import { cn } from "@repo/ui/lib/utils";
import { Toaster } from "@repo/ui/components/toast";

const notoSansFont = Noto_Sans({
    subsets: ["latin"],
});

const frauncesSerifFont = Fraunces({
    subsets: ["latin"],
});

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
