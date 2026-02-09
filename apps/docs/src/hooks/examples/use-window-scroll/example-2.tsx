"use client";

import { useWindowScroll } from "@repo/hooks/dom/use-window-scroll";
import { ArrowUp } from "lucide-react";

export const Example2 = () => {
    const { y } = useWindowScroll();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <h3 className="font-semibold">Back to Top Button</h3>

            <p className="text-muted-foreground text-sm">
                Scroll down to see the button appear.
            </p>

            <div className="bg-muted/20 h-40 w-full overflow-y-auto rounded-lg border p-4">
                <div className="h-[500px] space-y-4">
                    <p>Scroll me down...</p>
                    <p>Keep scrolling...</p>
                    <p>Almost there...</p>
                    <p>Here we go!</p>
                </div>
            </div>

            <button
                onClick={scrollToTop}
                disabled={y < 100}
                className={`bg-primary text-primary-foreground fixed bottom-8 right-8 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
                    y > 100
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-10 opacity-0"
                }`}
            >
                <ArrowUp className="h-6 w-6" />
                <span className="sr-only">Back to top</span>
            </button>
            <p className="text-muted-foreground mt-2 text-xs">
                (Note: This example uses window scroll, so you need to scroll
                the main page, not just the box above)
            </p>
        </div>
    );
};
