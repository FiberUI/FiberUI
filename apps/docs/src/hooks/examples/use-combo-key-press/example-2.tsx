"use client";

import { useComboKeyPress } from "@repo/hooks/dom/use-combo-key-press";
import { Check } from "lucide-react";
import { useState } from "react";

export const Example2 = () => {
    const [items, setItems] = useState([
        { id: 1, label: "Item 1", selected: false },
        { id: 2, label: "Item 2", selected: false },
        { id: 3, label: "Item 3", selected: false },
        { id: 4, label: "Item 4", selected: false },
    ]);

    // Detect Ctrl+A (or Cmd+A on Mac)
    useComboKeyPress({ key: "a", ctrl: true }, (e) => {
        e.preventDefault(); // Prevent native text selection
        setItems((prev) => prev.map((item) => ({ ...item, selected: true })));
    });

    const toggleSelection = (id: number) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item,
            ),
        );
    };

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <h3 className="font-semibold">Select All Shortcut</h3>

            <div className="bg-muted/50 rounded-lg p-2">
                <ul className="space-y-1">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => toggleSelection(item.id)}
                            className={`flex cursor-pointer items-center justify-between rounded px-3 py-2 text-sm transition-colors ${
                                item.selected
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted-foreground/10"
                            }`}
                        >
                            <span>{item.label}</span>
                            {item.selected && <Check className="h-4 w-4" />}
                        </li>
                    ))}
                </ul>
            </div>

            <p className="text-muted-foreground text-center text-xs">
                Press <kbd className="font-mono">Ctrl/Cmd + A</kbd> to select
                all items.
            </p>
        </div>
    );
};
