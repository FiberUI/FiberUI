"use client";
import { useState } from "react";
import { GridList, GridListItem } from "@repo/ui/components/grid-list";
import type { Selection } from "react-aria-components";

/* SINGLE SELECTION EXAMPLE */
export const Example2 = () => {
    const [selected, setSelected] = useState<Selection>(new Set(["react"]));

    return (
        <div className="space-y-3">
            <GridList
                aria-label="Select a framework"
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected}
                className="w-[300px]"
            >
                <GridListItem id="react">React</GridListItem>
                <GridListItem id="nextjs">Next.js</GridListItem>
                <GridListItem id="vue">Vue</GridListItem>
                <GridListItem id="svelte">Svelte</GridListItem>
                <GridListItem id="angular">Angular</GridListItem>
            </GridList>
            <p className="text-muted-foreground text-sm">
                Selected:{" "}
                <span className="text-foreground font-medium">
                    {[...selected].join(", ") || "None"}
                </span>
            </p>
        </div>
    );
};
