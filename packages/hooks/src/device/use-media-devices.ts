import { useState, useEffect } from "react";

export function useMediaDevices() {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let mounted = true;

        const getDevices = async () => {
            if (typeof navigator === "undefined" || !navigator.mediaDevices) {
                if (mounted) {
                    setIsLoading(false);
                    // Not supported or SSR
                }
                return;
            }

            try {
                const deviceInfos =
                    await navigator.mediaDevices.enumerateDevices();
                if (mounted) {
                    setDevices(deviceInfos);
                    setIsLoading(false);
                }
            } catch (err) {
                if (mounted) {
                    setError(
                        err instanceof Error
                            ? err
                            : new Error("Failed to enumerate devices"),
                    );
                    setIsLoading(false);
                }
            }
        };

        // Initial fetch
        getDevices();

        // Listen for changes
        const handleChange = () => {
            getDevices();
        };

        if (typeof navigator !== "undefined" && navigator.mediaDevices) {
            navigator.mediaDevices.addEventListener(
                "devicechange",
                handleChange,
            );
        }

        return () => {
            mounted = false;
            if (typeof navigator !== "undefined" && navigator.mediaDevices) {
                navigator.mediaDevices.removeEventListener(
                    "devicechange",
                    handleChange,
                );
            }
        };
    }, []);

    // Helper to check if API is supported
    const isSupported =
        typeof navigator !== "undefined" && !!navigator.mediaDevices;

    return {
        devices,
        isLoading,
        error,
        isSupported,
    };
}
