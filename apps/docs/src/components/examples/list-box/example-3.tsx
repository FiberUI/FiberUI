"use client";
import { useState } from "react";
import type { Selection } from "react-aria-components";
import { ListBox, ListBoxItem } from "@repo/ui/components/list-box";

/* MULTIPLE SELECTION */
export const Example3 = () => {
    const [selected, setSelected] = useState<Selection>(
        new Set(["cheese", "ham"]),
    );

    return (
        <div className="flex flex-col gap-2">
            <ListBox
                aria-label="Sandwich contents"
                selectionMode="multiple"
                selectedKeys={selected}
                onSelectionChange={setSelected}
            >
                <ListBoxItem id="lettuce">Lettuce</ListBoxItem>
                <ListBoxItem id="tomato">Tomato</ListBoxItem>
                <ListBoxItem id="cheese">Cheese</ListBoxItem>
                <ListBoxItem id="tuna">Tuna Salad</ListBoxItem>
                <ListBoxItem id="egg">Egg Salad</ListBoxItem>
                <ListBoxItem id="ham">Ham</ListBoxItem>
            </ListBox>
            <p className="text-muted-foreground text-sm">
                Selected:{" "}
                {selected === "all"
                    ? "all"
                    : [...selected].join(", ") || "none"}
            </p>
        </div>
    );
};
