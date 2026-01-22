"use client";

import { useMediaDevices } from "@repo/hooks/device/use-media-devices";
import { Mic, Speaker, Video } from "lucide-react";

/* LIST ALL DEVICES - Grouped by Type */
export const Example3 = () => {
    const { devices, isLoading, isSupported } = useMediaDevices();

    if (!isSupported) {
        return (
            <div className="rounded-md border border-yellow-500/50 bg-yellow-500/10 p-4">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Media Devices API is not supported in this browser
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

    const grouped = devices.reduce(
        (acc, device) => {
            if (!acc[device.kind]) acc[device.kind] = [];
            acc[device.kind]?.push(device);
            return acc;
        },
        {} as Record<string, MediaDeviceInfo[]>,
    );

    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <DeviceGroup
                title="Audio Input"
                icon={<Mic className="h-4 w-4" />}
                devices={grouped["audioinput"]}
            />
            <DeviceGroup
                title="Audio Output"
                icon={<Speaker className="h-4 w-4" />}
                devices={grouped["audiooutput"]}
            />
            <DeviceGroup
                title="Video Input"
                icon={<Video className="h-4 w-4" />}
                devices={grouped["videoinput"]}
            />
        </div>
    );
};

const DeviceGroup = ({
    title,
    icon,
    devices,
}: {
    title: string;
    icon: React.ReactNode;
    devices?: MediaDeviceInfo[];
}) => {
    if (!devices?.length) return null;

    return (
        <div className="flex flex-col gap-2">
            <div className="text-foreground flex items-center gap-2 text-sm font-medium">
                {icon}
                <span>{title}</span>
                <span className="text-muted-foreground ml-auto text-xs">
                    {devices.length}
                </span>
            </div>
            <div className="divide-y rounded-lg border">
                {devices.map((device, i) => (
                    <div key={device.deviceId || i} className="p-3 text-sm">
                        <div className="truncate font-medium">
                            {device.label || `Unknown Device ${i + 1}`}
                        </div>
                        <div className="text-muted-foreground mt-0.5 truncate text-xs">
                            ID:{" "}
                            {device.deviceId
                                ? device.deviceId.slice(0, 8) + "..."
                                : "N/A"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
