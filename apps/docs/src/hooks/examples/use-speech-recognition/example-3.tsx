"use client";

import { useState } from "react";
import { useSpeechRecognition } from "@repo/hooks/speech/use-speech-recognition";
import { Mic, MicOff, Globe, RotateCcw } from "lucide-react";

const LANGUAGES = [
    { code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" },
    { code: "es-ES", name: "Spanish (Spain)" },
    { code: "es-MX", name: "Spanish (Mexico)" },
    { code: "fr-FR", name: "French" },
    { code: "de-DE", name: "German" },
    { code: "it-IT", name: "Italian" },
    { code: "pt-BR", name: "Portuguese (Brazil)" },
    { code: "ja-JP", name: "Japanese" },
    { code: "ko-KR", name: "Korean" },
    { code: "zh-CN", name: "Chinese (Simplified)" },
    { code: "hi-IN", name: "Hindi" },
    { code: "ar-SA", name: "Arabic" },
    { code: "ru-RU", name: "Russian" },
];

/* LANGUAGE SELECTOR - Multi-language Support */
export const Example3 = () => {
    const [selectedLang, setSelectedLang] = useState("en-US");

    const {
        transcript,
        interimTranscript,
        isListening,
        isSupported,
        start,
        stop,
        resetTranscript,
    } = useSpeechRecognition({
        lang: selectedLang,
        continuous: true,
        interimResults: true,
    });

    if (!isSupported) {
        return (
            <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-center">
                Speech Recognition is not supported in your browser.
            </div>
        );
    }

    const selectedLanguage = LANGUAGES.find((l) => l.code === selectedLang);

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
                <Globe className="text-muted-foreground h-4 w-4" />
                <select
                    value={selectedLang}
                    onChange={(e) => {
                        if (isListening) stop();
                        setSelectedLang(e.target.value);
                        resetTranscript();
                    }}
                    className="border-input bg-background flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
                <button
                    onClick={isListening ? stop : start}
                    className={`flex h-14 w-14 items-center justify-center rounded-full transition-all ${
                        isListening
                            ? "animate-pulse bg-red-500 text-white"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                >
                    {isListening ? (
                        <MicOff className="h-5 w-5" />
                    ) : (
                        <Mic className="h-5 w-5" />
                    )}
                </button>

                <button
                    onClick={resetTranscript}
                    className="bg-muted hover:bg-muted/80 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                >
                    <RotateCcw className="h-4 w-4" />
                </button>
            </div>

            {/* Status */}
            <p className="text-muted-foreground text-center text-sm">
                {isListening
                    ? `Listening in ${selectedLanguage?.name}...`
                    : `Ready to listen in ${selectedLanguage?.name}`}
            </p>

            {/* Transcript */}
            <div className="bg-muted/50 min-h-32 rounded-lg p-4">
                <div className="mb-2 flex items-center justify-between">
                    <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                        Transcript
                    </p>
                    <span className="text-muted-foreground rounded bg-gray-200 px-2 py-0.5 text-xs dark:bg-gray-700">
                        {selectedLang}
                    </span>
                </div>
                <p className="text-sm leading-relaxed">
                    {transcript}
                    {interimTranscript && (
                        <span className="text-muted-foreground italic">
                            {interimTranscript}
                        </span>
                    )}
                    {!transcript && !interimTranscript && (
                        <span className="text-muted-foreground italic">
                            Speak in {selectedLanguage?.name}...
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
};
