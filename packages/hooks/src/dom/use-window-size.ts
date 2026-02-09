import { useState, useCallback } from "react";
import { useEventListener } from "@repo/hooks/dom/use-event-listener";

interface WindowSize {
    width: number;
    height: number;
}

const isBrowser = typeof window !== "undefined";

/**
 * useWindowSize - Track window dimensions
 *
 * @returns Object with width and height of the window
 *
 * @example
 * const { width, height } = useWindowSize();
 */
export function useWindowSize(): WindowSize {
    const [size, setSize] = useState<WindowSize>(() => ({
        width: isBrowser ? window.innerWidth : 0,
        height: isBrowser ? window.innerHeight : 0,
    }));

    const handleResize = useCallback(() => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    useEventListener("resize", handleResize);

    return size;
}
