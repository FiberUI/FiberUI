"use client";

import { useState, useEffect } from "react";
import { ArrowUp, FileCode } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { usePathname } from "next/navigation";

/**
 * FloatingNav - Provides floating navigation buttons on docs pages
 *
 * Features:
 * - "Go to Top" button that appears when user scrolls down
 * - "View Source" button that links to #hook-source-code section (hooks pages only)
 */
export function FloatingNav({
    showSourceCode = false,
}: {
    showSourceCode?: boolean;
}) {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const pathname = usePathname();

    const isComponentOrHookPage =
        pathname?.includes("/docs/components/") ||
        pathname?.includes("/docs/hooks/");

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling 400px
            setShowScrollTop(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (
        pathname?.endsWith("docs") ||
        pathname.endsWith("hooks") ||
        pathname.endsWith("components")
    ) {
        return null;
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToSource = () => {
        const sourceSection =
            document.getElementById("hook-source-code") ||
            document.getElementById("component-code");
        if (sourceSection) {
            sourceSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const className = cn(
        "flex h-8 cursor-pointer items-center justify-center gap-1 rounded-full px-4",
        "border-primary bg-primary text-primary-foreground border shadow-lg",
        "hover:bg-background hover:text-primary transition-all duration-75",
        "focus:ring-primary focus:outline-none focus:ring-2 focus:ring-offset-2",
    );
    return (
        <>
            <div className="fixed right-24 top-3 z-50 md:right-14 md:top-1 xl:right-4 xl:top-2">
                {/* View Source Button - only shown on hook pages */}
                {showSourceCode && isComponentOrHookPage && (
                    <button
                        onClick={scrollToSource}
                        className={className}
                        title="View Source Code"
                        aria-label="View source code"
                    >
                        <FileCode className="size-4" />
                        <span className="hidden text-xs font-semibold sm:block">
                            Source
                        </span>
                        <span className="text-xs font-semibold sm:block">
                            Code
                        </span>
                    </button>
                )}
            </div>

            {/* Scroll to Top Button */}
            <div className="fixed bottom-5 right-5 z-50">
                <button
                    onClick={scrollToTop}
                    className={cn(
                        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full",
                        "border-primary bg-background text-primary border shadow-lg",
                        "hover:bg-primary hover:text-primary-foreground transition-all duration-75",
                        "focus:ring-primary focus:outline-none focus:ring-2 focus:ring-offset-2",
                        showScrollTop
                            ? "translate-y-0 opacity-100"
                            : "pointer-events-none translate-y-4 opacity-0",
                    )}
                    title="Scroll to top"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-5 w-5" />
                </button>
            </div>
        </>
    );
}
