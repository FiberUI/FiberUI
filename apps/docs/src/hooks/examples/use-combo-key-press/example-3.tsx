"use client";

import { useComboKeyPress } from "@repo/hooks/dom/use-combo-key-press";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export const Example3 = () => {
    const [deletedItems, setDeletedItems] = useState<string[]>([]);

    // Complex combo: Ctrl + Shift + Delete
    useComboKeyPress({ key: "Delete", ctrl: true, shift: true }, () => {
        setDeletedItems((prev) => [...prev, `Item ${prev.length + 1}`]);
    });

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <h3 className="font-semibold">
                Complex Combo (Destructive Action)
            </h3>

            <div className="bg-destructive/5 border-destructive/20 rounded-lg border p-4">
                <div className="text-destructive mb-2 flex items-center gap-3">
                    <Trash2 className="h-5 w-5" />
                    <span className="font-medium">Force Delete Protocol</span>
                </div>
                <p className="text-destructive/80 mb-4 text-sm">
                    Press{" "}
                    <kbd className="bg-background rounded border px-1">
                        Ctrl
                    </kbd>{" "}
                    +{" "}
                    <kbd className="bg-background rounded border px-1">
                        Shift
                    </kbd>{" "}
                    +{" "}
                    <kbd className="bg-background rounded border px-1">
                        Delete
                    </kbd>{" "}
                    to trigger.
                </p>
            </div>

            <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                    Deleted Log:
                </p>
                {deletedItems.length === 0 ? (
                    <p className="text-muted-foreground text-sm italic">
                        No deletions yet.
                    </p>
                ) : (
                    <div className="max-h-32 space-y-1 overflow-y-auto">
                        {deletedItems.map((item, i) => (
                            <div
                                key={i}
                                className="text-destructive flex items-center gap-2 text-xs"
                            >
                                <span>×</span> {item} permanently deleted.
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
