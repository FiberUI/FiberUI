"use client";

import { useRef, useEffect, useState } from "react";
import { useUserMedia } from "@repo/hooks/webrtc/use-user-media";
import { useTrackToggle } from "@repo/hooks/webrtc/use-track-toggle";
import { Button } from "@repo/ui/components/button";
import { Mic, MicOff, Video, VideoOff, Keyboard } from "lucide-react";

/* TRACK TOGGLE WITH KEYBOARD - Keyboard Shortcut Controls */
export const Example1 = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [lastAction, setLastAction] = useState<string | null>(null);

    const { stream, isActive, start, stop } = useUserMedia();
    const {
        isAudioEnabled,
        isVideoEnabled,
        toggleAudio,
        toggleVideo,
        muteAll,
    } = useTrackToggle(stream);

    // Attach stream
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isActive) return;

            if (e.key === "m" || e.key === "M") {
                toggleAudio();
                setLastAction(isAudioEnabled ? "Muted" : "Unmuted");
            } else if (e.key === "v" || e.key === "V") {
                toggleVideo();
                setLastAction(isVideoEnabled ? "Camera Off" : "Camera On");
            } else if (e.key === "Escape") {
                muteAll();
                setLastAction("All Muted");
            }

            // Clear action after 1.5s
            setTimeout(() => setLastAction(null), 1500);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [
        isActive,
        isAudioEnabled,
        isVideoEnabled,
        toggleAudio,
        toggleVideo,
        muteAll,
    ]);

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            {/* Video */}
            <div className="relative aspect-video overflow-hidden rounded-lg bg-zinc-900">
                {isActive && isVideoEnabled ? (
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

                {/* Action Toast */}
                {lastAction && (
                    <div className="absolute left-1/2 top-4 -translate-x-1/2 animate-pulse rounded-full bg-black/80 px-4 py-2 text-sm font-medium text-white">
                        {lastAction}
                    </div>
                )}
            </div>

            {/* Keyboard Shortcuts */}
            {isActive && (
                <div className="rounded-lg border bg-zinc-50 p-3 dark:bg-zinc-900">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                        <Keyboard className="h-4 w-4" />
                        Keyboard Shortcuts
                    </div>
                    <div className="text-muted-foreground grid grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                            <kbd className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono dark:bg-zinc-800">
                                M
                            </kbd>
                            <span>Mute</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <kbd className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono dark:bg-zinc-800">
                                V
                            </kbd>
                            <span>Video</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <kbd className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono dark:bg-zinc-800">
                                Esc
                            </kbd>
                            <span>Mute All</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="flex justify-center gap-2">
                {!isActive ? (
                    <Button onClick={() => start()}>Start</Button>
                ) : (
                    <>
                        <Button
                            variant={isAudioEnabled ? "outline" : "destructive"}
                            size="icon"
                            onClick={toggleAudio}
                        >
                            {isAudioEnabled ? (
                                <Mic className="h-5 w-5" />
                            ) : (
                                <MicOff className="h-5 w-5" />
                            )}
                        </Button>
                        <Button
                            variant={isVideoEnabled ? "outline" : "destructive"}
                            size="icon"
                            onClick={toggleVideo}
                        >
                            {isVideoEnabled ? (
                                <Video className="h-5 w-5" />
                            ) : (
                                <VideoOff className="h-5 w-5" />
                            )}
                        </Button>
                        <Button variant="ghost" onClick={stop}>
                            End
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};
