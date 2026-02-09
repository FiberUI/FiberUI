"use client";

import { useState } from "react";
import { useSpeechSynthesis } from "@repo/hooks/speech/use-speech-synthesis";
import { Volume2, VolumeX, Square } from "lucide-react";

/* BASIC USAGE - Text to Speech */
export const Example1 = () => {
    const [text, setText] = useState(
        "Hello! I am a text-to-speech demo. You can type anything here and I will read it aloud for you.",
    );

    const { speak, cancel, isSpeaking, isSupported, errorMessage } =
        useSpeechSynthesis();

    if (!isSupported) {
        return (
            <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-center">
                <p className="font-medium">
                    Speech Synthesis is not supported in your browser.
                </p>
            </div>
        );
    }

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            {/* Text Input */}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to speak..."
                className="border-input bg-background min-h-32 w-full rounded-lg border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Controls */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => (isSpeaking ? cancel() : speak(text))}
                    disabled={!text.trim()}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors ${
                        isSpeaking
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    }`}
                >
                    {isSpeaking ? (
                        <>
                            <Square className="h-4 w-4" />
                            Stop
                        </>
                    ) : (
                        <>
                            <Volume2 className="h-4 w-4" />
                            Speak
                        </>
                    )}
                </button>
            </div>

            {/* Status */}
            <div className="flex items-center justify-center gap-2">
                {isSpeaking ? (
                    <>
                        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                        <span className="text-muted-foreground text-sm">
                            Speaking...
                        </span>
                    </>
                ) : (
                    <>
                        <VolumeX className="text-muted-foreground h-4 w-4" />
                        <span className="text-muted-foreground text-sm">
                            Ready
                        </span>
                    </>
                )}
            </div>

            {/* Error Display */}
            {errorMessage && (
                <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-sm">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};
