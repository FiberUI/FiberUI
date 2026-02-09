"use client";

import { useRef } from "react";
import { useHover } from "@repo/hooks/dom/use-hover";
import { Info } from "lucide-react";

export const Example2 = () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const isHovered = useHover(triggerRef);

    return (
        <div className="flex w-full max-w-md flex-col items-center gap-4">
            <h3 className="font-semibold">Tooltip Interaction</h3>

            <div className="relative">
                <button
                    ref={triggerRef}
                    className="hover:bg-muted flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                >
                    <Info className="h-4 w-4" />
                    Hover me for info
                </button>

                <div
                    className={`bg-popover text-popover-foreground absolute left-1/2 top-full mt-2 w-48 -translate-x-1/2 rounded-lg border p-2 text-center text-xs shadow-md transition-all duration-200 ${
                        isHovered
                            ? "visible translate-y-0 opacity-100"
                            : "invisible -translate-y-2 opacity-0"
                    }`}
                >
                    <p>This tooltip appears when the button is hovered!</p>
                    <div className="bg-popover absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-l border-t" />
                </div>
            </div>

            <p className="text-muted-foreground text-xs">
                The tooltip visibility is controlled purely by the{" "}
                <code>useHover</code> hook.
            </p>
        </div>
    );
};
