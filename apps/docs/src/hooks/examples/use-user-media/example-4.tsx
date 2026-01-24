"use client";

import { useRef, useEffect } from "react";
import { useUserMedia } from "@repo/hooks/webrtc/use-user-media";
import { useAudioLevel } from "@repo/hooks/webrtc/use-audio-level";
import { Button } from "@repo/ui/components/button";
import { Mic, Video, Activity } from "lucide-react";

/* AUDIO LEVEL INDICATOR - Speaking Detection */
export const Example4 = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { stream, isActive, start, stop } = useUserMedia();
    const { level, isSpeaking, peak, resetPeak } = useAudioLevel(stream);

    // Attach stream to video
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    // Volume bar width
    const volumePercent = Math.round(level * 100);
    const peakPercent = Math.round(peak * 100);

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            {/* Video with Speaking Ring */}
            <div
                className={`relative aspect-video overflow-hidden rounded-lg transition-all duration-150 ${
                    isSpeaking
                        ? "ring-offset-background ring-4 ring-green-500 ring-offset-2"
                        : "ring-0"
                }`}
            >
                {isActive ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="h-full w-full scale-x-[-1] object-cover"
                    />
                ) : (
                    <div className="text-muted-foreground flex h-full items-center justify-center bg-zinc-900">
                        <Video className="h-12 w-12 text-zinc-600" />
                    </div>
                )}

                {/* Speaking Indicator Badge */}
                {isActive && isSpeaking && (
                    <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-green-500 px-2.5 py-1 text-xs font-medium text-white">
                        <Activity className="h-3 w-3 animate-pulse" />
                        Speaking
                    </div>
                )}
            </div>

            {/* Volume Meter */}
            {isActive && (
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Mic className="text-muted-foreground h-4 w-4" />
                        <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                            {/* Current Level */}
                            <div
                                className={`absolute inset-y-0 left-0 transition-all duration-75 ${
                                    isSpeaking ? "bg-green-500" : "bg-zinc-400"
                                }`}
                                style={{ width: `${volumePercent}%` }}
                            />
                            {/* Peak Marker */}
                            <div
                                className="absolute inset-y-0 w-0.5 bg-red-500"
                                style={{ left: `${peakPercent}%` }}
                            />
                        </div>
                        <span className="text-muted-foreground w-12 text-right font-mono text-xs">
                            {volumePercent}%
                        </span>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                            Peak: {peakPercent}%
                        </span>
                        <button
                            onClick={resetPeak}
                            className="text-muted-foreground hover:text-foreground underline"
                        >
                            Reset Peak
                        </button>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="flex justify-center">
                {isActive ? (
                    <Button variant="destructive" onClick={stop}>
                        Stop
                    </Button>
                ) : (
                    <Button onClick={() => start()}>Start with Mic</Button>
                )}
            </div>
        </div>
    );
};
