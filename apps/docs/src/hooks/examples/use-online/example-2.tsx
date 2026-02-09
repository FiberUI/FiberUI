"use client";

import { useOnline } from "@repo/hooks/dom/use-online";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export const Example2 = () => {
    const isOnline = useOnline();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Form submitted successfully!");
    };

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <h3 className="font-semibold">Network-Aware Form</h3>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-lg border p-4"
            >
                <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                        className="bg-background w-full rounded-md border px-3 py-2 text-sm disabled:opacity-50"
                        placeholder="Type your message..."
                        disabled={!isOnline}
                        rows={3}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!isOnline}
                    className={`text-primary-foreground flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                        isOnline
                            ? "bg-primary hover:bg-primary/90"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                >
                    {isOnline ? (
                        <>
                            <CheckCircle2 className="h-4 w-4" />
                            Send Message
                        </>
                    ) : (
                        <>
                            <AlertCircle className="h-4 w-4" />
                            Offline - Cannot Send
                        </>
                    )}
                </button>
            </form>

            {!isOnline && (
                <div className="border-destructive/20 bg-destructive/10 text-destructive rounded-md border p-3 text-sm">
                    <p className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <strong>Connection Lost:</strong> You must be online to
                        submit this form.
                    </p>
                </div>
            )}
        </div>
    );
};
