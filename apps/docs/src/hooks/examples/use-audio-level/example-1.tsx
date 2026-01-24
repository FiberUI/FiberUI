"use client";

import { useUserMedia } from "@repo/hooks/webrtc/use-user-media";
import { useAudioLevel } from "@repo/hooks/webrtc/use-audio-level";
import { Button } from "@repo/ui/components/button";
import { Mic, Activity } from "lucide-react";

/* VOLUME METER - Real-time Audio Level Visualization */
export const Example1 = () => {
    const { stream, isActive, start, stop } = useUserMedia({
        constraints: { audio: true, video: false },
    });
    const { level, isSpeaking, peak, resetPeak, isMonitoring } =
        useAudioLevel(stream);

    const volumePercent = Math.round(level * 100);
    const peakPercent = Math.round(peak * 100);

    // Generate bars for visualization
    const bars = Array.from({ length: 20 }, (_, i) => {
        const threshold = (i + 1) / 20;
        const isActive = level >= threshold;
        const isPeak = peak >= threshold && peak < threshold + 0.05;
        return { isActive, isPeak, threshold };
    });

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            {/* Status Card */}
            <div
                className={`flex items-center gap-3 rounded-lg border p-4 transition-all ${
                    isSpeaking
                        ? "border-green-500/50 bg-green-500/10"
                        : "border-border"
                }`}
            >
                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                        isSpeaking ? "scale-110 bg-green-500" : "bg-muted"
                    }`}
                >
                    {isSpeaking ? (
                        <Activity className="h-6 w-6 animate-pulse text-white" />
                    ) : (
                        <Mic className="text-muted-foreground h-6 w-6" />
                    )}
                </div>
                <div>
                    <div className="font-medium">
                        {isSpeaking ? "Speaking" : "Silent"}
                    </div>
                    <div className="text-muted-foreground text-sm">
                        {isMonitoring
                            ? `Volume: ${volumePercent}%`
                            : "Not monitoring"}
                    </div>
                </div>
            </div>

            {/* Bar Graph Visualization */}
            {isMonitoring && (
                <div className="flex h-16 items-end justify-center gap-0.5">
                    {bars.map((bar, i) => (
                        <div
                            key={i}
                            className={`w-2 rounded-t transition-all duration-75 ${
                                bar.isPeak
                                    ? "bg-red-500"
                                    : bar.isActive
                                      ? i < 14
                                          ? "bg-green-500"
                                          : i < 17
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                      : "bg-zinc-300 dark:bg-zinc-700"
                            }`}
                            style={{
                                height: `${((i + 1) / 20) * 64}px`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Stats */}
            {isMonitoring && (
                <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                        Peak: {peakPercent}%
                    </span>
                    <button
                        onClick={resetPeak}
                        className="text-muted-foreground hover:text-foreground underline"
                    >
                        Reset
                    </button>
                </div>
            )}

            {/* Controls */}
            <div className="flex justify-center">
                {isActive ? (
                    <Button variant="destructive" onClick={stop}>
                        Stop
                    </Button>
                ) : (
                    <Button
                        onClick={() => start({ audio: true, video: false })}
                    >
                        Start Microphone
                    </Button>
                )}
            </div>
        </div>
    );
};
