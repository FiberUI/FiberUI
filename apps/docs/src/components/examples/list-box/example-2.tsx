"use client";
import { useState } from "react";
import type { Selection } from "react-aria-components";
import { ListBox, ListBoxItem } from "@repo/ui/components/list-box";

/* CONTROLLED SINGLE SELECTION */
export const Example2 = () => {
    const [selected, setSelected] = useState<Selection>(new Set(["cat"]));

    return (
        <div className="flex flex-col gap-2">
            <ListBox
                aria-label="Favorite animal"
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected}
            >
                <ListBoxItem id="aardvark">Aardvark</ListBoxItem>
                <ListBoxItem id="cat">Cat</ListBoxItem>
                <ListBoxItem id="dog">Dog</ListBoxItem>
                <ListBoxItem id="kangaroo">Kangaroo</ListBoxItem>
                <ListBoxItem id="panda">Panda</ListBoxItem>
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
