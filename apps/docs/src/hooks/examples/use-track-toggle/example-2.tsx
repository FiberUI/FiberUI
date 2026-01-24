"use client";

import { useRef, useEffect } from "react";
import { useUserMedia } from "@repo/hooks/webrtc/use-user-media";
import { useTrackToggle } from "@repo/hooks/webrtc/use-track-toggle";
import { Button } from "@repo/ui/components/button";
import { Mic, MicOff, Video, VideoOff, Phone, PhoneOff } from "lucide-react";

/* MEETING CONTROLS - Video Call Style Controls */
export const Example2 = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { stream, isActive, start, stop } = useUserMedia();
    const { isAudioEnabled, isVideoEnabled, toggleAudio, toggleVideo } =
        useTrackToggle(stream);

    // Attach stream
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            {/* Video */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900">
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
                        <div className="bg-linear-to-br flex h-20 w-20 items-center justify-center rounded-full from-blue-500 to-purple-600 text-2xl font-bold text-white">
                            U
                        </div>
                    </div>
                )}

                {/* Status Indicators */}
                {isActive && (
                    <div className="absolute left-3 top-3 flex gap-1.5">
                        {!isAudioEnabled && (
                            <div className="rounded-full bg-red-500 p-1.5">
                                <MicOff className="h-3 w-3 text-white" />
                            </div>
                        )}
                        {!isVideoEnabled && (
                            <div className="rounded-full bg-red-500 p-1.5">
                                <VideoOff className="h-3 w-3 text-white" />
                            </div>
                        )}
                    </div>
                )}

                {/* Floating Controls Bar */}
                {isActive && (
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-zinc-800/90 p-2 backdrop-blur">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleAudio}
                            className={`rounded-full ${
                                isAudioEnabled
                                    ? "hover:bg-zinc-700"
                                    : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                        >
                            {isAudioEnabled ? (
                                <Mic className="h-5 w-5 text-white" />
                            ) : (
                                <MicOff className="h-5 w-5" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleVideo}
                            className={`rounded-full ${
                                isVideoEnabled
                                    ? "hover:bg-zinc-700"
                                    : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                        >
                            {isVideoEnabled ? (
                                <Video className="h-5 w-5 text-white" />
                            ) : (
                                <VideoOff className="h-5 w-5" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={stop}
                            className="rounded-full bg-red-500 text-white hover:bg-red-600"
                        >
                            <PhoneOff className="h-5 w-5" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Join Button */}
            {!isActive && (
                <Button
                    onClick={() => start()}
                    className="mx-auto gap-2 bg-green-600 hover:bg-green-700"
                >
                    <Phone className="h-4 w-4" />
                    Join Meeting
                </Button>
            )}
        </div>
    );
};
