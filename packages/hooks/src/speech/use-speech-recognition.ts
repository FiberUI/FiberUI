import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Speech recognition error types
 */
export type SpeechRecognitionErrorCode =
    | "no-speech"
    | "aborted"
    | "audio-capture"
    | "network"
    | "not-allowed"
    | "service-not-allowed"
    | "bad-grammar"
    | "language-not-supported";

/**
 * Options for the useSpeechRecognition hook
 */
export interface UseSpeechRecognitionOptions {
    /** Language for recognition (BCP 47 format, e.g., 'en-US', 'es-ES') */
    lang?: string;
    /** Keep listening after user stops speaking (default: false) */
    continuous?: boolean;
    /** Return interim results before final transcription (default: true) */
    interimResults?: boolean;
    /** Maximum number of alternative transcriptions to return (default: 1) */
    maxAlternatives?: number;
    /** Callback when a final result is received */
    onResult?: (transcript: string, isFinal: boolean) => void;
    /** Callback when an error occurs */
    onError?: (error: SpeechRecognitionErrorCode) => void;
    /** Callback when recognition ends */
    onEnd?: () => void;
}

/**
 * Return type for useSpeechRecognition hook
 */
export interface UseSpeechRecognitionReturn {
    /** The final transcribed text */
    transcript: string;
    /** The interim (in-progress) transcribed text */
    interimTranscript: string;
    /** Whether speech recognition is currently active */
    isListening: boolean;
    /** Whether the Speech Recognition API is supported */
    isSupported: boolean;
    /** The error code if recognition failed */
    error: SpeechRecognitionErrorCode | null;
    /** Human-readable error message */
    errorMessage: string | null;
    /** Start listening for speech */
    start: () => void;
    /** Stop listening gracefully (waits for final result) */
    stop: () => void;
    /** Abort listening immediately (discards results) */
    abort: () => void;
    /** Reset the transcript to empty */
    resetTranscript: () => void;
}

/**
 * Human-readable error messages for speech recognition errors
 */
function getErrorMessage(error: SpeechRecognitionErrorCode): string {
    switch (error) {
        case "no-speech":
            return "No speech was detected. Please try again.";
        case "aborted":
            return "Speech recognition was aborted.";
        case "audio-capture":
            return "No microphone was found or microphone access failed.";
        case "network":
            return "Network error occurred during recognition.";
        case "not-allowed":
            return "Microphone permission denied. Please allow access in your browser settings.";
        case "service-not-allowed":
            return "Speech recognition service is not allowed.";
        case "bad-grammar":
            return "Speech grammar error occurred.";
        case "language-not-supported":
            return "The specified language is not supported.";
        default:
            return "An unknown error occurred during speech recognition.";
    }
}

// Type declarations for the Web Speech API (not fully typed in TypeScript)
interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: SpeechRecognitionErrorCode;
    message: string;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionInstance extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    onstart: (() => void) | null;
    onspeechend: (() => void) | null;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognitionInstance;
        webkitSpeechRecognition: new () => SpeechRecognitionInstance;
    }
}

/**
 * A React hook that provides speech-to-text functionality using the
 * Web Speech Recognition API.
 *
 * @param options - Configuration options for the hook
 * @returns UseSpeechRecognitionReturn object with transcript and control functions
 *
 * @example
 * ```tsx
 * // Basic usage
 * const { transcript, isListening, start, stop } = useSpeechRecognition();
 *
 * // With options
 * const { transcript, interimTranscript } = useSpeechRecognition({
 *     lang: 'es-ES',
 *     continuous: true,
 *     interimResults: true
 * });
 * ```
 */
export function useSpeechRecognition(
    options: UseSpeechRecognitionOptions = {},
): UseSpeechRecognitionReturn {
    const {
        lang = "en-US",
        continuous = false,
        interimResults = true,
        maxAlternatives = 1,
        onResult,
        onError,
        onEnd,
    } = options;

    const [transcript, setTranscript] = useState("");
    const [interimTranscript, setInterimTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState<SpeechRecognitionErrorCode | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Use refs for callbacks to avoid re-creating the recognition instance
    // when callbacks change (which happens on every render if not memoized)
    const onResultRef = useRef(onResult);
    const onErrorRef = useRef(onError);
    const onEndRef = useRef(onEnd);

    const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
    const isManualStopRef = useRef(false);

    useEffect(() => {
        onResultRef.current = onResult;
        onErrorRef.current = onError;
        onEndRef.current = onEnd;
    }, [onResult, onError, onEnd]);

    // Check if API is supported
    const isSupported =
        typeof window !== "undefined" &&
        ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

    // Initialize recognition instance
    useEffect(() => {
        if (!isSupported) return;

        const SpeechRecognitionAPI =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognitionAPI();

        recognition.continuous = continuous;
        recognition.interimResults = interimResults;
        recognition.lang = lang;
        recognition.maxAlternatives = maxAlternatives;

        recognition.onstart = () => {
            setIsListening(true);
            setError(null);
            setErrorMessage(null);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let finalTranscript = "";
            let currentInterim = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                if (!result || !result[0]) continue;

                if (result.isFinal) {
                    finalTranscript += result[0].transcript;
                } else {
                    currentInterim += result[0].transcript;
                }
            }

            if (finalTranscript) {
                setTranscript((prev) => prev + finalTranscript);
                onResultRef.current?.(finalTranscript, true);
            }

            setInterimTranscript(currentInterim);
            if (currentInterim) {
                onResultRef.current?.(currentInterim, false);
            }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            const errorCode = event.error;
            setError(errorCode);
            setErrorMessage(getErrorMessage(errorCode));
            setIsListening(false);
            onErrorRef.current?.(errorCode);
        };

        recognition.onend = () => {
            setIsListening(false);
            setInterimTranscript("");

            // Auto-restart if continuous mode and not manually stopped
            if (continuous && !isManualStopRef.current && !error) {
                try {
                    recognition.start();
                } catch {
                    // Ignore if already started
                }
            }

            onEndRef.current?.();
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.abort();
        };
    }, [isSupported, lang, continuous, interimResults, maxAlternatives]); // Removed callbacks from dependencies

    // Update recognition settings when options change
    useEffect(() => {
        if (recognitionRef.current) {
            recognitionRef.current.lang = lang;
            recognitionRef.current.continuous = continuous;
            recognitionRef.current.interimResults = interimResults;
            recognitionRef.current.maxAlternatives = maxAlternatives;
        }
    }, [lang, continuous, interimResults, maxAlternatives]);

    const start = useCallback(() => {
        if (!isSupported || !recognitionRef.current) return;

        isManualStopRef.current = false;
        setError(null);
        setErrorMessage(null);

        try {
            recognitionRef.current.start();
        } catch {
            // Ignore if already started - this can happen in continuous mode
        }
    }, [isSupported]);

    const stop = useCallback(() => {
        if (!recognitionRef.current) return;

        isManualStopRef.current = true;
        recognitionRef.current.stop();
    }, []);

    const abort = useCallback(() => {
        if (!recognitionRef.current) return;

        isManualStopRef.current = true;
        recognitionRef.current.abort();
        setInterimTranscript("");
    }, []);

    const resetTranscript = useCallback(() => {
        setTranscript("");
        setInterimTranscript("");
    }, []);

    return {
        transcript,
        interimTranscript,
        isListening,
        isSupported,
        error,
        errorMessage,
        start,
        stop,
        abort,
        resetTranscript,
    };
}

export default useSpeechRecognition;
