"use client";

import { useRef, useEffect } from "react";
import { useScreenShare } from "@repo/hooks/webrtc/use-screen-share";
import { Button } from "@repo/ui/components/button";
import { Monitor, Volume2, VolumeX as VolumeOff } from "lucide-react";

/* SCREEN SHARE WITH AUDIO - Capture System Sound */
export const Example2 = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { stream, isSharing, start, stop, audioTrack } = useScreenShare();

    // Attach stream to video element
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const hasAudio = audioTrack !== null;

    return (
        <div className="flex w-full max-w-lg flex-col gap-4">
            {/* Screen Preview */}
            <div className="bg-muted relative aspect-video overflow-hidden rounded-lg border">
                {isSharing ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted={false}
                        className="h-full w-full object-contain"
                    />
                ) : (
                    <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
                        <Monitor className="h-12 w-12" />
                        <span className="text-sm">
                            Click to share with audio
                        </span>
                    </div>
                )}

                {/* Audio Indicator */}
                {isSharing && (
                    <div
                        className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                            hasAudio
                                ? "bg-green-500 text-white"
                                : "bg-zinc-600 text-zinc-300"
                        }`}
                    >
                        {hasAudio ? (
                            <>
                                <Volume2 className="h-3 w-3" />
                                Audio On
                            </>
                        ) : (
                            <>
                                <VolumeOff className="h-3 w-3" />
                                No Audio
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="text-muted-foreground rounded-lg bg-blue-500/10 p-3 text-xs">
                <strong className="text-blue-600 dark:text-blue-400">
                    Note:
                </strong>{" "}
                System audio capture is only available when sharing a browser
                tab or screen with audio permission. Select &ldquo;Share tab
                audio&rdquo; or &ldquo;Share system audio&rdquo; in the picker.
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-2">
                {isSharing ? (
                    <Button variant="destructive" onClick={stop}>
                        Stop Sharing
                    </Button>
                ) : (
                    <Button
                        onClick={() => start({ audio: true })}
                        className="gap-2"
                    >
                        <Volume2 className="h-4 w-4" />
                        Share with Audio
                    </Button>
                )}
            </div>
        </div>
    );
};
