import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Constraints for getUserMedia
 */
export interface UseUserMediaConstraints {
    /** Audio constraints (true, false, or MediaTrackConstraints) */
    audio?: boolean | MediaTrackConstraints;
    /** Video constraints (true, false, or MediaTrackConstraints) */
    video?: boolean | MediaTrackConstraints;
}

/**
 * Options for the useUserMedia hook
 */
export interface UseUserMediaOptions {
    /** Initial constraints (default: { audio: true, video: true }) */
    constraints?: UseUserMediaConstraints;
    /** Whether to start automatically on mount (default: false) */
    autoStart?: boolean;
}

/**
 * Return type for the useUserMedia hook
 */
export interface UseUserMediaReturn {
    /** The active media stream */
    stream: MediaStream | null;
    /** Whether the stream is being acquired */
    isLoading: boolean;
    /** Whether a stream is currently active */
    isActive: boolean;
    /** Error if stream acquisition failed */
    error: Error | null;
    /** Whether the API is supported */
    isSupported: boolean;
    /** Start the media stream with optional constraints */
    start: (constraints?: UseUserMediaConstraints) => Promise<boolean>;
    /** Stop all tracks and release the stream */
    stop: () => void;
    /** Switch to a different audio device */
    switchAudioDevice: (deviceId: string) => Promise<boolean>;
    /** Switch to a different video device */
    switchVideoDevice: (deviceId: string) => Promise<boolean>;
    /** Get the current audio track */
    audioTrack: MediaStreamTrack | null;
    /** Get the current video track */
    videoTrack: MediaStreamTrack | null;
    /** Pause video track (stops camera hardware) */
    pauseVideo: () => void;
    /** Resume video track (restarts camera) */
    resumeVideo: () => Promise<boolean>;
    /** Whether video is currently paused */
    isVideoPaused: boolean;
    /** Pause audio track (stops microphone) */
    pauseAudio: () => void;
    /** Resume audio track (restarts microphone) */
    resumeAudio: () => Promise<boolean>;
    /** Whether audio is currently paused */
    isAudioPaused: boolean;
}

/**
 * A React hook for accessing the user's camera and microphone using getUserMedia.
 * Provides controls for starting, stopping, and switching devices.
 *
 * @param options - Configuration options for the hook
 * @returns UseUserMediaReturn object with stream, states, and control functions
 *
 * @example
 * ```tsx
 * const { stream, start, stop, isActive } = useUserMedia();
 *
 * // Start with default constraints
 * await start();
 *
 * // Use stream in a video element
 * videoRef.current.srcObject = stream;
 *
 * // Stop when done
 * stop();
 * ```
 */
export function useUserMedia(
    options: UseUserMediaOptions = {},
): UseUserMediaReturn {
    const { constraints: initialConstraints, autoStart = false } = options;

    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [isVideoPaused, setIsVideoPaused] = useState(false);
    const [isAudioPaused, setIsAudioPaused] = useState(false);
    const streamRef = useRef<MediaStream | null>(null);
    const requestRef = useRef<number>(0);
    const constraintsRef = useRef<UseUserMediaConstraints>(
        initialConstraints ?? { audio: true, video: true },
    );

    // Check if API is supported
    const isSupported =
        typeof navigator !== "undefined" &&
        !!navigator.mediaDevices?.getUserMedia;

    // Get tracks from current stream
    const audioTrack = stream?.getAudioTracks()[0] ?? null;
    const videoTrack = stream?.getVideoTracks()[0] ?? null;

    const stopTrack = useCallback((track: MediaStreamTrack) => {
        track.stop();
        track.enabled = false;
    }, []);

    // Stop all tracks in a stream
    const stopTracks = useCallback((mediaStream: MediaStream | null) => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(stopTrack);
        }
    }, []);

    // Stop the current stream
    const stop = useCallback(() => {
        stopTracks(streamRef.current);
        streamRef.current = null;
        setStream(null);
        setError(null);
    }, [stopTracks]);

    // Start the media stream
    const start = useCallback(
        async (newConstraints?: UseUserMediaConstraints): Promise<boolean> => {
            if (!isSupported) {
                setError(new Error("getUserMedia is not supported"));
                return false;
            }

            // Update constraints if provided
            if (newConstraints) {
                constraintsRef.current = newConstraints;
            }

            // Increment request ID
            const requestId = requestRef.current + 1;
            requestRef.current = requestId;

            setIsLoading(true);
            setError(null);

            try {
                // Stop existing stream first
                stopTracks(streamRef.current);

                const mediaStream = await navigator.mediaDevices.getUserMedia(
                    constraintsRef.current,
                );

                // Check if this is still the latest request
                if (requestRef.current !== requestId) {
                    // This request is stale, stop the stream we just got
                    stopTracks(mediaStream);
                    return false;
                }

                streamRef.current = mediaStream;
                setStream(mediaStream);
                setIsLoading(false);
                return true;
            } catch (err) {
                // Only handle error if we are still the active request
                if (requestRef.current === requestId) {
                    const error =
                        err instanceof Error
                            ? err
                            : new Error("Failed to access media devices");
                    setError(error);
                    setStream(null);
                    setIsLoading(false);
                }
                return false;
            }
        },
        [isSupported, stopTracks],
    );

    // Switch audio device
    const switchAudioDevice = useCallback(
        async (deviceId: string): Promise<boolean> => {
            const currentVideo = constraintsRef.current.video;
            const newConstraints: UseUserMediaConstraints = {
                audio: { deviceId: { exact: deviceId } },
                video: currentVideo,
            };
            return start(newConstraints);
        },
        [start],
    );

    // Switch video device
    const switchVideoDevice = useCallback(
        async (deviceId: string): Promise<boolean> => {
            const currentAudio = constraintsRef.current.audio;
            const newConstraints: UseUserMediaConstraints = {
                audio: currentAudio,
                video: { deviceId: { exact: deviceId } },
            };
            return start(newConstraints);
        },
        [start],
    );

    // Pause video (stops camera hardware - light turns off)
    const pauseVideo = useCallback(() => {
        if (!streamRef.current) return;

        const videoTracks = streamRef.current.getVideoTracks();
        videoTracks.forEach((track) => {
            track.stop();
            streamRef.current?.removeTrack(track);
        });
        setIsVideoPaused(true);
        // Trigger re-render with updated stream
        setStream(streamRef.current);
    }, []);

    // Resume video (restarts camera)
    const resumeVideo = useCallback(async (): Promise<boolean> => {
        if (!streamRef.current || !isSupported) return false;

        try {
            const videoConstraints = constraintsRef.current.video;
            if (!videoConstraints) return false;

            const newStream = await navigator.mediaDevices.getUserMedia({
                video: videoConstraints,
                audio: false,
            });

            const newVideoTrack = newStream.getVideoTracks()[0];
            if (newVideoTrack && streamRef.current) {
                streamRef.current.addTrack(newVideoTrack);
                setIsVideoPaused(false);
                // Trigger re-render with updated stream
                setStream(streamRef.current);
                return true;
            }
            return false;
        } catch (err) {
            console.error("Failed to resume video:", err);
            return false;
        }
    }, [isSupported]);

    // Pause audio (stops microphone)
    const pauseAudio = useCallback(() => {
        if (!streamRef.current) return;

        const audioTracks = streamRef.current.getAudioTracks();
        audioTracks.forEach((track) => {
            track.stop();
            streamRef.current?.removeTrack(track);
        });
        setIsAudioPaused(true);
        setStream(streamRef.current);
    }, []);

    // Resume audio (restarts microphone)
    const resumeAudio = useCallback(async (): Promise<boolean> => {
        if (!streamRef.current || !isSupported) return false;

        try {
            const audioConstraints = constraintsRef.current.audio;
            if (!audioConstraints) return false;

            const newStream = await navigator.mediaDevices.getUserMedia({
                audio: audioConstraints,
                video: false,
            });

            const newAudioTrack = newStream.getAudioTracks()[0];
            if (newAudioTrack && streamRef.current) {
                streamRef.current.addTrack(newAudioTrack);
                setIsAudioPaused(false);
                setStream(streamRef.current);
                return true;
            }
            return false;
        } catch (err) {
            console.error("Failed to resume audio:", err);
            return false;
        }
    }, [isSupported]);

    // Auto-start on mount if enabled
    useEffect(() => {
        if (autoStart && isSupported) {
            start();
        }
    }, [autoStart, isSupported]); // eslint-disable-line react-hooks/exhaustive-deps

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(stopTrack);
            }
        };
    }, []);

    return {
        stream,
        isLoading,
        isActive: stream !== null,
        error,
        isSupported,
        start,
        stop,
        switchAudioDevice,
        switchVideoDevice,
        audioTrack,
        videoTrack,
        pauseVideo,
        resumeVideo,
        isVideoPaused,
        pauseAudio,
        resumeAudio,
        isAudioPaused,
    };
}

export default useUserMedia;
