"use client";

import { useRef, useEffect, useState } from "react";
import { useScreenShare } from "@repo/hooks/webrtc/use-screen-share";
import { useUserMedia } from "@repo/hooks/webrtc/use-user-media";
import { Button } from "@repo/ui/components/button";
import { Monitor, Camera } from "lucide-react";

/* PICTURE-IN-PICTURE - Camera overlay on Screen Share */
export const Example3 = () => {
    const screenRef = useRef<HTMLVideoElement>(null);
    const cameraRef = useRef<HTMLVideoElement>(null);
    const [pipPosition, setPipPosition] = useState<"br" | "bl" | "tr" | "tl">(
        "br",
    );

    // Screen share
    const {
        stream: screenStream,
        isSharing,
        start: startScreen,
        stop: stopScreen,
    } = useScreenShare();

    // Camera
    const {
        stream: cameraStream,
        isActive: cameraActive,
        start: startCamera,
        stop: stopCamera,
    } = useUserMedia();

    // Attach streams
    useEffect(() => {
        if (screenRef.current && screenStream) {
            screenRef.current.srcObject = screenStream;
        }
    }, [screenStream]);

    useEffect(() => {
        if (cameraRef.current && cameraStream) {
            cameraRef.current.srcObject = cameraStream;
        }
    }, [cameraStream]);

    // PiP position classes
    const positionClasses = {
        br: "bottom-3 right-3",
        bl: "bottom-3 left-3",
        tr: "top-3 right-3",
        tl: "top-3 left-3",
    };

    const handleStartBoth = async () => {
        await startScreen();
        await startCamera({ video: true, audio: false });
    };

    const handleStopBoth = () => {
        stopScreen();
        stopCamera();
    };

    return (
        <div className="flex w-full max-w-lg flex-col gap-4">
            {/* Main View */}
            <div className="bg-muted relative aspect-video overflow-hidden rounded-lg border">
                {/* Screen Share */}
                {isSharing ? (
                    <video
                        ref={screenRef}
                        autoPlay
                        playsInline
                        muted
                        className="h-full w-full object-contain"
                    />
                ) : (
                    <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
                        <Monitor className="h-12 w-12" />
                        <span className="text-sm">Screen + Camera</span>
                    </div>
                )}

                {/* Camera PiP Overlay */}
                {cameraActive && (
                    <div
                        className={`absolute ${positionClasses[pipPosition]} h-24 w-32 cursor-pointer overflow-hidden rounded-lg border-2 border-white shadow-lg transition-all hover:scale-105`}
                        onClick={() => {
                            const positions: ("br" | "bl" | "tr" | "tl")[] = [
                                "br",
                                "bl",
                                "tl",
                                "tr",
                            ];
                            const current = positions.indexOf(pipPosition);
                            setPipPosition(
                                positions.at((current + 1) % positions.length)!,
                            );
                        }}
                    >
                        <video
                            ref={cameraRef}
                            autoPlay
                            playsInline
                            muted
                            className="h-full w-full scale-x-[-1] object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Info */}
            {isSharing && cameraActive && (
                <p className="text-muted-foreground text-center text-xs">
                    Click the camera overlay to move it to a different corner
                </p>
            )}

            {/* Controls */}
            <div className="flex justify-center gap-2">
                {isSharing ? (
                    <Button variant="destructive" onClick={handleStopBoth}>
                        Stop All
                    </Button>
                ) : (
                    <Button onClick={handleStartBoth} className="gap-2">
                        <Monitor className="h-4 w-4" />
                        <Camera className="h-4 w-4" />
                        Start PiP Mode
                    </Button>
                )}
            </div>
        </div>
    );
};
