"use client";

import { useIdle } from "@repo/hooks/performance/use-idle";
import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { Lock, Unlock } from "lucide-react";

export function Example2() {
    const { idle, isGranted, requestPermission } = useIdle();
    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        // Automatically lock when idle changes to true
        if (idle && isGranted) {
            setIsLocked(true);
        }
    }, [idle, isGranted]);

    return (
        <Card className="relative mx-auto w-full max-w-sm overflow-hidden p-6">
            <div
                className={`transition-all duration-500 ${isLocked ? "pointer-events-none select-none opacity-50 blur-md" : ""}`}
            >
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="font-bold">Banking Dashboard</h3>
                    <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-400">
                        Secure Session
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-muted-foreground text-xs uppercase tracking-wider">
                            Available Balance
                        </p>
                        <p className="text-3xl font-black">$42,450.00</p>
                    </div>

                    <div className="mt-6 space-y-2">
                        <div className="flex items-center justify-between border-b py-2">
                            <span className="text-sm">Apple Store</span>
                            <span className="text-destructive text-sm font-medium">
                                -$1,299.00
                            </span>
                        </div>
                        <div className="flex items-center justify-between border-b py-2">
                            <span className="text-sm">Salary Deposit</span>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                +$4,200.00
                            </span>
                        </div>
                    </div>
                </div>

                {!isGranted && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={requestPermission}
                        className="mt-6 w-full"
                    >
                        Enable Auto-Lock Feature
                    </Button>
                )}
            </div>

            {/* Lock Overlay */}
            {isLocked && (
                <div className="bg-background/50 animate-in fade-in zoom-in-95 absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                    <div className="bg-primary/20 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                        <Lock className="h-8 w-8" />
                    </div>
                    <h4 className="mb-2 text-xl font-bold">Session Locked</h4>
                    <p className="text-muted-foreground mb-6 text-sm">
                        Your session was automatically locked because you were
                        away from your device.
                    </p>

                    <Button
                        onClick={() => setIsLocked(false)}
                        className="w-full gap-2"
                    >
                        <Unlock className="h-4 w-4" />
                        Unlock Session
                    </Button>
                </div>
            )}
        </Card>
    );
}
