"use client";

import { useCountdown } from "@repo/hooks/utility/use-countdown";
import { Button } from "@repo/ui/components/button";
import { useEffect } from "react";

export const Example2 = () => {
    // OTP Resend Timer (30 seconds)
    const { count, start, reset, isRunning } = useCountdown(30, {
        intervalMs: 1000,
        onComplete: () => console.log("Can resend now"),
    });

    // Auto-start on mount
    useEffect(() => {
        start();
    }, [start]);

    const handleResend = async () => {
        // Simulate API call
        console.log("Resending OTP...");
        reset();
        start();
    };

    return (
        <div className="max-w-sm space-y-4 rounded-lg border p-6">
            <div className="space-y-2">
                <h3 className="font-medium">Verify your email</h3>
                <p className="text-muted-foreground text-sm">
                    We sent a 6-digit code to your email. Enter it below to
                    verify your account.
                </p>
            </div>

            <div className="flex justify-center gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-muted h-12 w-10 rounded-lg border text-center text-xl leading-[46px]"
                    >
                        •
                    </div>
                ))}
            </div>

            <Button
                className="w-full"
                size="sm"
                onPress={handleResend}
                isDisabled={isRunning && count > 0}
            >
                {count > 0 ? `Resend code in ${count}s` : "Resend code"}
            </Button>
        </div>
    );
};
