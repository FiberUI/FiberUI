import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Options for the useGeolocation hook
 */
export interface UseGeolocationOptions {
    /** Enable continuous position updates (default: false) */
    watch?: boolean;
    /** Use high accuracy GPS (slower, more battery) vs Wi-Fi/Cell (faster, less accurate) */
    enableHighAccuracy?: boolean;
    /** Maximum age of a cached position in milliseconds (default: 0 - always fetch fresh) */
    maximumAge?: number;
    /** Timeout for position request in milliseconds (default: Infinity) */
    timeout?: number;
}

/**
 * Geolocation state returned by the hook
 */
export interface GeolocationState {
    /** Latitude in decimal degrees (e.g., 37.7749) */
    latitude: number | null;
    /** Longitude in decimal degrees (e.g., -122.4194) */
    longitude: number | null;
    /** Accuracy of the position in meters */
    accuracy: number | null;
    /** Altitude in meters above sea level (null if not available) */
    altitude: number | null;
    /** Accuracy of the altitude in meters (null if not available) */
    altitudeAccuracy: number | null;
    /** Direction of travel in degrees (0-360, null if not moving) */
    heading: number | null;
    /** Speed in meters per second (null if not moving) */
    speed: number | null;
    /** Timestamp when the position was acquired */
    timestamp: number | null;
    /** Whether the position is currently being fetched */
    isLoading: boolean;
    /** Whether the Geolocation API is supported */
    isSupported: boolean;
    /** Error object if position request failed */
    error: GeolocationPositionError | null;
    /** Error message for display (human-readable) */
    errorMessage: string | null;
    /** Manually request a position update */
    refetch: () => void;
    /** Stop watching for position updates (only in watch mode) */
    clearWatch: () => void;
}

/**
 * Human-readable error messages for GeolocationPositionError codes
 */
function getErrorMessage(error: GeolocationPositionError): string {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            return "Location permission denied. Please allow access in your browser settings.";
        case error.POSITION_UNAVAILABLE:
            return "Position unavailable. Your device may not have GPS or location services enabled.";
        case error.TIMEOUT:
            return "Location request timed out. Please try again.";
        default:
            return "An unknown error occurred while getting your location.";
    }
}

const initialState: Omit<GeolocationState, "refetch" | "clearWatch"> = {
    latitude: null,
    longitude: null,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
    timestamp: null,
    isLoading: false,
    isSupported: true,
    error: null,
    errorMessage: null,
};

/**
 * A React hook that provides the device's current geographic location using the
 * Geolocation API. Supports one-time position requests and continuous watching.
 *
 * @param options - Configuration options for the hook
 * @returns GeolocationState object with position data and control functions
 *
 * @example
 * ```tsx
 * // One-time position request
 * const { latitude, longitude, isLoading, error } = useGeolocation();
 *
 * // Continuous position updates
 * const { latitude, longitude } = useGeolocation({ watch: true });
 *
 * // High accuracy mode
 * const { latitude, longitude, accuracy } = useGeolocation({
 *     enableHighAccuracy: true,
 *     timeout: 10000
 * });
 * ```
 */
export function useGeolocation(
    options: UseGeolocationOptions = {},
): GeolocationState {
    const {
        watch = false,
        enableHighAccuracy = false,
        maximumAge = 0,
        timeout = Infinity,
    } = options;

    const [state, setState] = useState(initialState);
    const watchIdRef = useRef<number | null>(null);

    // Check if API is supported
    const isSupported =
        typeof navigator !== "undefined" && "geolocation" in navigator;

    // Success handler
    const handleSuccess = useCallback((position: GeolocationPosition) => {
        const { coords, timestamp } = position;
        setState({
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
            altitude: coords.altitude,
            altitudeAccuracy: coords.altitudeAccuracy,
            heading: coords.heading,
            speed: coords.speed,
            timestamp,
            isLoading: false,
            isSupported: true,
            error: null,
            errorMessage: null,
        });
    }, []);

    // Error handler
    const handleError = useCallback((error: GeolocationPositionError) => {
        setState((prev) => ({
            ...prev,
            isLoading: false,
            error,
            errorMessage: getErrorMessage(error),
        }));
    }, []);

    // Position options
    const positionOptions: PositionOptions = {
        enableHighAccuracy,
        maximumAge,
        timeout: timeout === Infinity ? undefined : timeout,
    };

    // Refetch function (manual position request)
    const refetch = useCallback(() => {
        if (!isSupported) return;

        setState((prev) => ({
            ...prev,
            isLoading: true,
            error: null,
            errorMessage: null,
        }));
        navigator.geolocation.getCurrentPosition(
            handleSuccess,
            handleError,
            positionOptions,
        );
    }, [
        isSupported,
        handleSuccess,
        handleError,
        enableHighAccuracy,
        maximumAge,
        timeout,
    ]);

    // Clear watch function
    const clearWatch = useCallback(() => {
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (!isSupported) {
            setState((prev) => ({
                ...prev,
                isSupported: false,
                isLoading: false,
            }));
            return;
        }

        setState((prev) => ({ ...prev, isLoading: true }));

        if (watch) {
            // Watch mode - continuous updates
            watchIdRef.current = navigator.geolocation.watchPosition(
                handleSuccess,
                handleError,
                positionOptions,
            );
        } else {
            // One-time position request
            navigator.geolocation.getCurrentPosition(
                handleSuccess,
                handleError,
                positionOptions,
            );
        }

        return () => {
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
            }
        };
    }, [
        isSupported,
        watch,
        handleSuccess,
        handleError,
        enableHighAccuracy,
        maximumAge,
        timeout,
    ]);

    return {
        ...state,
        isSupported,
        refetch,
        clearWatch,
    };
}

export default useGeolocation;
