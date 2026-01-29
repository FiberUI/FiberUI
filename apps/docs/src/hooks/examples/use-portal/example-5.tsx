"use client";

import { usePortal } from "@repo/hooks/dom/use-portal";
import { useState, useRef } from "react";

export function Example5() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Pass the ref to usePortal to render content inside that element
    const { Portal } = usePortal({ container: containerRef });

    return (
        <div className="flex flex-col gap-4 p-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                >
                    {isOpen ? "Close Portal" : "Open Portal in Box Below"}
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md border p-4">
                    <h3 className="mb-2 font-medium">Main Content Area</h3>
                    <p className="text-muted-foreground text-sm">
                        This area contains the button and normal flow content.
                    </p>
                </div>

                <div
                    ref={containerRef}
                    className="bg-muted/30 relative min-h-[100px] rounded-md border border-dashed p-4"
                >
                    <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                        Target Container (ref)
                    </h3>
                    {/* The portal content will appear here */}
                </div>
            </div>

            {isOpen && (
                <Portal>
                    <div className="animate-in fade-in zoom-in-95 bg-accent text-accent-foreground rounded p-3 text-sm shadow-sm ring-1 ring-inset ring-black/10">
                        ✨ I am portaled into the container div!
                    </div>
                </Portal>
            )}
        </div>
    );
}
