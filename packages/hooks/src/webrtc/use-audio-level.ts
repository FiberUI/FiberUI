import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Options for the useAudioLevel hook
 */
export interface UseAudioLevelOptions {
    /** Threshold (0-1) above which isSpeaking is true (default: 0.01) */
    speakingThreshold?: number;
    /** How often to sample audio level in ms (default: 100) */
    sampleInterval?: number;
    /** Smoothing factor for level transitions (0-1, default: 0.8) */
    smoothingFactor?: number;
    /** Whether to start monitoring automatically (default: true) */
    autoStart?: boolean;
}

/**
 * Return type for the useAudioLevel hook
 */
export interface UseAudioLevelReturn {
    /** Current audio level (0-1) */
    level: number;
    /** Whether audio exceeds the speaking threshold */
    isSpeaking: boolean;
    /** Peak audio level since last reset */
    peak: number;
    /** Reset peak level */
    resetPeak: () => void;
    /** Start monitoring audio */
    start: () => void;
    /** Stop monitoring audio */
    stop: () => void;
    /** Whether currently monitoring */
    isMonitoring: boolean;
    /** Whether Web Audio API is supported */
    isSupported: boolean;
}

/**
 * A React hook for detecting audio volume from a media stream.
 * Uses Web Audio API to analyze audio levels for speaking indicators.
 *
 * @param stream - The MediaStream to monitor (must have audio tracks)
 * @param options - Configuration options
 * @returns UseAudioLevelReturn object with level, speaking state, and controls
 *
 * @example
 * ```tsx
 * const { stream } = useUserMedia({ audio: true });
 * const { level, isSpeaking } = useAudioLevel(stream);
 *
 * return (
 *     <div>
 *         <div
 *             className="speaking-indicator"
 *             style={{
 *                 opacity: isSpeaking ? 1 : 0.3,
 *                 transform: `scale(${1 + level * 0.5})`,
 *             }}
 *         />
 *         <p>Volume: {Math.round(level * 100)}%</p>
 *     </div>
 * );
 * ```
 */
export function useAudioLevel(
    stream: MediaStream | null,
    options: UseAudioLevelOptions = {},
): UseAudioLevelReturn {
    const {
        speakingThreshold = 0.01,
        sampleInterval = 100,
        smoothingFactor = 0.8,
        autoStart = true,
    } = options;

    const [level, setLevel] = useState(0);
    const [peak, setPeak] = useState(0);
    const [isMonitoring, setIsMonitoring] = useState(false);

    // Refs for audio context and nodes
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const smoothedLevelRef = useRef(0);

    // Check if Web Audio API is supported
    const isSupported =
        typeof window !== "undefined" &&
        ("AudioContext" in window || "webkitAudioContext" in window);

    // Calculate RMS (Root Mean Square) level from audio data
    const calculateLevel = useCallback((): number => {
        if (!analyserRef.current) return 0;

        const analyser = analyserRef.current;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteTimeDomainData(dataArray);

        // Calculate RMS
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
            const value = dataArray[i] ?? 128;
            const normalized = (value - 128) / 128;
            sum += normalized * normalized;
        }
        const rms = Math.sqrt(sum / dataArray.length);

        return Math.min(1, rms * 2); // Scale up and clamp
    }, []);

    // Start monitoring
    const start = useCallback(() => {
        if (!stream || !isSupported || isMonitoring) return;

        const audioTrack = stream.getAudioTracks()[0];
        if (!audioTrack) return;

        try {
            // Create audio context
            const AudioContextClass =
                window.AudioContext ||
                (
                    window as unknown as {
                        webkitAudioContext: typeof AudioContext;
                    }
                ).webkitAudioContext;
            const audioContext = new AudioContextClass();
            audioContextRef.current = audioContext;

            // Create analyser node
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = smoothingFactor;
            analyserRef.current = analyser;

            // Create source from stream
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            sourceRef.current = source;

            // Start sampling at interval
            intervalRef.current = setInterval(() => {
                const rawLevel = calculateLevel();

                // Apply smoothing
                smoothedLevelRef.current =
                    smoothedLevelRef.current * smoothingFactor +
                    rawLevel * (1 - smoothingFactor);

                const currentLevel = smoothedLevelRef.current;
                setLevel(currentLevel);

                // Update peak
                if (currentLevel > peak) {
                    setPeak(currentLevel);
                }
            }, sampleInterval);

            setIsMonitoring(true);
        } catch (err) {
            console.error("Failed to start audio monitoring:", err);
        }
    }, [
        stream,
        isSupported,
        isMonitoring,
        sampleInterval,
        smoothingFactor,
        calculateLevel,
        peak,
    ]);

    // Stop monitoring
    const stop = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        if (sourceRef.current) {
            sourceRef.current.disconnect();
            sourceRef.current = null;
        }

        if (audioContextRef.current) {
            audioContextRef.current.close().catch(() => {});
            audioContextRef.current = null;
        }

        analyserRef.current = null;
        smoothedLevelRef.current = 0;
        setLevel(0);
        setIsMonitoring(false);
    }, []);

    // Reset peak
    const resetPeak = useCallback(() => {
        setPeak(0);
    }, []);

    // Auto-start when stream changes, stop when stream is null
    useEffect(() => {
        // If stream is null or undefined, stop monitoring
        if (!stream) {
            if (isMonitoring) {
                // Clean up manually instead of calling stop to avoid dependency issues
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                    animationFrameRef.current = null;
                }
                if (sourceRef.current) {
                    sourceRef.current.disconnect();
                    sourceRef.current = null;
                }
                if (audioContextRef.current) {
                    audioContextRef.current.close().catch(() => {});
                    audioContextRef.current = null;
                }
                analyserRef.current = null;
                smoothedLevelRef.current = 0;
                setLevel(0);
                setIsMonitoring(false);
            }
            return;
        }

        // If stream exists and autoStart is enabled, start monitoring
        if (autoStart && !isMonitoring) {
            start();
        }

        // Cleanup on stream change
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            if (sourceRef.current) {
                sourceRef.current.disconnect();
                sourceRef.current = null;
            }
            if (audioContextRef.current) {
                audioContextRef.current.close().catch(() => {});
                audioContextRef.current = null;
            }
            analyserRef.current = null;
            smoothedLevelRef.current = 0;
            setLevel(0);
            setIsMonitoring(false);
        };
    }, [stream, autoStart]); // eslint-disable-line react-hooks/exhaustive-deps

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stop();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        level,
        isSpeaking: level > speakingThreshold,
        peak,
        resetPeak,
        start,
        stop,
        isMonitoring,
        isSupported,
    };
}

export default useAudioLevel;
