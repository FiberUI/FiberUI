"use client";

import { useMediaDevices } from "@repo/hooks/device/use-media-devices";
import { useState } from "react";
import { Mic, Speaker, Camera, ChevronDown } from "lucide-react";

/* DEVICE SELECTOR - Dropdown Selects */
export const Example4 = () => {
    const { devices, isLoading, isSupported } = useMediaDevices();

    const [selectedMic, setSelectedMic] = useState<string>("");
    const [selectedSpeaker, setSelectedSpeaker] = useState<string>("");
    const [selectedCamera, setSelectedCamera] = useState<string>("");

    if (!isSupported) {
        return (
            <div className="rounded-md border border-yellow-500/50 bg-yellow-500/10 p-4">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Media Devices API is not supported
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <span className="text-muted-foreground text-sm">
                Loading devices...
            </span>
        );
    }

    const microphones = devices.filter((d) => d.kind === "audioinput");
    const speakers = devices.filter((d) => d.kind === "audiooutput");
    const cameras = devices.filter((d) => d.kind === "videoinput");

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            {/* Microphone Select */}
            <DeviceSelect
                icon={<Mic className="h-4 w-4" />}
                label="Microphone"
                devices={microphones}
                value={selectedMic}
                onChange={setSelectedMic}
            />

            {/* Speaker Select */}
            <DeviceSelect
                icon={<Speaker className="h-4 w-4" />}
                label="Speaker"
                devices={speakers}
                value={selectedSpeaker}
                onChange={setSelectedSpeaker}
            />

            {/* Camera Select */}
            <DeviceSelect
                icon={<Camera className="h-4 w-4" />}
                label="Camera"
                devices={cameras}
                value={selectedCamera}
                onChange={setSelectedCamera}
            />

            {/* Selection Summary */}
            <div className="bg-muted/50 mt-2 rounded-lg border p-4">
                <div className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                    Selected Devices
                </div>
                <div className="space-y-1 text-sm">
                    <DeviceSelection
                        label="Mic"
                        deviceId={selectedMic}
                        devices={microphones}
                    />
                    <DeviceSelection
                        label="Speaker"
                        deviceId={selectedSpeaker}
                        devices={speakers}
                    />
                    <DeviceSelection
                        label="Camera"
                        deviceId={selectedCamera}
                        devices={cameras}
                    />
                </div>
            </div>
        </div>
    );
};

const DeviceSelect = ({
    icon,
    label,
    devices,
    value,
    onChange,
}: {
    icon: React.ReactNode;
    label: string;
    devices: MediaDeviceInfo[];
    value: string;
    onChange: (value: string) => void;
}) => {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                {icon}
                {label}
                <span className="bg-muted ml-auto rounded-full px-2 py-0.5 text-xs">
                    {devices.length}
                </span>
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="border-input bg-background focus:ring-ring w-full appearance-none rounded-md border py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2"
                >
                    <option value="">Select {label.toLowerCase()}...</option>
                    {devices.map((device, i) => (
                        <option
                            key={device.deviceId || i}
                            value={device.deviceId}
                        >
                            {device.label || `${label} ${i + 1}`}
                        </option>
                    ))}
                </select>
                <ChevronDown className="text-muted-foreground pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            </div>
        </div>
    );
};

const DeviceSelection = ({
    label,
    deviceId,
    devices,
}: {
    label: string;
    deviceId: string;
    devices: MediaDeviceInfo[];
}) => {
    const device = devices.find((d) => d.deviceId === deviceId);
    return (
        <div className="flex items-center gap-2">
            <span className="text-muted-foreground w-16">{label}:</span>
            <span className="truncate font-medium">
                {device?.label ||
                    device?.deviceId?.slice(0, 12) ||
                    "None selected"}
            </span>
        </div>
    );
};
