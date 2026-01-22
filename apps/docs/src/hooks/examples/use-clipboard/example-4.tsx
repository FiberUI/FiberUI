"use client";

import { useState } from "react";
import { useClipboard } from "@repo/hooks/utility/use-clipboard";
import { ClipboardPaste, AlertCircle } from "lucide-react";

/* READ FROM CLIPBOARD */
export const Example4 = () => {
    const { read, isSupported, error } = useClipboard();
    const [pastedText, setPastedText] = useState<string | null>(null);
    const [isReading, setIsReading] = useState(false);

    const handlePaste = async () => {
        setIsReading(true);
        const text = await read();
        setPastedText(text);
        setIsReading(false);
    };

    if (!isSupported) {
        return (
            <div className="rounded-md border border-yellow-500/50 bg-yellow-500/10 p-4">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Clipboard API is not supported in this browser
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
                <button
                    onClick={handlePaste}
                    disabled={isReading}
                    className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
                >
                    <ClipboardPaste className="h-4 w-4" />
                    {isReading ? "Reading..." : "Paste from Clipboard"}
                </button>
            </div>

            {pastedText !== null && (
                <div className="bg-muted/30 rounded-md border p-3">
                    <p className="text-muted-foreground mb-1 text-xs font-medium">
                        Clipboard content:
                    </p>
                    <p className="break-all text-sm">
                        {pastedText || (
                            <span className="text-muted-foreground italic">
                                (empty)
                            </span>
                        )}
                    </p>
                </div>
            )}

            {error && (
                <div className="flex items-start gap-2 rounded-md border border-red-500/50 bg-red-500/10 p-3">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <div className="text-sm">
                        <p className="font-medium text-red-600 dark:text-red-400">
                            Permission Denied
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">
                            Reading from clipboard requires explicit permission.
                            Some browsers may block this action.
                        </p>
                    </div>
                </div>
            )}

            <p className="text-muted-foreground text-xs">
                💡 Try copying some text, then click the button to paste it
                here.
            </p>
        </div>
    );
};
