import { useState, useEffect, useCallback, useMemo } from "react";

/**
 * Device kind types for filtering
 */
export type MediaDeviceKind = "audioinput" | "audiooutput" | "videoinput";

/**
 * Options for the useMediaDevices hook
 */
export interface UseMediaDevicesOptions {
    /** Filter to specific device kinds. Can be a single kind or array of kinds. */
    kind?: MediaDeviceKind | MediaDeviceKind[];
    /** Whether to automatically request permissions on mount (default: false) */
    requestPermissionOnMount?: boolean;
}

/**
 * Return type for the useMediaDevices hook
 */
export interface UseMediaDevicesReturn {
    /** Array of connected media devices */
    devices: MediaDeviceInfo[];
    /** Whether the device list is currently loading */
    isLoading: boolean;
    /** Error object if device enumeration failed */
    error: Error | null;
    /** Whether the MediaDevices API is supported */
    isSupported: boolean;
    /** Manually refresh the device list */
    refetch: () => Promise<void>;
    /** Request media permissions to get device labels */
    requestPermission: (
        constraints?: MediaStreamConstraints,
    ) => Promise<boolean>;
    /** Whether permission has been granted (devices have labels) */
    hasPermission: boolean;
}

/**
 * A React hook that provides a list of connected media input and output devices
 * (cameras, microphones, speakers) using the MediaDevices API.
 *
 * @param options - Configuration options for the hook
 * @returns UseMediaDevicesReturn object with devices, states, and utility functions
 *
 * @example
 * ```tsx
 * // Basic usage - list all devices
 * const { devices, isLoading, isSupported } = useMediaDevices();
 *
 * // Filter to specific device types
 * const { devices: cameras } = useMediaDevices({ kind: 'videoinput' });
 *
 * // Request permissions to get device labels
 * const { devices, requestPermission, hasPermission } = useMediaDevices();
 * await requestPermission({ audio: true });
 * ```
 */
export function useMediaDevices(
    options: UseMediaDevicesOptions = {},
): UseMediaDevicesReturn {
    const { kind, requestPermissionOnMount = false } = options;

    const [allDevices, setAllDevices] = useState<MediaDeviceInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [hasPermission, setHasPermission] = useState(false);

    // Check if API is supported
    const isSupported =
        typeof navigator !== "undefined" && !!navigator.mediaDevices;

    // Normalize kind filter to array
    const kindFilter = useMemo(() => {
        if (!kind) return null;
        return Array.isArray(kind) ? kind : [kind];
    }, [kind]);

    // Filter devices based on kind option
    const devices = useMemo(() => {
        if (!kindFilter) return allDevices;
        return allDevices.filter((device) =>
            kindFilter.includes(device.kind as MediaDeviceKind),
        );
    }, [allDevices, kindFilter]);

    // Fetch devices from the API
    const fetchDevices = useCallback(async () => {
        if (!isSupported) {
            setIsLoading(false);
            return;
        }

        try {
            setError(null);
            const deviceInfos = await navigator.mediaDevices.enumerateDevices();
            setAllDevices(deviceInfos);

            // Check if we have permission (devices have labels)
            const hasLabels = deviceInfos.some(
                (d) => d.label && d.label.length > 0,
            );
            setHasPermission(hasLabels);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err
                    : new Error("Failed to enumerate devices"),
            );
        } finally {
            setIsLoading(false);
        }
    }, [isSupported]);

    // Refetch function exposed to consumers
    const refetch = useCallback(async () => {
        setIsLoading(true);
        await fetchDevices();
    }, [fetchDevices]);

    // Request permission to access media devices
    const requestPermission = useCallback(
        async (
            constraints: MediaStreamConstraints = { audio: true, video: true },
        ): Promise<boolean> => {
            if (!isSupported) return false;

            try {
                const stream =
                    await navigator.mediaDevices.getUserMedia(constraints);
                // Stop all tracks immediately - we just needed permission
                stream.getTracks().forEach((track) => track.stop());

                // Refetch devices to get labels
                await fetchDevices();
                return true;
            } catch {
                return false;
            }
        },
        [isSupported, fetchDevices],
    );

    // Initial fetch and device change listener
    useEffect(() => {
        if (!isSupported) {
            setIsLoading(false);
            return;
        }

        let mounted = true;

        const initFetch = async () => {
            await fetchDevices();

            // Auto-request permission if option is set
            if (requestPermissionOnMount && mounted) {
                await requestPermission();
            }
        };

        initFetch();

        // Listen for device changes
        const handleDeviceChange = () => {
            if (mounted) {
                fetchDevices();
            }
        };

        navigator.mediaDevices.addEventListener(
            "devicechange",
            handleDeviceChange,
        );

        return () => {
            mounted = false;
            navigator.mediaDevices.removeEventListener(
                "devicechange",
                handleDeviceChange,
            );
        };
    }, [
        isSupported,
        fetchDevices,
        requestPermissionOnMount,
        requestPermission,
    ]);

    return {
        devices,
        isLoading,
        error,
        isSupported,
        refetch,
        requestPermission,
        hasPermission,
    };
}

export default useMediaDevices;
