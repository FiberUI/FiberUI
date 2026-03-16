"use client";
import { useState } from "react";
import type { Selection } from "react-aria-components";
import { MenuTrigger, Menu, MenuItem } from "@repo/ui/components/menu";
import { Button } from "@repo/ui/components/button";

/* CONTROLLED SELECTION */
export const Example5 = () => {
    const [selected, setSelected] = useState<Selection>(new Set(["rulers"]));

    return (
        <div className="flex flex-col gap-2">
            <MenuTrigger>
                <Button variant="outline">View</Button>
                <Menu
                    selectionMode="multiple"
                    selectedKeys={selected}
                    onSelectionChange={setSelected}
                >
                    <MenuItem id="grid">Pixel grid</MenuItem>
                    <MenuItem id="rulers">Rulers</MenuItem>
                    <MenuItem id="guides">Layout guides</MenuItem>
                    <MenuItem id="toolbar">Toolbar</MenuItem>
                </Menu>
            </MenuTrigger>
            <p className="text-muted-foreground text-sm">
                Selected:{" "}
                {selected === "all"
                    ? "all"
                    : [...selected].join(", ") || "none"}
            </p>
        </div>
    );
};
