import { useState, useCallback } from "react";
import { useEventListener } from "@repo/hooks/dom/use-event-listener";

interface ScrollPosition {
    x: number;
    y: number;
}

const isBrowser = typeof window !== "undefined";

/**
 * useWindowScroll - Track window scroll position
 *
 * @returns Object with x and y scroll positions
 *
 * @example
 * const { x, y } = useWindowScroll();
 */
export function useWindowScroll(): ScrollPosition {
    const [position, setPosition] = useState<ScrollPosition>(() => ({
        x: isBrowser ? window.scrollX : 0,
        y: isBrowser ? window.scrollY : 0,
    }));

    const handleScroll = useCallback(() => {
        setPosition({
            x: window.scrollX,
            y: window.scrollY,
        });
    }, []);

    useEventListener("scroll", handleScroll, null, { passive: true });

    return position;
}
