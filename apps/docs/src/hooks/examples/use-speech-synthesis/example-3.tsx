"use client";

import { useState, useMemo } from "react";
import { useSpeechSynthesis } from "@repo/hooks/speech/use-speech-synthesis";
import { Volume2, Square } from "lucide-react";

const SAMPLE_TEXT = `The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once. Speech synthesis technology has advanced significantly over the years, making it possible to create natural-sounding voices that can read any text aloud.`;

/* TEXT HIGHLIGHTING - Word boundary tracking */
export const Example3 = () => {
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    const { speak, cancel, isSpeaking, isSupported } = useSpeechSynthesis({
        rate: 0.9,
        onBoundary: (event) => {
            setCurrentCharIndex(event.charIndex);
        },
        onEnd: () => {
            setCurrentCharIndex(0);
        },
    });

    // Split text into before, current word, and after
    const highlightedText = useMemo(() => {
        if (!isSpeaking || currentCharIndex === 0) {
            return { before: "", current: "", after: SAMPLE_TEXT };
        }

        // Find word boundaries
        let wordStart = currentCharIndex;
        let wordEnd = currentCharIndex;

        // Find start of current word
        while (wordStart > 0 && SAMPLE_TEXT[wordStart - 1] !== " ") {
            wordStart--;
        }

        // Find end of current word
        while (wordEnd < SAMPLE_TEXT.length && SAMPLE_TEXT[wordEnd] !== " ") {
            wordEnd++;
        }

        return {
            before: SAMPLE_TEXT.slice(0, wordStart),
            current: SAMPLE_TEXT.slice(wordStart, wordEnd),
            after: SAMPLE_TEXT.slice(wordEnd),
        };
    }, [currentCharIndex, isSpeaking]);

    if (!isSupported) {
        return (
            <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-center">
                Speech Synthesis is not supported in your browser.
            </div>
        );
    }

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            {/* Text Display with Highlighting */}
            <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                    Text with Word Highlighting
                </p>
                <p className="text-sm leading-relaxed">
                    <span>{highlightedText.before}</span>
                    <span className="rounded bg-yellow-300 px-0.5 font-medium text-yellow-900 dark:bg-yellow-500/30 dark:text-yellow-200">
                        {highlightedText.current}
                    </span>
                    <span className="text-muted-foreground">
                        {highlightedText.after}
                    </span>
                </p>
            </div>

            {/* Controls */}
            <button
                onClick={() => {
                    if (isSpeaking) {
                        cancel();
                        setCurrentCharIndex(0);
                    } else {
                        speak(SAMPLE_TEXT);
                    }
                }}
                className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors ${
                    isSpeaking
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
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
                        Read Aloud
                    </>
                )}
            </button>

            {/* Info */}
            <p className="text-muted-foreground text-center text-xs">
                {isSpeaking
                    ? "Watch the highlighted word as it speaks"
                    : "Click to see word-by-word highlighting"}
            </p>
        </div>
    );
};
