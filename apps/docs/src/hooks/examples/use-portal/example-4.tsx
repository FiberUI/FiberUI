"use client";

import { usePortal } from "@repo/hooks/dom/use-portal";
import { useState } from "react";
import { X } from "lucide-react";

export function Example4() {
    const [toasts, setToasts] = useState<
        Array<{ id: number; message: string }>
    >([]);
    const { Portal } = usePortal({ id: "toast-container" });

    const addToast = () => {
        const id = Date.now();
        setToasts((prev) => [
            ...prev,
            { id, message: `Toast notification #${id.toString().slice(-4)}` },
        ]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div className="flex flex-col items-center gap-4 p-8">
            <button
                onClick={addToast}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
                Add Toast Notification
            </button>

            <Portal>
                <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                    {toasts.map((toast) => (
                        <div
                            key={toast.id}
                            className="bg-background text-foreground animate-in slide-in-from-right-full flex min-w-[300px] items-center justify-between rounded-md border p-4 shadow-lg transition-all"
                        >
                            <span className="text-sm">{toast.message}</span>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="hover:bg-muted rounded-full p-1 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </Portal>
        </div>
    );
}
