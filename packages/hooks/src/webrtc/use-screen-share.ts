import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Options for getDisplayMedia
 */
export interface UseScreenShareOptions {
    /** Whether to include audio (default: false) */
    audio?: boolean | MediaTrackConstraints;
    /** Video constraints for screen capture */
    video?:
        | boolean
        | (MediaTrackConstraints & DisplayMediaStreamOptions["video"]);
    /** Whether to prefer current tab (Chrome only) */
    preferCurrentTab?: boolean;
    /** Surface types to allow: "monitor", "window", "browser" */
    surfaceTypes?: ("monitor" | "window" | "browser")[];
    /** Whether to show system audio option (default: false) */
    systemAudio?: "include" | "exclude";
    /** Auto-stop when user ends share via browser UI (default: true) */
    autoStopOnEnd?: boolean;
}

/**
 * Return type for the useScreenShare hook
 */
export interface UseScreenShareReturn {
    /** The screen share stream */
    stream: MediaStream | null;
    /** Whether screen share is active */
    isSharing: boolean;
    /** Whether share is being acquired */
    isLoading: boolean;
    /** Error if sharing failed */
    error: Error | null;
    /** Whether the API is supported */
    isSupported: boolean;
    /** Start screen sharing */
    start: (options?: UseScreenShareOptions) => Promise<boolean>;
    /** Stop screen sharing */
    stop: () => void;
    /** The video track from the share */
    videoTrack: MediaStreamTrack | null;
    /** The audio track from the share (if included) */
    audioTrack: MediaStreamTrack | null;
    /** Display surface type: "monitor", "window", or "browser" */
    displaySurface: string | null;
}

/**
 * A React hook for screen/window sharing using getDisplayMedia.
 * Captures the user's screen, application window, or browser tab.
 *
 * @param defaultOptions - Default options for screen sharing
 * @returns UseScreenShareReturn object with stream, states, and controls
 *
 * @example
 * ```tsx
 * const { stream, isSharing, start, stop } = useScreenShare();
 *
 * // Start sharing
 * await start();
 *
 * // Display in video element
 * videoRef.current.srcObject = stream;
 *
 * // Stop when done
 * stop();
 * ```
 */
export function useScreenShare(
    defaultOptions: UseScreenShareOptions = {},
): UseScreenShareReturn {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [displaySurface, setDisplaySurface] = useState<string | null>(null);
    const optionsRef = useRef<UseScreenShareOptions>(defaultOptions);

    // Check if API is supported
    const isSupported =
        typeof navigator !== "undefined" &&
        !!navigator.mediaDevices?.getDisplayMedia;

    // Get tracks
    const videoTrack = stream?.getVideoTracks()[0] ?? null;
    const audioTrack = stream?.getAudioTracks()[0] ?? null;

    // Stop sharing
    const stop = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        setStream(null);
        setDisplaySurface(null);
        setError(null);
    }, [stream]);

    // Start sharing
    const start = useCallback(
        async (options?: UseScreenShareOptions): Promise<boolean> => {
            if (!isSupported) {
                setError(new Error("getDisplayMedia is not supported"));
                return false;
            }

            // Merge options
            const mergedOptions = { ...optionsRef.current, ...options };
            const { autoStopOnEnd = true, ...displayMediaOptions } =
                mergedOptions;

            setIsLoading(true);
            setError(null);

            try {
                // Stop existing share first
                if (stream) {
                    stream.getTracks().forEach((track) => track.stop());
                }

                const displayStream =
                    await navigator.mediaDevices.getDisplayMedia({
                        audio: displayMediaOptions.audio ?? false,
                        video: displayMediaOptions.video ?? true,
                    } as DisplayMediaStreamOptions);

                // Get display surface type from track settings
                const videoTrack = displayStream.getVideoTracks()[0];
                if (videoTrack) {
                    const settings =
                        videoTrack.getSettings() as MediaTrackSettings & {
                            displaySurface?: string;
                        };
                    setDisplaySurface(settings.displaySurface ?? null);

                    // Auto-stop when user ends share via browser UI
                    if (autoStopOnEnd) {
                        videoTrack.onended = () => {
                            stop();
                        };
                    }
                }

                setStream(displayStream);
                setIsLoading(false);
                return true;
            } catch (err) {
                const error =
                    err instanceof Error
                        ? err
                        : new Error("Failed to start screen share");
                setError(error);
                setStream(null);
                setDisplaySurface(null);
                setIsLoading(false);
                return false;
            }
        },
        [isSupported, stream, stop],
    );

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [stream]);

    return {
        stream,
        isSharing: stream !== null,
        isLoading,
        error,
        isSupported,
        start,
        stop,
        videoTrack,
        audioTrack,
        displaySurface,
    };
}

export default useScreenShare;
