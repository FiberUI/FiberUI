"use client";

import { useRef, useEffect } from "react";
import { useUserMedia } from "@repo/hooks/webrtc/use-user-media";
import { Button } from "@repo/ui/components/button";
import { Video, VideoOff, Loader2 } from "lucide-react";

/* BASIC CAMERA PREVIEW - Start/Stop Video Stream */
export const Example1 = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { stream, isActive, isLoading, error, start, stop, isSupported } =
        useUserMedia();

    // Attach stream to video element
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    if (!isSupported) {
        return (
            <div className="text-destructive rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-center text-sm">
                getUserMedia is not supported in this browser
            </div>
        );
    }

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            {/* Video Preview */}
            <div className="bg-muted relative aspect-video overflow-hidden rounded-lg">
                {isActive ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="text-muted-foreground flex h-full items-center justify-center">
                        <VideoOff className="h-12 w-12" />
                    </div>
                )}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="text-destructive rounded-md bg-red-500/10 p-3 text-sm">
                    {error.message}
                </div>
            )}

            {/* Controls */}
            <div className="flex justify-center gap-2">
                {isActive ? (
                    <Button
                        variant="destructive"
                        onClick={stop}
                        className="gap-2"
                    >
                        <VideoOff className="h-4 w-4" />
                        Stop Camera
                    </Button>
                ) : (
                    <Button
                        onClick={() => start()}
                        isDisabled={isLoading}
                        className="gap-2"
                    >
                        <Video className="h-4 w-4" />
                        Start Camera
                    </Button>
                )}
            </div>
        </div>
    );
};
