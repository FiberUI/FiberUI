"use client";

import { usePortal } from "@repo/hooks/dom/use-portal";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Example3() {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState<{
        top: number;
        left: number;
        width: number;
    } | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { Portal } = usePortal({ id: "dropdown-root" });

    // Handle outside click to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Update position on open or scroll/resize
    useEffect(() => {
        const updatePosition = () => {
            if (triggerRef.current && isOpen) {
                const rect = triggerRef.current.getBoundingClientRect();
                setPosition({
                    top: rect.bottom + window.scrollY + 4,
                    left: rect.left + window.scrollX,
                    width: rect.width,
                });
            } else {
                setPosition(null);
            }
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition);
        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition);
        };
    }, [isOpen]);

    return (
        <div className="flex flex-col items-center gap-4 p-8">
            <button
                ref={triggerRef}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-background hover:bg-muted/50 flex w-48 items-center justify-between rounded-md border px-4 py-2 text-sm shadow-sm transition-colors"
            >
                <span>Options</span>
                <span
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                >
                    <ChevronDown />
                </span>
            </button>

            {isOpen && position && (
                <Portal>
                    <div
                        ref={dropdownRef}
                        className="bg-popover text-popover-foreground animate-in fade-in zoom-in-95 z-9999 absolute rounded-md border shadow-md duration-100"
                        style={{
                            top: position.top,
                            left: position.left,
                            width: position.width,
                        }}
                    >
                        <div className="p-1">
                            <div
                                className="hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-sm px-2 py-1.5 text-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Profile
                            </div>
                            <div
                                className="hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-sm px-2 py-1.5 text-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Settings
                            </div>
                            <div className="bg-border my-1 h-px" />
                            <div
                                className="hover:bg-destructive hover:text-destructive-foreground cursor-pointer rounded-sm px-2 py-1.5 text-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Logout
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
        </div>
    );
}
