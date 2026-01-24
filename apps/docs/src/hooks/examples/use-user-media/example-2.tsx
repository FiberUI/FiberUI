"use client";

import { useRef, useEffect, useState } from "react";
import { useUserMedia } from "@repo/hooks/webrtc/use-user-media";
import { useMediaDevices } from "@repo/hooks/webrtc/use-media-devices";
import { Button } from "@repo/ui/components/button";
import { Camera, Mic, RefreshCw } from "lucide-react";

/* DEVICE SELECTION - Choose Camera/Microphone from Dropdown */
export const Example2 = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [selectedCamera, setSelectedCamera] = useState<string>("");
    const [selectedMic, setSelectedMic] = useState<string>("");

    // Get device list
    const {
        devices,
        hasPermission,
        requestPermission,
        refetch: refetchDevices,
    } = useMediaDevices();

    // Get media stream
    const {
        stream,
        isActive,
        start,
        stop,
        switchVideoDevice,
        switchAudioDevice,
    } = useUserMedia();

    // Filter devices by type
    const cameras = devices.filter((d) => d.kind === "videoinput");
    const microphones = devices.filter((d) => d.kind === "audioinput");

    // Attach stream to video
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    // Request permissions and start
    const handleStart = async () => {
        if (!hasPermission) {
            await requestPermission({ audio: true, video: true });
            await refetchDevices();
        }
        await start();
    };

    // Handle camera change
    const handleCameraChange = async (deviceId: string) => {
        setSelectedCamera(deviceId);
        if (isActive) {
            await switchVideoDevice(deviceId);
        }
    };

    // Handle mic change
    const handleMicChange = async (deviceId: string) => {
        setSelectedMic(deviceId);
        if (isActive) {
            await switchAudioDevice(deviceId);
        }
    };

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
                        className="h-full w-full scale-x-[-1] object-cover"
                    />
                ) : (
                    <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
                        <Camera className="h-10 w-10" />
                        <span className="text-sm">No camera active</span>
                    </div>
                )}
            </div>

            {/* Device Selectors */}
            <div className="space-y-3">
                {/* Camera Select */}
                <div>
                    <label className="text-muted-foreground mb-1.5 flex items-center gap-2 text-sm font-medium">
                        <Camera className="h-4 w-4" />
                        Camera
                    </label>
                    <select
                        className="bg-background w-full rounded-md border px-3 py-2 text-sm"
                        value={selectedCamera}
                        onChange={(e) => handleCameraChange(e.target.value)}
                        disabled={cameras.length === 0}
                    >
                        <option value="">
                            {cameras.length === 0
                                ? "No cameras found"
                                : "Select camera..."}
                        </option>
                        {cameras.map((camera) => (
                            <option
                                key={camera.deviceId}
                                value={camera.deviceId}
                            >
                                {camera.label ||
                                    `Camera ${cameras.indexOf(camera) + 1}`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Microphone Select */}
                <div>
                    <label className="text-muted-foreground mb-1.5 flex items-center gap-2 text-sm font-medium">
                        <Mic className="h-4 w-4" />
                        Microphone
                    </label>
                    <select
                        className="bg-background w-full rounded-md border px-3 py-2 text-sm"
                        value={selectedMic}
                        onChange={(e) => handleMicChange(e.target.value)}
                        disabled={microphones.length === 0}
                    >
                        <option value="">
                            {microphones.length === 0
                                ? "No microphones found"
                                : "Select microphone..."}
                        </option>
                        {microphones.map((mic) => (
                            <option key={mic.deviceId} value={mic.deviceId}>
                                {mic.label ||
                                    `Microphone ${microphones.indexOf(mic) + 1}`}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
                {isActive ? (
                    <Button
                        variant="destructive"
                        onClick={stop}
                        className="flex-1"
                    >
                        Stop
                    </Button>
                ) : (
                    <Button onClick={handleStart} className="flex-1">
                        Start Camera
                    </Button>
                )}
                <Button variant="outline" size="icon" onClick={refetchDevices}>
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
