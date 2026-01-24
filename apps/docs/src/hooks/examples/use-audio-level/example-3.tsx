"use client";

import { useState } from "react";
import { useUserMedia } from "@repo/hooks/webrtc/use-user-media";
import { useAudioLevel } from "@repo/hooks/webrtc/use-audio-level";
import { Button } from "@repo/ui/components/button";
import { Mic, Settings } from "lucide-react";

/* THRESHOLD CONFIGURATION - Adjust Sensitivity */
export const Example3 = () => {
    const [threshold, setThreshold] = useState(0.02);
    const [interval, setInterval] = useState(100);

    const { stream, isActive, start, stop } = useUserMedia({
        constraints: { audio: true, video: false },
    });

    const { level, isSpeaking, isMonitoring } = useAudioLevel(stream, {
        speakingThreshold: threshold,
        sampleInterval: interval,
    });

    const volumePercent = Math.round(level * 100);

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            {/* Status */}
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                    <div
                        className={`h-4 w-4 rounded-full ${
                            isSpeaking
                                ? "animate-pulse bg-green-500"
                                : "bg-zinc-400"
                        }`}
                    />
                    <span className="font-medium">
                        {isSpeaking ? "Speaking" : "Silent"}
                    </span>
                </div>
                <span className="text-muted-foreground font-mono text-sm">
                    {volumePercent}%
                </span>
            </div>

            {/* Level Bar */}
            {isMonitoring && (
                <div className="relative h-4 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                    {/* Level */}
                    <div
                        className={`absolute inset-y-0 left-0 transition-all duration-75 ${
                            isSpeaking ? "bg-green-500" : "bg-zinc-400"
                        }`}
                        style={{ width: `${volumePercent}%` }}
                    />
                    {/* Threshold Marker */}
                    <div
                        className="absolute inset-y-0 w-0.5 bg-red-500"
                        style={{ left: `${threshold * 100}%` }}
                    />
                </div>
            )}

            {/* Configuration */}
            <div className="rounded-lg border p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                    <Settings className="h-4 w-4" />
                    Configuration
                </div>

                {/* Threshold Slider */}
                <div className="mb-4">
                    <div className="mb-1 flex justify-between text-sm">
                        <label className="text-muted-foreground">
                            Speaking Threshold
                        </label>
                        <span className="font-mono">
                            {Math.round(threshold * 100)}%
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0.005"
                        max="0.2"
                        step="0.005"
                        value={threshold}
                        onChange={(e) =>
                            setThreshold(parseFloat(e.target.value))
                        }
                        className="w-full"
                    />
                    <div className="text-muted-foreground mt-1 text-xs">
                        Red line shows threshold. Voice must exceed it to
                        trigger &quot;Speaking&quot;.
                    </div>
                </div>

                {/* Sample Interval */}
                <div>
                    <div className="mb-1 flex justify-between text-sm">
                        <label className="text-muted-foreground">
                            Sample Interval
                        </label>
                        <span className="font-mono">{interval}ms</span>
                    </div>
                    <input
                        type="range"
                        min="50"
                        max="500"
                        step="50"
                        value={interval}
                        onChange={(e) => setInterval(parseInt(e.target.value))}
                        className="w-full"
                    />
                    <div className="text-muted-foreground mt-1 text-xs">
                        Lower = more responsive, higher = less CPU usage.
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center">
                {isActive ? (
                    <Button variant="destructive" onClick={stop}>
                        Stop
                    </Button>
                ) : (
                    <Button
                        onClick={() => start({ audio: true, video: false })}
                        className="gap-2"
                    >
                        <Mic className="h-4 w-4" />
                        Start Microphone
                    </Button>
                )}
            </div>
        </div>
    );
};
