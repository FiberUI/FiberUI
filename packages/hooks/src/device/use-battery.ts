import { useState, useEffect, useCallback } from "react";

/**
 * Battery Manager interface (experimental Web API)
 */
interface BatteryManager extends EventTarget {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
}

/**
 * Battery event names
 */
const BATTERY_EVENTS = {
    LEVEL_CHANGE: "levelchange",
    CHARGING_CHANGE: "chargingchange",
    CHARGING_TIME_CHANGE: "chargingtimechange",
    DISCHARGING_TIME_CHANGE: "dischargingtimechange",
} as const;

/**
 * Battery state returned by the hook
 */
export interface BatteryState {
    /** Whether the Battery API is supported in this browser */
    isSupported: boolean;
    /** Whether the battery data is still loading */
    isLoading: boolean;
    /** Battery level from 0 to 1 (e.g., 0.75 = 75%) */
    level: number | null;
    /** Battery level as a percentage (0-100) */
    levelPercent: number | null;
    /** Whether the device is currently charging */
    isCharging: boolean | null;
    /** Time in seconds until fully charged (Infinity if not charging) */
    chargingTime: number | null;
    /** Time in seconds until fully discharged (Infinity if charging) */
    dischargingTime: number | null;
    /** Formatted time until full charge (e.g., "1h 30m") */
    chargingTimeFormatted: string | null;
    /** Formatted time until discharge (e.g., "2h 45m") */
    dischargingTimeFormatted: string | null;
    /** Battery status: 'charging', 'discharging', 'full', or 'unknown' */
    status: "charging" | "discharging" | "full" | "unknown";
    /** Whether battery is low (below 20%) */
    isLow: boolean;
    /** Whether battery is critical (below 10%) */
    isCritical: boolean;
}

/**
 * Formats seconds into a human-readable string (e.g., "1h 30m")
 */
function formatTime(seconds: number | null): string | null {
    if (seconds === null || seconds === Infinity || isNaN(seconds)) {
        return null;
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}

/**
 * Determines battery status based on charging state and level
 */
function getBatteryStatus(
    charging: boolean | null,
    level: number | null,
): BatteryState["status"] {
    if (charging === null || level === null) return "unknown";
    if (charging && level >= 1) return "full";
    if (charging) return "charging";
    return "discharging";
}

const initialState: BatteryState = {
    isSupported: true,
    isLoading: true,
    level: null,
    levelPercent: null,
    isCharging: null,
    chargingTime: null,
    dischargingTime: null,
    chargingTimeFormatted: null,
    dischargingTimeFormatted: null,
    status: "unknown",
    isLow: false,
    isCritical: false,
};

/**
 * Adds all battery event listeners
 */
function addBatteryListeners(
    battery: BatteryManager,
    handler: EventListener,
): void {
    Object.values(BATTERY_EVENTS).forEach((event) => {
        battery.addEventListener(event, handler);
    });
}

/**
 * Removes all battery event listeners
 */
function removeBatteryListeners(
    battery: BatteryManager,
    handler: EventListener,
): void {
    Object.values(BATTERY_EVENTS).forEach((event) => {
        battery.removeEventListener(event, handler);
    });
}

/**
 * A React hook that provides real-time battery information.
 *
 * @returns BatteryState object with battery level, charging status, and more
 *
 * @example
 * ```tsx
 * const battery = useBattery();
 *
 * if (!battery.isSupported) {
 *     return <p>Battery API not supported</p>;
 * }
 *
 * return (
 *     <div>
 *         <p>Battery: {battery.levelPercent}%</p>
 *         <p>Status: {battery.status}</p>
 *     </div>
 * );
 * ```
 */
export function useBattery(): BatteryState {
    const [state, setState] = useState<BatteryState>(initialState);

    const updateBatteryState = useCallback((battery: BatteryManager) => {
        const level = battery.level;
        const charging = battery.charging;

        setState({
            isSupported: true,
            isLoading: false,
            level,
            levelPercent: Math.round(level * 100),
            isCharging: charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime,
            chargingTimeFormatted: formatTime(battery.chargingTime),
            dischargingTimeFormatted: formatTime(battery.dischargingTime),
            status: getBatteryStatus(charging, level),
            isLow: level < 0.2,
            isCritical: level < 0.1,
        });
    }, []);

    useEffect(() => {
        // Check if running on server or if API is not supported
        if (typeof window === "undefined" || !("getBattery" in navigator)) {
            setState((s) => ({
                ...s,
                isSupported: false,
                isLoading: false,
            }));
            return;
        }

        let battery: BatteryManager | null = null;
        let mounted = true;

        const handleChange = () => {
            if (battery && mounted) {
                updateBatteryState(battery);
            }
        };

        // Fetch the battery manager using async/await
        (async () => {
            try {
                const bat: BatteryManager = await (
                    navigator as any
                ).getBattery();

                if (!mounted) return;

                battery = bat;
                handleChange();

                // Listen for changes
                addBatteryListeners(bat, handleChange);
            } catch {
                if (mounted) {
                    setState((s) => ({
                        ...s,
                        isSupported: false,
                        isLoading: false,
                    }));
                }
            }
        })();

        // Cleanup
        return () => {
            mounted = false;
            if (battery) {
                removeBatteryListeners(battery, handleChange);
            }
        };
    }, [updateBatteryState]);

    return state;
}

export default useBattery;
