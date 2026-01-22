"use client";

import { useMediaDevices } from "@repo/hooks/device/use-media-devices";
import { Button } from "@repo/ui/components/button";
import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, MicOff, ChevronDown } from "lucide-react";

/* MICROPHONE WITH AUDIO LEVEL - Real-time visualization */
export const Example5 = () => {
    const {
        devices,
        isLoading,
        isSupported,
        hasPermission,
        requestPermission,
    } = useMediaDevices({ kind: "audioinput" });

    const [selectedMic, setSelectedMic] = useState<string>("");
    const [isListening, setIsListening] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);

    const streamRef = useRef<MediaStream | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationRef = useRef<number | null>(null);

    const stopListening = useCallback(() => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        analyserRef.current = null;
        setIsListening(false);
        setAudioLevel(0);
    }, []);

    const startListening = async () => {
        if (!selectedMic) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { deviceId: { exact: selectedMic } },
            });

            streamRef.current = stream;

            const audioContext = new AudioContext();
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);
            analyserRef.current = analyser;

            setIsListening(true);

            // Start animation loop
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const updateLevel = () => {
                if (!analyserRef.current) return;
                analyserRef.current.getByteFrequencyData(dataArray);
                const average =
                    dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
                setAudioLevel(Math.min(100, (average / 128) * 100));
                animationRef.current = requestAnimationFrame(updateLevel);
            };
            updateLevel();
        } catch (err) {
            console.error("Failed to access microphone:", err);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopListening();
        };
    }, [stopListening]);

    // Stop listening when mic changes
    useEffect(() => {
        stopListening();
    }, [selectedMic, stopListening]);

    if (!isSupported) {
        return (
            <div className="rounded-md border border-yellow-500/50 bg-yellow-500/10 p-4">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Media Devices API is not supported
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <span className="text-muted-foreground text-sm">
                Loading microphones...
            </span>
        );
    }

    if (!hasPermission) {
        return (
            <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-lg border p-6">
                <MicOff className="text-muted-foreground h-8 w-8" />
                <p className="text-muted-foreground text-center text-sm">
                    Microphone access is required for this demo
                </p>
                <Button
                    onClick={() =>
                        requestPermission({ audio: true, video: false })
                    }
                >
                    Grant Permission
                </Button>
            </div>
        );
    }

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            {/* Microphone Select */}
            <div className="flex flex-col gap-1.5">
                <label className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                    <Mic className="h-4 w-4" />
                    Select Microphone
                </label>
                <div className="relative">
                    <select
                        value={selectedMic}
                        onChange={(e) => setSelectedMic(e.target.value)}
                        className="border-input bg-background focus:ring-ring w-full appearance-none rounded-md border py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2"
                    >
                        <option value="">Choose a microphone...</option>
                        {devices.map((device, i) => (
                            <option
                                key={device.deviceId || i}
                                value={device.deviceId}
                            >
                                {device.label || `Microphone ${i + 1}`}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="text-muted-foreground pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                </div>
            </div>

            {/* Audio Level Meter */}
            <div className="rounded-lg border p-4">
                <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium">Audio Level</span>
                    <span className="text-muted-foreground text-sm">
                        {Math.round(audioLevel)}%
                    </span>
                </div>

                {/* Level Bar */}
                <div className="bg-muted h-4 overflow-hidden rounded-full">
                    <div
                        className="h-full transition-all duration-75"
                        style={{
                            width: `${audioLevel}%`,
                            backgroundColor:
                                audioLevel > 80
                                    ? "#ef4444"
                                    : audioLevel > 50
                                      ? "#f59e0b"
                                      : "#22c55e",
                        }}
                    />
                </div>

                {/* Level Indicators */}
                <div className="mt-2 flex h-3 justify-between">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-1 rounded-full transition-colors ${
                                audioLevel > i * 5
                                    ? i >= 16
                                        ? "bg-red-500"
                                        : i >= 10
                                          ? "bg-yellow-500"
                                          : "bg-green-500"
                                    : "bg-muted"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Control Button */}
            <Button
                onClick={isListening ? stopListening : startListening}
                isDisabled={!selectedMic}
                variant={isListening ? "destructive" : "default"}
                className="gap-2"
            >
                {isListening ? (
                    <>
                        <MicOff className="h-4 w-4" />
                        Stop Listening
                    </>
                ) : (
                    <>
                        <Mic className="h-4 w-4" />
                        Start Listening
                    </>
                )}
            </Button>

            {!selectedMic && (
                <p className="text-muted-foreground text-center text-xs">
                    Select a microphone to test audio levels
                </p>
            )}
        </div>
    );
};
