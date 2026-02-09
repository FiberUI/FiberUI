import { useState, useCallback } from "react";
import { useEventListener } from "@repo/hooks/dom/use-event-listener";

const isBrowser = typeof window !== "undefined";

/**
 * useOnline - Track network connectivity status
 *
 * @returns boolean indicating if the browser is online
 *
 * @example
 * const isOnline = useOnline();
 */
export function useOnline(): boolean {
    const [isOnline, setIsOnline] = useState(() =>
        isBrowser ? navigator.onLine : true,
    );

    const handleOnline = useCallback(() => setIsOnline(true), []);
    const handleOffline = useCallback(() => setIsOnline(false), []);

    useEventListener("online", handleOnline);
    useEventListener("offline", handleOffline);

    return isOnline;
}
