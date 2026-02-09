import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Options for the useSpeechSynthesis hook
 */
export interface UseSpeechSynthesisOptions {
    /** The voice to use for speech (default: system default) */
    voice?: SpeechSynthesisVoice | null;
    /** Speech rate from 0.1 to 10 (default: 1) */
    rate?: number;
    /** Speech pitch from 0 to 2 (default: 1) */
    pitch?: number;
    /** Speech volume from 0 to 1 (default: 1) */
    volume?: number;
    /** Callback when speech starts */
    onStart?: () => void;
    /** Callback when speech ends */
    onEnd?: () => void;
    /** Callback when an error occurs */
    onError?: (error: SpeechSynthesisErrorEvent) => void;
    /** Callback when a word boundary is reached (for highlighting) */
    onBoundary?: (event: SpeechSynthesisEvent) => void;
}

/**
 * Return type for useSpeechSynthesis hook
 */
export interface UseSpeechSynthesisReturn {
    /** Speak the given text */
    speak: (text: string) => void;
    /** Cancel all speech */
    cancel: () => void;
    /** Pause speech */
    pause: () => void;
    /** Resume paused speech */
    resume: () => void;
    /** Whether speech is currently playing */
    isSpeaking: boolean;
    /** Whether speech is paused */
    isPaused: boolean;
    /** Whether the Speech Synthesis API is supported */
    isSupported: boolean;
    /** Available voices */
    voices: SpeechSynthesisVoice[];
    /** Current character index being spoken (for highlighting) */
    currentCharIndex: number;
    /** Error event if speech failed */
    error: SpeechSynthesisErrorEvent | null;
    /** Human-readable error message */
    errorMessage: string | null;
}

/**
 * Human-readable error messages for speech synthesis errors
 */
function getErrorMessage(error: SpeechSynthesisErrorEvent): string {
    switch (error.error) {
        case "canceled":
            return "Speech was canceled.";
        case "interrupted":
            return "Speech was interrupted.";
        case "audio-busy":
            return "Audio output is busy.";
        case "audio-hardware":
            return "Audio hardware error occurred.";
        case "network":
            return "Network error during speech synthesis.";
        case "synthesis-unavailable":
            return "Speech synthesis is not available.";
        case "synthesis-failed":
            return "Speech synthesis failed.";
        case "language-unavailable":
            return "The specified language is not available.";
        case "voice-unavailable":
            return "The specified voice is not available.";
        case "text-too-long":
            return "The text is too long to synthesize.";
        case "invalid-argument":
            return "Invalid argument provided.";
        case "not-allowed":
            return "Speech synthesis is not allowed.";
        default:
            return "An unknown error occurred during speech synthesis.";
    }
}

/**
 * A React hook that provides text-to-speech functionality using the
 * Web Speech Synthesis API.
 *
 * @param options - Configuration options for the hook
 * @returns UseSpeechSynthesisReturn object with speak function and state
 *
 * @example
 * ```tsx
 * // Basic usage
 * const { speak, cancel, isSpeaking, voices } = useSpeechSynthesis();
 *
 * // With options
 * const { speak, voices } = useSpeechSynthesis({
 *     voice: voices.find(v => v.lang === 'en-GB'),
 *     rate: 1.2,
 *     pitch: 1.1
 * });
 *
 * // Speak text
 * speak("Hello, world!");
 * ```
 */
export function useSpeechSynthesis(
    options: UseSpeechSynthesisOptions = {},
): UseSpeechSynthesisReturn {
    const {
        voice = null,
        rate = 1,
        pitch = 1,
        volume = 1,
        onStart,
        onEnd,
        onError,
        onBoundary,
    } = options;

    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [error, setError] = useState<SpeechSynthesisErrorEvent | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Check if API is supported
    const isSupported =
        typeof window !== "undefined" && "speechSynthesis" in window;

    // Load available voices
    useEffect(() => {
        if (!isSupported) return;

        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        // Voices may load asynchronously
        loadVoices();

        // Chrome requires this event listener
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = null;
            }
        };
    }, [isSupported]);

    // Sync speaking state with the API
    useEffect(() => {
        if (!isSupported) return;

        const checkSpeakingState = () => {
            setIsSpeaking(window.speechSynthesis.speaking);
            setIsPaused(window.speechSynthesis.paused);
        };

        // Poll for state changes (some browsers don't fire events reliably)
        const interval = setInterval(checkSpeakingState, 100);

        return () => clearInterval(interval);
    }, [isSupported]);

    const speak = useCallback(
        (text: string) => {
            if (!isSupported) return;

            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);

            // Apply options
            if (voice) utterance.voice = voice;
            utterance.rate = Math.max(0.1, Math.min(10, rate));
            utterance.pitch = Math.max(0, Math.min(2, pitch));
            utterance.volume = Math.max(0, Math.min(1, volume));

            // Event handlers
            utterance.onstart = () => {
                setIsSpeaking(true);
                setIsPaused(false);
                setError(null);
                setErrorMessage(null);
                setCurrentCharIndex(0);
                onStart?.();
            };

            utterance.onend = () => {
                setIsSpeaking(false);
                setIsPaused(false);
                setCurrentCharIndex(0);
                onEnd?.();
            };

            utterance.onerror = (event) => {
                // Ignore 'interrupted' and 'canceled' as they're not real errors
                if (
                    event.error === "interrupted" ||
                    event.error === "canceled"
                ) {
                    setIsSpeaking(false);
                    setIsPaused(false);
                    return;
                }

                setError(event);
                setErrorMessage(getErrorMessage(event));
                setIsSpeaking(false);
                setIsPaused(false);
                onError?.(event);
            };

            utterance.onboundary = (event) => {
                setCurrentCharIndex(event.charIndex);
                onBoundary?.(event);
            };

            utteranceRef.current = utterance;

            // Chrome has a bug where long texts stop after ~15 seconds
            // Workaround: pause and resume periodically
            window.speechSynthesis.speak(utterance);
        },
        [
            isSupported,
            voice,
            rate,
            pitch,
            volume,
            onStart,
            onEnd,
            onError,
            onBoundary,
        ],
    );

    const cancel = useCallback(() => {
        if (!isSupported) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentCharIndex(0);
    }, [isSupported]);

    const pause = useCallback(() => {
        if (!isSupported) return;
        window.speechSynthesis.pause();
        setIsPaused(true);
    }, [isSupported]);

    const resume = useCallback(() => {
        if (!isSupported) return;
        window.speechSynthesis.resume();
        setIsPaused(false);
    }, [isSupported]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (isSupported) {
                window.speechSynthesis.cancel();
            }
        };
    }, [isSupported]);

    return {
        speak,
        cancel,
        pause,
        resume,
        isSpeaking,
        isPaused,
        isSupported,
        voices,
        currentCharIndex,
        error,
        errorMessage,
    };
}

export default useSpeechSynthesis;
