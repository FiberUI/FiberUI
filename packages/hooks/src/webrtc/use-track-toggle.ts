import { useState, useCallback, useEffect } from "react";

/**
 * Options for the useTrackToggle hook
 */
export interface UseTrackToggleOptions {
    /**
     * Mode for toggling tracks:
     * - 'mute': Sets track.enabled (default, keeps hardware on, allows instant toggle)
     * - 'stop': Stops track entirely (turns hardware off, requires restart via callback)
     */
    mode?: "mute" | "stop";
    /** Callback to restart video when mode is 'stop' (must return Promise) */
    onRestartVideo?: () => Promise<boolean>;
    /** Callback to restart audio when mode is 'stop' */
    onRestartAudio?: () => Promise<boolean>;
    /** Callback when video is stopped in 'stop' mode */
    onStopVideo?: () => void;
    /** Callback when audio is stopped in 'stop' mode */
    onStopAudio?: () => void;
}

/**
 * Return type for the useTrackToggle hook
 */
export interface UseTrackToggleReturn {
    /** Whether audio is currently enabled */
    isAudioEnabled: boolean;
    /** Whether video is currently enabled */
    isVideoEnabled: boolean;
    /** Toggle audio on/off */
    toggleAudio: () => void;
    /** Toggle video on/off */
    toggleVideo: () => void;
    /** Set audio enabled state directly */
    setAudioEnabled: (enabled: boolean) => void;
    /** Set video enabled state directly */
    setVideoEnabled: (enabled: boolean) => void;
    /** Mute all tracks (audio and video) */
    muteAll: () => void;
    /** Unmute all tracks (audio and video) */
    unmuteAll: () => void;
}

/**
 * A React hook for controlling the enabled state of audio/video tracks.
 * Provides mute/unmute functionality for media streams.
 *
 * @param stream - The MediaStream to control
 * @returns UseTrackToggleReturn object with toggle states and methods
 *
 * @example
 * ```tsx
 * const { stream } = useUserMedia();
 * const { isAudioEnabled, toggleAudio, toggleVideo } = useTrackToggle(stream);
 *
 * return (
 *     <>
 *         <button onClick={toggleAudio}>
 *             {isAudioEnabled ? "Mute" : "Unmute"}
 *         </button>
 *         <button onClick={toggleVideo}>
 *             {isVideoEnabled ? "Hide" : "Show"}
 *         </button>
 *     </>
 * );
 * ```
 */
export function useTrackToggle(
    stream: MediaStream | null,
    options: UseTrackToggleOptions = {},
): UseTrackToggleReturn {
    const {
        mode = "mute",
        onRestartVideo,
        onRestartAudio,
        onStopVideo,
        onStopAudio,
    } = options;

    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isTogglingVideo, setIsTogglingVideo] = useState(false);
    const [isTogglingAudio, setIsTogglingAudio] = useState(false);

    // Sync with actual track states when stream changes
    useEffect(() => {
        if (!stream) {
            setIsAudioEnabled(true);
            setIsVideoEnabled(true);
            return;
        }

        const audioTrack = stream.getAudioTracks()[0];
        const videoTrack = stream.getVideoTracks()[0];

        if (audioTrack) {
            setIsAudioEnabled(audioTrack.enabled);
        } else {
            // No audio track means it's paused/stopped
            setIsAudioEnabled(false);
        }
        if (videoTrack) {
            setIsVideoEnabled(videoTrack.enabled);
        } else {
            // No video track means it's paused/stopped
            setIsVideoEnabled(false);
        }
    }, [stream]);

    // Set audio enabled state
    const setAudioEnabled = useCallback(
        async (enabled: boolean) => {
            if (!stream) return;

            if (mode === "stop") {
                // Stop mode: actually stop/restart tracks
                if (!enabled) {
                    const audioTracks = stream.getAudioTracks();
                    audioTracks.forEach((track) => {
                        track.stop();
                    });
                    onStopAudio?.();
                    setIsAudioEnabled(false);
                } else if (onRestartAudio) {
                    setIsTogglingAudio(true);
                    const success = await onRestartAudio();
                    setIsAudioEnabled(success);
                    setIsTogglingAudio(false);
                }
            } else {
                // Mute mode: just toggle enabled property
                const audioTracks = stream.getAudioTracks();
                audioTracks.forEach((track) => {
                    track.enabled = enabled;
                });
                setIsAudioEnabled(enabled);
            }
        },
        [stream, mode, onRestartAudio, onStopAudio],
    );

    // Set video enabled state
    const setVideoEnabled = useCallback(
        async (enabled: boolean) => {
            if (!stream) return;

            if (mode === "stop") {
                // Stop mode: actually stop/restart tracks
                if (!enabled) {
                    const videoTracks = stream.getVideoTracks();
                    videoTracks.forEach((track) => {
                        track.stop();
                    });
                    onStopVideo?.();
                    setIsVideoEnabled(false);
                } else if (onRestartVideo) {
                    setIsTogglingVideo(true);
                    const success = await onRestartVideo();
                    setIsVideoEnabled(success);
                    setIsTogglingVideo(false);
                }
            } else {
                // Mute mode: just toggle enabled property
                const videoTracks = stream.getVideoTracks();
                videoTracks.forEach((track) => {
                    track.enabled = enabled;
                });
                setIsVideoEnabled(enabled);
            }
        },
        [stream, mode, onRestartVideo, onStopVideo],
    );

    // Toggle audio
    const toggleAudio = useCallback(() => {
        if (isTogglingAudio) return; // Prevent double-toggle during async restart
        setAudioEnabled(!isAudioEnabled);
    }, [isAudioEnabled, setAudioEnabled, isTogglingAudio]);

    // Toggle video
    const toggleVideo = useCallback(() => {
        if (isTogglingVideo) return; // Prevent double-toggle during async restart
        setVideoEnabled(!isVideoEnabled);
    }, [isVideoEnabled, setVideoEnabled, isTogglingVideo]);

    // Mute all tracks
    const muteAll = useCallback(() => {
        setAudioEnabled(false);
        setVideoEnabled(false);
    }, [setAudioEnabled, setVideoEnabled]);

    // Unmute all tracks
    const unmuteAll = useCallback(() => {
        setAudioEnabled(true);
        setVideoEnabled(true);
    }, [setAudioEnabled, setVideoEnabled]);

    return {
        isAudioEnabled,
        isVideoEnabled,
        toggleAudio,
        toggleVideo,
        setAudioEnabled,
        setVideoEnabled,
        muteAll,
        unmuteAll,
    };
}

export default useTrackToggle;
