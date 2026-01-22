"use client";

import { useClipboard } from "@repo/hooks/utility/use-clipboard";
import { Check, Copy, AlertCircle } from "lucide-react";

/* BASIC USAGE - Copy Button */
export const Example1 = () => {
    const { copy, hasCopied, isSupported, error } = useClipboard();

    const textToCopy = "Hello, World! 👋";

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
            <div className="flex items-center gap-3">
                <code className="bg-muted rounded-md px-3 py-2 text-sm">
                    {textToCopy}
                </code>
                <button
                    onClick={() => copy(textToCopy)}
                    className={`text-primary-foreground inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                        hasCopied
                            ? "bg-amber-500 hover:bg-amber-600"
                            : "bg-primary hover:bg-primary/90"
                    }`}
                >
                    {hasCopied ? (
                        <>
                            <Check className="h-4 w-4" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="h-4 w-4" />
                            Copy
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {error.message}
                </div>
            )}
        </div>
    );
};
