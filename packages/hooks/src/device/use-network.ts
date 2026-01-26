import { useState, useEffect } from "react";

export interface NetworkState {
    /** Whether device is online */
    online: boolean;
    /** Effective bandwidth estimate in Mbps */
    downlink?: number;
    /** Max downlink speed */
    downlinkMax?: number;
    /** Effective connection type ('slow-2g', '2g', '3g', or '4g') */
    effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
    /** Round-trip time estimate in ms */
    rtt?: number;
    /** Whether user has requested reduced data usage */
    saveData?: boolean;
    /** Connection type (wifi, cellular, etc.) */
    type?: string;
}

// Network Information API types
interface NetworkInformation extends EventTarget {
    downlink?: number;
    downlinkMax?: number;
    effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
    rtt?: number;
    saveData?: boolean;
    type?: string;
    onChange?: (e: Event) => void;
}

// Add to navigator interface
declare global {
    interface Navigator {
        connection?: NetworkInformation;
        mozConnection?: NetworkInformation;
        webkitConnection?: NetworkInformation;
    }
}

/**
 * A React hook that tracks network status and connection details.
 *
 * @returns NetworkState object containing online status and connection info
 */
export function useNetwork(): NetworkState {
    const [state, setState] = useState<NetworkState>({
        online: true, // Default to true for SSR safety
    });

    useEffect(() => {
        const isSupported =
            typeof navigator !== "undefined" &&
            (navigator.connection ||
                navigator.mozConnection ||
                navigator.webkitConnection);

        const connection = isSupported
            ? navigator.connection ||
              navigator.mozConnection ||
              navigator.webkitConnection
            : null;

        const updateState = () => {
            const online = navigator.onLine;

            if (!connection) {
                setState((prev) => ({ ...prev, online }));
                return;
            }

            setState({
                online,
                downlink: connection.downlink,
                downlinkMax: connection.downlinkMax,
                effectiveType: connection.effectiveType,
                rtt: connection.rtt,
                saveData: connection.saveData,
                type: connection.type,
            });
        };

        // Initial update
        updateState();

        // Listeners for online/offline
        window.addEventListener("online", updateState);
        window.addEventListener("offline", updateState);

        // Listener for connection changes
        if (connection) {
            connection.addEventListener("change", updateState);
        }

        return () => {
            window.removeEventListener("online", updateState);
            window.removeEventListener("offline", updateState);
            if (connection) {
                connection.removeEventListener("change", updateState);
            }
        };
    }, []);

    return state;
}
