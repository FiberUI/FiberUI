"use client";
import { useState } from "react";
import { GridList, GridListItem } from "@repo/ui/components/grid-list";
import type { Selection } from "react-aria-components";

/* MULTIPLE SELECTION EXAMPLE */
export const Example3 = () => {
    const [selected, setSelected] = useState<Selection>(
        new Set(["ts", "react"]),
    );

    return (
        <div className="space-y-3">
            <GridList
                aria-label="Select technologies"
                selectionMode="multiple"
                selectedKeys={selected}
                onSelectionChange={setSelected}
                className="w-[300px]"
            >
                <GridListItem id="ts">TypeScript</GridListItem>
                <GridListItem id="react">React</GridListItem>
                <GridListItem id="nextjs">Next.js</GridListItem>
                <GridListItem id="tailwind">Tailwind CSS</GridListItem>
                <GridListItem id="prisma">Prisma</GridListItem>
                <GridListItem id="trpc">tRPC</GridListItem>
            </GridList>
            <p className="text-muted-foreground text-sm">
                Selected ({selected === "all" ? "all" : selected.size}):{" "}
                <span className="text-foreground font-medium">
                    {selected === "all"
                        ? "All"
                        : [...selected].join(", ") || "None"}
                </span>
            </p>
        </div>
    );
};
