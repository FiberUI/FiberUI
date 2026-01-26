"use client";

import { useEyeDropper } from "@repo/hooks/utility/use-eye-dropper";
import { Button } from "@repo/ui/components/button";
import { Pipette } from "lucide-react";
import { toast } from "sonner";

export function Example1() {
    const { open, isSupported, color, isLoading } = useEyeDropper();

    const handlePickColor = async () => {
        try {
            const result = await open();
            if (result) {
                toast.success(`Color picked: ${result.sRGBHex}`);
            }
        } catch {
            // Error is already handled in hook, but we can access it here too
            toast.error("Failed to pick color");
        }
    };

    if (!isSupported) {
        return (
            <div className="rounded-md bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                EyeDropper API is not supported in this browser (Chrome/Edge
                only).
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div
                className="h-32 w-32 rounded-xl border-4 border-white shadow-lg transition-colors duration-200 dark:border-zinc-800"
                style={{ backgroundColor: color || "#000000" }}
            />
            <div className="flex items-center gap-2">
                <Button
                    onClick={handlePickColor}
                    isDisabled={isLoading}
                    className="gap-2"
                >
                    <Pipette className="h-4 w-4" />
                    {isLoading ? "Picking..." : "Pick Color"}
                </Button>
                {color && (
                    <div className="rounded bg-zinc-100 px-2 py-1 font-mono text-sm dark:bg-zinc-800">
                        {color}
                    </div>
                )}
            </div>
            <p className="max-w-xs text-center text-sm text-zinc-500">
                Click the button and select any pixel on your screen (even
                outside the browser!)
            </p>
        </div>
    );
}
