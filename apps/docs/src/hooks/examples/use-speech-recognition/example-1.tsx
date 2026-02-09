"use client";

import { useSpeechRecognition } from "@repo/hooks/speech/use-speech-recognition";
import { Mic, MicOff, RotateCcw } from "lucide-react";

/* BASIC USAGE - Voice Transcription */
export const Example1 = () => {
    const {
        transcript,
        interimTranscript,
        isListening,
        isSupported,
        error,
        errorMessage,
        start,
        stop,
        resetTranscript,
    } = useSpeechRecognition();

    if (!isSupported) {
        return (
            <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-center">
                <p className="font-medium">
                    Speech Recognition is not supported in your browser.
                </p>
                <p className="mt-1 text-sm opacity-80">
                    Try using Chrome, Edge, or Safari.
                </p>
            </div>
        );
    }

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            {/* Microphone Button */}
            <div className="flex items-center justify-center gap-3">
                <button
                    onClick={isListening ? stop : start}
                    className={`flex h-16 w-16 items-center justify-center rounded-full transition-all ${
                        isListening
                            ? "animate-pulse bg-red-500 text-white"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                >
                    {isListening ? (
                        <MicOff className="h-6 w-6" />
                    ) : (
                        <Mic className="h-6 w-6" />
                    )}
                </button>

                <button
                    onClick={resetTranscript}
                    className="bg-muted hover:bg-muted/80 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                    title="Reset transcript"
                >
                    <RotateCcw className="h-4 w-4" />
                </button>
            </div>

            {/* Status */}
            <p className="text-muted-foreground text-center text-sm">
                {isListening
                    ? "Listening... speak now"
                    : "Click the microphone to start"}
            </p>

            {/* Transcript Display */}
            <div className="bg-muted/50 min-h-32 rounded-lg p-4">
                <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                    Transcript
                </p>
                <p className="text-sm leading-relaxed">
                    {transcript}
                    {interimTranscript && (
                        <span className="text-muted-foreground italic">
                            {interimTranscript}
                        </span>
                    )}
                    {!transcript && !interimTranscript && (
                        <span className="text-muted-foreground italic">
                            Your speech will appear here...
                        </span>
                    )}
                </p>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-sm">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};
