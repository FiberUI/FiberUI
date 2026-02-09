"use client";

import { useWindowScroll } from "@repo/hooks/dom/use-window-scroll";
import { ArrowDown, ArrowUp } from "lucide-react";

export const Example1 = () => {
    const { x, y } = useWindowScroll();

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                {y > 100 ? (
                    <ArrowUp className="text-primary h-5 w-5" />
                ) : (
                    <ArrowDown className="text-muted-foreground h-5 w-5" />
                )}
                <h3 className="font-semibold">Scroll Position</h3>
            </div>

            <p className="text-muted-foreground text-sm">
                Scroll the page to see the values update.
            </p>

            <div className="grid grid-cols-2 gap-4">
                <ScrollValue label="X" value={x} />
                <ScrollValue label="Y" value={y} />
            </div>

            <div
                className={`text-center text-xs transition-opacity ${y > 100 ? "opacity-100" : "opacity-0"}`}
            >
                Scrolled past 100px!
            </div>
        </div>
    );
};

const ScrollValue = ({ label, value }: { label: string; value: number }) => (
    <div className="bg-muted/50 flex flex-col items-center justify-center rounded-lg p-4">
        <span className="text-muted-foreground text-xs font-bold uppercase">
            {label}
        </span>
        <span className="text-primary font-mono text-2xl">
            {Math.round(value)}
        </span>
        <span className="text-muted-foreground text-xs">px</span>
    </div>
);
