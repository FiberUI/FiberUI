"use client";

import { useNetwork } from "@repo/hooks/utility/use-network";
import { Activity, Radio, Zap, Globe } from "lucide-react";

export const Example2 = () => {
    const { online, downlink, effectiveType, rtt, saveData } = useNetwork();

    if (!online) {
        return (
            <div className="text-muted-foreground w-full rounded-lg border border-dashed p-8 text-center text-sm">
                Connect to the internet to see details
            </div>
        );
    }

    return (
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1 rounded-lg border p-4">
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Activity className="h-3.5 w-3.5" />
                    Speed (Downlink)
                </div>
                <div className="text-2xl font-bold tabular-nums">
                    {downlink ? `${downlink} Mbps` : "--"}
                </div>
            </div>

            <div className="flex flex-col gap-1 rounded-lg border p-4">
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Radio className="h-3.5 w-3.5" />
                    Connection Type
                </div>
                <div className="text-2xl font-bold uppercase tabular-nums">
                    {effectiveType || "--"}
                </div>
            </div>

            <div className="flex flex-col gap-1 rounded-lg border p-4">
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Globe className="h-3.5 w-3.5" />
                    Latency (RTT)
                </div>
                <div className="text-2xl font-bold tabular-nums">
                    {rtt ? `${rtt} ms` : "--"}
                </div>
            </div>

            <div className="flex flex-col gap-1 rounded-lg border p-4">
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Zap className="h-3.5 w-3.5" />
                    Data Saver
                </div>
                <div className="text-2xl font-bold">
                    {saveData ? "On" : "Off"}
                </div>
            </div>
        </div>
    );
};
