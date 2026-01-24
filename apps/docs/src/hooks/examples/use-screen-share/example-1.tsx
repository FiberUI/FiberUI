"use client";

import { useRef, useEffect } from "react";
import { useScreenShare } from "@repo/hooks/webrtc/use-screen-share";
import { Button } from "@repo/ui/components/button";
import { Monitor, MonitorOff, Loader2 } from "lucide-react";

/* BASIC SCREEN SHARE - Start/Stop Screen Capture */
export const Example1 = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const {
        stream,
        isSharing,
        isLoading,
        error,
        start,
        stop,
        displaySurface,
        isSupported,
    } = useScreenShare();

    // Attach stream to video element
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    if (!isSupported) {
        return (
            <div className="text-destructive rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-center text-sm">
                getDisplayMedia is not supported in this browser
            </div>
        );
    }

    return (
        <div className="flex w-full max-w-lg flex-col gap-4">
            {/* Screen Preview */}
            <div className="bg-muted relative aspect-video overflow-hidden rounded-lg border">
                {isSharing ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="h-full w-full object-contain"
                    />
                ) : (
                    <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
                        <MonitorOff className="h-12 w-12" />
                        <span className="text-sm">No screen shared</span>
                    </div>
                )}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                    </div>
                )}

                {/* Display Surface Badge */}
                {isSharing && displaySurface && (
                    <div className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs capitalize text-white">
                        {displaySurface}
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
                {isSharing ? (
                    <Button
                        variant="destructive"
                        onClick={stop}
                        className="gap-2"
                    >
                        <MonitorOff className="h-4 w-4" />
                        Stop Sharing
                    </Button>
                ) : (
                    <Button
                        onClick={() => start()}
                        isDisabled={isLoading}
                        className="gap-2"
                    >
                        <Monitor className="h-4 w-4" />
                        Share Screen
                    </Button>
                )}
            </div>
        </div>
    );
};
