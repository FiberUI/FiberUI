import { useState, useEffect, useCallback, useRef } from "react";

interface IdleState {
    idle: boolean;
    isSupported: boolean;
    isGranted: boolean;
}

/**
 * Detect when the user's system is completely idle using the IdleDetector API.
 */
export function useIdle() {
    const [state, setState] = useState<IdleState>({
        idle: false,
        isSupported: false,
        isGranted: false,
    });

    const isSupported =
        typeof window !== "undefined" && "IdleDetector" in window;

    // We can only use the IdleDetector interface if supported.
    // The IdleDetector needs permission before using it.
    const requestPermission = useCallback(async () => {
        if (!isSupported) return false;
        try {
            // @ts-ignore - IdleDetector is an experimental API
            const status = await IdleDetector.requestPermission();
            setState((prev) => ({ ...prev, isGranted: status === "granted" }));
            return status === "granted";
        } catch (error) {
            console.error("Failed to request IdleDetector permission:", error);
            return false;
        }
    }, [isSupported]);

    useEffect(() => {
        setState((prev) => ({ ...prev, isSupported }));

        if (!isSupported) return;

        // Check if permission was already granted
        // @ts-ignore
        navigator.permissions
            .query({ name: "idle-detection" as PermissionName })
            .then((status) => {
                if (status.state === "granted") {
                    setState((prev) => ({ ...prev, isGranted: true }));
                }
            });
    }, [isSupported]);

    useEffect(() => {
        if (!state.isGranted) return;

        let detector: any;
        const abortController = new AbortController();

        const startIdleDetection = async () => {
            try {
                // @ts-ignore
                detector = new IdleDetector();
                detector.addEventListener("change", () => {
                    const isIdle =
                        detector.userState === "idle" ||
                        detector.screenState === "locked";
                    setState((prev) => ({ ...prev, idle: isIdle }));
                });

                await detector.start({
                    threshold: 60000,
                    signal: abortController.signal,
                });
            } catch (err) {
                console.error("Failed to start IdleDetector:", err);
            }
        };

        startIdleDetection();

        return () => {
            abortController.abort();
        };
    }, [state.isGranted]);

    return { ...state, requestPermission };
}
