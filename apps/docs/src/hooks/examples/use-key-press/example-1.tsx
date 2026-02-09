"use client";

import { useKeyPress } from "@repo/hooks/dom/use-key-press";
import { Keyboard } from "lucide-react";

export const Example1 = () => {
    // Track specific keys
    const isEnterPressed = useKeyPress("Enter");
    const isEscapePressed = useKeyPress("Escape");
    const isSpacePressed = useKeyPress(" ");
    const isShiftPressed = useKeyPress("Shift");

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                <Keyboard className="text-primary h-5 w-5" />
                <h3 className="font-semibold">Key Press Detection</h3>
            </div>

            <p className="text-muted-foreground text-sm">
                Press the following keys to see their state:
            </p>

            <div className="grid grid-cols-2 gap-3">
                <KeyDisplay label="Enter" isPressed={isEnterPressed} />
                <KeyDisplay label="Escape" isPressed={isEscapePressed} />
                <KeyDisplay label="Space" isPressed={isSpacePressed} />
                <KeyDisplay label="Shift" isPressed={isShiftPressed} />
            </div>
        </div>
    );
};

const KeyDisplay = ({
    label,
    isPressed,
}: {
    label: string;
    isPressed: boolean;
}) => (
    <div
        className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-all duration-150 ${
            isPressed
                ? "border-primary bg-primary/10 text-primary scale-105 font-medium shadow-sm"
                : "border-muted bg-muted/20 text-muted-foreground"
        }`}
    >
        <span>{label}</span>
        <span className="text-xs">{isPressed ? "Pressed" : "Released"}</span>
    </div>
);
