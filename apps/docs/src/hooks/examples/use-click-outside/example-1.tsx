"use client";

import { useClickOutside } from "@repo/hooks/dom/use-click-outside";
import { useRef, useState } from "react";

export function Example1() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => {
        setIsOpen(false);
    });

    return (
        <div className="flex flex-col items-center gap-4 p-8">
            <button
                onClick={() => setIsOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
                {isOpen ? "Modal Open" : "Open Modal"}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div
                        ref={ref}
                        className="bg-card text-card-foreground w-full max-w-sm rounded-lg border p-6 shadow-lg"
                    >
                        <h3 className="text-lg font-semibold">Modal Title</h3>
                        <p className="text-muted-foreground mt-2 text-sm">
                            Click outside this box to close it.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
