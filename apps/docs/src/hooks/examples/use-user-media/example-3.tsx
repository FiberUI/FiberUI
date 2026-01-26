"use client";

import { useRef, useEffect } from "react";
import { useUserMedia } from "@repo/hooks/webrtc/use-user-media";
import { useTrackToggle } from "@repo/hooks/webrtc/use-track-toggle";
import { Button } from "@repo/ui/components/button";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

/* MUTE CONTROLS - Toggle Audio & Video Tracks */
export const Example3 = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { stream, isActive, start, stop } = useUserMedia();
    const { isAudioEnabled, isVideoEnabled, toggleAudio, toggleVideo } =
        useTrackToggle(stream);

    // Attach stream to video
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            {/* Video Preview */}
            <div className="bg-muted relative aspect-video overflow-hidden rounded-lg">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`h-full w-full scale-x-[-1] object-cover ${
                        !isActive || !isVideoEnabled ? "hidden" : ""
                    }`}
                />
                {(!isActive || !isVideoEnabled) && (
                    <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 bg-zinc-900">
                        <VideoOff className="h-12 w-12 text-zinc-600" />
                        <span className="text-sm text-zinc-500">
                            {isActive ? "Camera Off" : "Not Started"}
                        </span>
                    </div>
                )}

                {/* Mute Indicators */}
                {isActive && (
                    <div className="absolute bottom-3 left-3 flex gap-2">
                        {!isAudioEnabled && (
                            <div className="flex items-center gap-1 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                                <MicOff className="h-3 w-3" />
                                Muted
                            </div>
                        )}
                        {!isVideoEnabled && (
                            <div className="flex items-center gap-1 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                                <VideoOff className="h-3 w-3" />
                                Off
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-2">
                {!isActive ? (
                    <Button onClick={() => start()}>Start Camera</Button>
                ) : (
                    <>
                        {/* Audio Toggle */}
                        <Button
                            variant={isAudioEnabled ? "outline" : "destructive"}
                            size="icon"
                            onClick={toggleAudio}
                            aria-label={isAudioEnabled ? "Mute" : "Unmute"}
                        >
                            {isAudioEnabled ? (
                                <Mic className="h-5 w-5" />
                            ) : (
                                <MicOff className="h-5 w-5" />
                            )}
                        </Button>

                        {/* Video Toggle */}
                        <Button
                            variant={isVideoEnabled ? "outline" : "destructive"}
                            size="icon"
                            onClick={toggleVideo}
                            aria-label={
                                isVideoEnabled
                                    ? "Turn off camera"
                                    : "Turn on camera"
                            }
                        >
                            {isVideoEnabled ? (
                                <Video className="h-5 w-5" />
                            ) : (
                                <VideoOff className="h-5 w-5" />
                            )}
                        </Button>

                        {/* Stop */}
                        <Button variant="ghost" onClick={stop}>
                            End
                        </Button>
                    </>
                )}
            </div>

            {/* Status */}
            {isActive && (
                <div className="text-muted-foreground text-center text-xs">
                    Audio: {isAudioEnabled ? "On" : "Off"} • Video:{" "}
                    {isVideoEnabled ? "On" : "Off"}
                </div>
            )}
        </div>
    );
};
