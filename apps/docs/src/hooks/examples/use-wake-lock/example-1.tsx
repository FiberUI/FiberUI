"use client";

import { useWakeLock } from "@repo/hooks/device/use-wake-lock";
import { Button } from "@repo/ui/components/button";
import { Lock, Unlock, Zap } from "lucide-react";

export function Example1() {
    const { isActive, isSupported, request, release, error } = useWakeLock();

    const handleToggle = async () => {
        if (isActive) {
            await release();
        } else {
            await request();
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div
                className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-6 transition-colors ${
                    isActive
                        ? "border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400"
                        : "border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50"
                }`}
            >
                <div
                    className={`rounded-full p-3 ${isActive ? "bg-green-500/20" : "bg-zinc-200 dark:bg-zinc-700"}`}
                >
                    <Zap
                        className={`h-6 w-6 ${isActive ? "fill-current" : "opacity-50"}`}
                    />
                </div>
                <div className="text-lg font-bold">
                    Screen Wake Lock: {isActive ? "Active" : "Inactive"}
                </div>
                <div className="max-w-xs text-center text-sm opacity-80">
                    {isActive
                        ? "Your screen will prevent sleep efficiently."
                        : "Your screen will sleep according to system settings."}
                </div>
            </div>

            {error && (
                <div className="text-destructive bg-destructive/10 rounded p-2 text-sm">
                    {error.message}
                </div>
            )}

            {!isSupported && (
                <div className="rounded bg-yellow-100 p-2 text-sm text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                    Wake Lock API is not supported in this browser.
                </div>
            )}

            <Button
                onClick={handleToggle}
                isDisabled={!isSupported}
                size="lg"
                className="w-full self-center sm:w-auto"
            >
                {isActive ? (
                    <>
                        <Unlock className="mr-2 h-4 w-4" />
                        Release Lock
                    </>
                ) : (
                    <>
                        <Lock className="mr-2 h-4 w-4" />
                        Acquire Lock
                    </>
                )}
            </Button>
        </div>
    );
}
