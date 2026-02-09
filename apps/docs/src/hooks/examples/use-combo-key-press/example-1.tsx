"use client";

import { useComboKeyPress } from "@repo/hooks/dom/use-combo-key-press";
import { Save } from "lucide-react";
import { useState } from "react";

export const Example1 = () => {
    const [saved, setSaved] = useState(false);

    // Detect Ctrl+S (Cmd+S)
    useComboKeyPress({ key: "s", ctrl: true }, () => {
        // e.preventDefault() is handled by default options
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    });

    return (
        <div className="flex w-full max-w-md flex-col items-center gap-6">
            <h3 className="font-semibold">Save Shortcut (Ctrl/Cmd + S)</h3>

            <div
                className={`rounded-full p-4 transition-all duration-300 ${
                    saved
                        ? "scale-110 bg-green-100 text-green-600"
                        : "bg-muted text-muted-foreground"
                }`}
            >
                <Save className="h-8 w-8" />
            </div>

            <p className="text-center text-sm">
                Press{" "}
                <kbd className="bg-muted rounded border px-1 py-0.5 text-xs">
                    Ctrl
                </kbd>{" "}
                +{" "}
                <kbd className="bg-muted rounded border px-1 py-0.5 text-xs">
                    S
                </kbd>{" "}
                to trigger save.
            </p>

            {saved && (
                <div className="animate-in fade-in slide-in-from-bottom-2 text-sm font-medium text-green-600">
                    Saved successfully!
                </div>
            )}
        </div>
    );
};
