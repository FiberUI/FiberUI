"use client";

import { useClipboard } from "@repo/hooks/utility/use-clipboard";
import { Check, Copy } from "lucide-react";

/* CODE BLOCK - Click to Copy */
export const Example3 = () => {
    const { copy, hasCopied, copiedValue } = useClipboard();

    const codeSnippets = [
        {
            label: "Install",
            code: "npm install @repo/ui @repo/hooks",
        },
        {
            label: "Import",
            code: 'import { Button } from "@repo/ui/button";',
        },
        {
            label: "Usage",
            code: '<Button variant="primary">Click me</Button>',
        },
    ];

    return (
        <div className="flex flex-col gap-3">
            {codeSnippets.map((snippet) => (
                <div
                    key={snippet.label}
                    className="group relative overflow-hidden rounded-lg border"
                >
                    <div className="bg-muted/50 flex items-center justify-between border-b px-3 py-1.5">
                        <span className="text-muted-foreground text-xs font-medium">
                            {snippet.label}
                        </span>
                        <button
                            onClick={() => copy(snippet.code)}
                            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs transition-colors"
                        >
                            {hasCopied && copiedValue === snippet.code ? (
                                <>
                                    <Check className="h-3.5 w-3.5 text-green-500" />
                                    <span className="text-green-500">
                                        Copied!
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Copy className="h-3.5 w-3.5" />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                    <pre className="bg-muted/30 overflow-x-auto p-3">
                        <code className="text-sm">{snippet.code}</code>
                    </pre>
                </div>
            ))}
        </div>
    );
};
