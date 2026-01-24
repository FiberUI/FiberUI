"use client";

import { useRef, useEffect } from "react";
import { useUserMedia } from "@repo/hooks/webrtc/use-user-media";
import { useAudioLevel } from "@repo/hooks/webrtc/use-audio-level";
import { Button } from "@repo/ui/components/button";
import { VideoOff } from "lucide-react";

/* SPEAKING INDICATOR RING - Green Ring Around Video */
export const Example2 = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { stream, isActive, start, stop } = useUserMedia();
    const { level, isSpeaking } = useAudioLevel(stream, {
        speakingThreshold: 0.02,
        smoothingFactor: 0.7,
    });

    // Attach stream
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    // Ring scale based on audio level
    const ringScale = 1 + level * 0.3;

    return (
        <div className="flex w-full max-w-xs flex-col items-center gap-4">
            {/* Avatar with Speaking Ring */}
            <div className="relative">
                {/* Animated Ring */}
                <div
                    className={`absolute -inset-2 rounded-full transition-all duration-100 ${
                        isSpeaking
                            ? "bg-linear-to-r from-green-400 to-emerald-500 opacity-100"
                            : "opacity-0"
                    }`}
                    style={{
                        transform: `scale(${ringScale})`,
                    }}
                />

                {/* Video Container */}
                <div className="border-background relative h-48 w-48 overflow-hidden rounded-full border-4 bg-zinc-900">
                    {isActive ? (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="h-full w-full scale-x-[-1] object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <VideoOff className="h-12 w-12 text-zinc-600" />
                        </div>
                    )}
                </div>

                {/* Speaking Badge */}
                {isSpeaking && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white shadow-lg">
                        Speaking
                    </div>
                )}
            </div>

            {/* Name */}
            <div className="text-center">
                <div className="font-medium">You</div>
                <div className="text-muted-foreground text-sm">
                    {isActive
                        ? isSpeaking
                            ? "Speaking..."
                            : "Listening"
                        : "Offline"}
                </div>
            </div>

            {/* Control */}
            <Button
                onClick={isActive ? stop : () => start()}
                variant={isActive ? "destructive" : "default"}
            >
                {isActive ? "Leave" : "Join"}
            </Button>
        </div>
    );
};
