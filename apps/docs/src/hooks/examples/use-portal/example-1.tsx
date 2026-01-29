"use client";

import { usePortal } from "@repo/hooks/dom/use-portal";
import { useState } from "react";

export function Example1() {
    const [isOpen, setIsOpen] = useState(false);

    // usePortal implementation
    // This automatically creates <div id="modal-root"></div> in your body
    // It returns a Component 'Portal' that we can use to render content into that div
    const { Portal } = usePortal({ id: "modal-root" });

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="bg-muted/50 rounded-lg border p-4 text-center">
                <p className="text-muted-foreground mb-4 text-sm">
                    Click the button below to open a modal rendered via a
                    Portal.
                </p>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                >
                    Open Portal
                </button>
            </div>

            {/* 
        We use the Portal component returned by the hook.
        It conditionally renders children only when the container is ready.
      */}
            {isOpen && (
                <Portal>
                    <div
                        className="animate-in fade-in zoom-in-95 z-9999 fixed inset-0 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm duration-200"
                        onClick={() => setIsOpen(false)}
                    >
                        <div
                            className="bg-card text-card-foreground relative w-full max-w-md rounded-lg border p-6 shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="mb-2 text-lg font-semibold">
                                Portal Content
                            </h2>
                            <p className="text-muted-foreground mb-4">
                                This content is rendered in a portal
                                (id=&quot;modal-root&quot;), physically located
                                at the end of the body element.
                            </p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                            >
                                Close Portal
                            </button>
                        </div>
                    </div>
                </Portal>
            )}
        </div>
    );
}
