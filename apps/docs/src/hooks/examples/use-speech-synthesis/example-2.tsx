"use client";

import { useState } from "react";
import { useSpeechSynthesis } from "@repo/hooks/speech/use-speech-synthesis";
import { Volume2, Pause, Play, Square, User } from "lucide-react";

/* VOICE AND RATE CONTROLS */
export const Example2 = () => {
    const [text, setText] = useState(
        "Welcome to the voice customization demo! Adjust the voice, speed, and pitch to find your preferred settings.",
    );
    const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);

    // Get voices first without passing voice option
    const { voices, isSupported, isSpeaking, isPaused, cancel, pause, resume } =
        useSpeechSynthesis({
            rate,
            pitch,
        });

    console.log("voices", { voices });

    // Get selected voice safely
    const selectedVoice = voices[selectedVoiceIndex] || null;

    // Create a new speech synthesis instance with the selected voice
    const speakWithVoice = (textToSpeak: string) => {
        if (!isSupported || !textToSpeak.trim()) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.rate = rate;
        utterance.pitch = pitch;

        window.speechSynthesis.speak(utterance);
    };

    if (!isSupported) {
        return (
            <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-center">
                Speech Synthesis is not supported in your browser.
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
                className="border-input bg-background min-h-24 w-full rounded-lg border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Voice Selector */}
            <div className="flex items-center gap-2">
                <User className="text-muted-foreground h-4 w-4" />
                <select
                    value={selectedVoiceIndex}
                    onChange={(e) =>
                        setSelectedVoiceIndex(Number(e.target.value))
                    }
                    className="border-input bg-background flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {voices.map((voice, index) => (
                        <option key={`${voice.name}-${index}`} value={index}>
                            {voice.name} ({voice.lang})
                        </option>
                    ))}
                </select>
            </div>

            {/* Rate Slider */}
            <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Speed</span>
                    <span className="font-mono">{rate.toFixed(1)}x</span>
                </div>
                <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full accent-blue-500"
                />
            </div>

            {/* Pitch Slider */}
            <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Pitch</span>
                    <span className="font-mono">{pitch.toFixed(1)}</span>
                </div>
                <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={pitch}
                    onChange={(e) => setPitch(Number(e.target.value))}
                    className="w-full accent-blue-500"
                />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => speakWithVoice(text)}
                    disabled={!text.trim() || isSpeaking}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium disabled:opacity-50"
                >
                    <Volume2 className="h-4 w-4" />
                    Speak
                </button>

                <button
                    onClick={() => (isPaused ? resume() : pause())}
                    disabled={!isSpeaking}
                    className="bg-muted hover:bg-muted/80 flex h-10 w-10 items-center justify-center rounded-lg disabled:opacity-50"
                >
                    {isPaused ? (
                        <Play className="h-4 w-4" />
                    ) : (
                        <Pause className="h-4 w-4" />
                    )}
                </button>

                <button
                    onClick={cancel}
                    disabled={!isSpeaking}
                    className="bg-muted hover:bg-muted/80 flex h-10 w-10 items-center justify-center rounded-lg disabled:opacity-50"
                >
                    <Square className="h-4 w-4" />
                </button>
            </div>

            {/* Status */}
            <p className="text-muted-foreground text-center text-xs">
                {isSpeaking
                    ? isPaused
                        ? "Paused"
                        : "Speaking..."
                    : `${voices.length} voices available`}
            </p>
        </div>
    );
};
