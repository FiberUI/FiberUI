"use client";

import { useTimeout } from "@repo/hooks/utility/use-timeout";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";
import { Bell, X, RotateCcw } from "lucide-react";

export const Example1 = () => {
    const [visible, setVisible] = useState(false);

    // Auto-hide the notification after 3 seconds
    const { reset, clear } = useTimeout(
        () => {
            setVisible(false);
        },
        visible ? 3000 : null,
    );

    const show = () => {
        setVisible(true);
        reset();
    };

    const dismiss = () => {
        clear();
        setVisible(false);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <Button variant="outline" onPress={show}>
                <Bell className="mr-2 h-4 w-4" />
                Show Notification
            </Button>

            {visible && (
                <div className="flex w-full max-w-sm items-center gap-3 rounded-lg border bg-zinc-950 p-4 text-white shadow-lg">
                    <Bell className="h-5 w-5 shrink-0 text-blue-400" />
                    <div className="flex-1">
                        <p className="text-sm font-medium">New message!</p>
                        <p className="text-xs text-zinc-400">
                            This will auto-hide in 3 seconds.
                        </p>
                    </div>
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-zinc-400 hover:text-white"
                            onPress={() => reset()}
                            aria-label="Reset timer"
                        >
                            <RotateCcw className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-zinc-400 hover:text-white"
                            onPress={dismiss}
                            aria-label="Dismiss"
                        >
                            <X className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>
            )}

            <p className="text-muted-foreground text-xs">
                {visible
                    ? "Notification visible — resets on click, auto-hides after 3s"
                    : "Click the button to show a self-dismissing notification"}
            </p>
        </div>
    );
};
