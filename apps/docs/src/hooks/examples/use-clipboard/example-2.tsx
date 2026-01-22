"use client";

import { useState } from "react";
import { useClipboard } from "@repo/hooks/utility/use-clipboard";
import { Check, Copy } from "lucide-react";

/* COPY INPUT VALUE - Custom Timeout */
export const Example2 = () => {
    const [inputValue, setInputValue] = useState("npm install @repo/hooks");
    const { copy, hasCopied, copiedValue } = useClipboard({ timeout: 3000 });

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border-input bg-background flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter text to copy..."
                />
                <button
                    onClick={() => copy(inputValue)}
                    disabled={!inputValue.trim()}
                    className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                        hasCopied
                            ? "bg-green-600"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {hasCopied ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </button>
            </div>

            {copiedValue && (
                <p className="text-muted-foreground text-sm">
                    Last copied:{" "}
                    <code className="bg-muted rounded px-1.5 py-0.5">
                        {copiedValue}
                    </code>
                </p>
            )}

            <p className="text-muted-foreground text-xs">
                The &quot;Copied&quot; state resets after 3 seconds (custom
                timeout)
            </p>
        </div>
    );
};
