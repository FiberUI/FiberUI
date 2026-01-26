import { useState, useCallback, useEffect } from "react";

/**
 * Orientation data return type
 */
export interface DeviceOrientationState {
    /** The correlation of the device's Z axis to the Earth's Z axis (0 to 360)  */
    alpha: number | null;
    /** The inclination value (forward vs backward) (-180 to 180) */
    beta: number | null;
    /** The inclination value (left vs right) (-90 to 90) */
    gamma: number | null;
    /** Whether the data provided is absolute */
    absolute: boolean;
}

/**
 * Return type for the useDeviceOrientation hook
 */
export interface UseDeviceOrientationReturn {
    /** Current orientation state */
    orientation: DeviceOrientationState;
    /** Error state if any */
    error: Error | null;
    /** Request permission (required for iOS 13+) */
    requestPermission: () => Promise<boolean>;
    /** Whether the API is supported */
    isSupported: boolean;
}

// Add iOS-specific types
interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<"granted" | "denied">;
}

/**
 * A React hook that provides access to the device's physical orientation.
 * Handles permission requests for iOS 13+ devices.
 *
 * @returns UseDeviceOrientationReturn object with orientation data and controls
 */
export function useDeviceOrientation(): UseDeviceOrientationReturn {
    const [orientation, setOrientation] = useState<DeviceOrientationState>({
        alpha: null,
        beta: null,
        gamma: null,
        absolute: false,
    });
    const [error, setError] = useState<Error | null>(null);

    // Check support
    const isSupported =
        typeof window !== "undefined" && "DeviceOrientationEvent" in window;

    // Handle orientation change
    const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
        setOrientation({
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma,
            absolute: event.absolute,
        });
    }, []);

    // Request permission (iOS 13+)
    const requestPermission = useCallback(async (): Promise<boolean> => {
        if (!isSupported) {
            setError(new Error("DeviceOrientationEvent is not supported"));
            return false;
        }

        try {
            // Check for iOS 13+ permission API
            const EventCast =
                DeviceOrientationEvent as unknown as DeviceOrientationEventiOS;

            if (typeof EventCast.requestPermission === "function") {
                const state = await EventCast.requestPermission();
                if (state === "granted") {
                    window.addEventListener(
                        "deviceorientation",
                        handleOrientation,
                    );
                    return true;
                } else {
                    setError(new Error("Permission denied"));
                    return false;
                }
            }

            // Non-iOS 13+ devices don't need permission
            // Or if permission was already granted previously
            return true;
        } catch (err) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Failed to request permission");
            setError(error);
            return false;
        }
    }, [isSupported, handleOrientation]);

    useEffect(() => {
        if (!isSupported) return;

        // On mount, try to add listener (works if no permission needed or already granted)
        // For iOS 13+, this might do nothing until requestPermission is called
        window.addEventListener("deviceorientation", handleOrientation);

        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
        };
    }, [isSupported, handleOrientation]);

    return {
        orientation,
        error,
        requestPermission,
        isSupported,
    };
}

export default useDeviceOrientation;
