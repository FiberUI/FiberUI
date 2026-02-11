"use client";

import { useTimeout } from "@repo/hooks/utility/use-timeout";
import { Button } from "@repo/ui/components/button";
import { useState, useCallback } from "react";
import { ShieldAlert, MousePointerClick } from "lucide-react";

export const Example3 = () => {
    const [status, setStatus] = useState<"active" | "warning" | "expired">(
        "active",
    );

    // After 5 seconds of inactivity, show warning
    const { reset: resetWarning } = useTimeout(
        () => {
            setStatus("warning");
        },
        status === "active" ? 5000 : null,
    );

    // After 8 seconds total (3s after warning), expire
    const { reset: resetExpiry } = useTimeout(
        () => {
            setStatus("expired");
        },
        status === "warning" ? 3000 : null,
    );

    const handleActivity = useCallback(() => {
        setStatus("active");
        resetWarning();
        resetExpiry();
    }, [resetWarning, resetExpiry]);

    const statusConfig = {
        active: {
            color: "bg-green-500",
            border: "border-green-500/20",
            label: "Session Active",
            description:
                "Your session is active. Stop interacting to trigger the idle warning.",
        },
        warning: {
            color: "bg-yellow-500",
            border: "border-yellow-500/20",
            label: "Idle Warning",
            description:
                "You've been idle for 5 seconds. Session expires in 3 seconds...",
        },
        expired: {
            color: "bg-red-500",
            border: "border-red-500/20",
            label: "Session Expired",
            description: "Your session has timed out due to inactivity.",
        },
    };

    const config = statusConfig[status];

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <div
                className={`w-full max-w-sm rounded-lg border ${config.border} p-6 transition-all duration-300`}
            >
                <div className="mb-4 flex items-center gap-3">
                    <ShieldAlert className="h-5 w-5" />
                    <div className="flex items-center gap-2">
                        <span
                            className={`h-2.5 w-2.5 rounded-full ${config.color} ${status === "warning" ? "animate-pulse" : ""}`}
                        />
                        <span className="text-sm font-semibold">
                            {config.label}
                        </span>
                    </div>
                </div>

                <p className="text-muted-foreground mb-4 text-sm">
                    {config.description}
                </p>

                <Button
                    variant="outline"
                    className="w-full"
                    onPress={handleActivity}
                >
                    <MousePointerClick className="mr-2 h-4 w-4" />
                    {status === "expired"
                        ? "Restart Session"
                        : "I'm still here!"}
                </Button>
            </div>

            <p className="text-muted-foreground text-xs">
                Idle → 5s → Warning → 3s → Expired
            </p>
        </div>
    );
};
