import { useState, useCallback, useEffect } from "react";

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
): UseTrackToggleReturn {
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);

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
        }
        if (videoTrack) {
            setIsVideoEnabled(videoTrack.enabled);
        }
    }, [stream]);

    // Set audio enabled state
    const setAudioEnabled = useCallback(
        (enabled: boolean) => {
            if (!stream) return;

            const audioTracks = stream.getAudioTracks();
            audioTracks.forEach((track) => {
                track.enabled = enabled;
            });
            setIsAudioEnabled(enabled);
        },
        [stream],
    );

    // Set video enabled state
    const setVideoEnabled = useCallback(
        (enabled: boolean) => {
            if (!stream) return;

            const videoTracks = stream.getVideoTracks();
            videoTracks.forEach((track) => {
                track.enabled = enabled;
            });
            setIsVideoEnabled(enabled);
        },
        [stream],
    );

    // Toggle audio
    const toggleAudio = useCallback(() => {
        setAudioEnabled(!isAudioEnabled);
    }, [isAudioEnabled, setAudioEnabled]);

    // Toggle video
    const toggleVideo = useCallback(() => {
        setVideoEnabled(!isVideoEnabled);
    }, [isVideoEnabled, setVideoEnabled]);

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
