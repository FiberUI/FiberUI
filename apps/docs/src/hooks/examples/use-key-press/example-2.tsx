"use client";

import { useKeyPress } from "@repo/hooks/dom/use-key-press";
import { Gamepad2 } from "lucide-react";

export const Example2 = () => {
    const up = useKeyPress("ArrowUp");
    const down = useKeyPress("ArrowDown");
    const left = useKeyPress("ArrowLeft");
    const right = useKeyPress("ArrowRight");
    const w = useKeyPress("w");
    const a = useKeyPress("a");
    const s = useKeyPress("s");
    const d = useKeyPress("d");

    const isMoving = up || down || left || right || w || a || s || d;

    return (
        <div className="flex w-full max-w-md flex-col items-center gap-6">
            <div className="flex items-center gap-2">
                <Gamepad2
                    className={`h-5 w-5 ${isMoving ? "text-primary animate-pulse" : ""}`}
                />
                <h3 className="font-semibold">Game Controls</h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div />
                <KeyCap label="W / ↑" active={up || w} />
                <div />
                <KeyCap label="A / ←" active={left || a} />
                <KeyCap label="S / ↓" active={down || s} />
                <KeyCap label="D / →" active={right || d} />
            </div>

            <p className="text-muted-foreground text-center text-sm">
                {isMoving ? "Character is moving!" : "Character is idle."}
            </p>
        </div>
    );
};

const KeyCap = ({ label, active }: { label: string; active: boolean }) => (
    <div
        className={`flex h-12 w-16 items-center justify-center rounded-lg border-b-4 text-sm font-bold transition-all ${
            active
                ? "border-primary bg-primary text-primary-foreground translate-y-1 border-b-0"
                : "border-muted-foreground/30 bg-muted"
        }`}
    >
        {label}
    </div>
);
