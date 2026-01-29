"use client";

import { usePortal } from "@repo/hooks/dom/use-portal";
import { useState, useRef, useEffect } from "react";

export function Example2() {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState<{
        top: number;
        left: number;
    } | null>(null);

    // Use a shared container for tooltips if you like, or unique strings.
    // Here we let it create a default one or reuse "fiberui-portal".
    const { Portal } = usePortal({ id: "tooltip-root" });

    // Calculate position when opening
    useEffect(() => {
        if (isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                // Position above the button
                top: rect.top + window.scrollY - 10,
                // Center horizontally
                left: rect.left + window.scrollX + rect.width / 2,
            });
        } else {
            setPosition(null);
        }
    }, [isOpen]);

    return (
        <div className="flex justify-center p-8">
            <button
                ref={triggerRef}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
                Hover me
            </button>

            {isOpen && position && (
                <Portal>
                    <div
                        className="animate-in fade-in z-9999 pointer-events-none absolute -translate-x-1/2 -translate-y-full transform rounded bg-black px-3 py-1.5 text-xs text-white shadow-md duration-200"
                        style={{
                            top: position.top,
                            left: position.left,
                        }}
                    >
                        I&apos;m a portal tooltip!
                        {/* Tiny arrow */}
                        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black" />
                    </div>
                </Portal>
            )}
        </div>
    );
}
