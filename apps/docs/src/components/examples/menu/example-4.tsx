"use client";
import {
    MenuTrigger,
    Menu,
    MenuItem,
    MenuSeparator,
} from "@repo/ui/components/menu";
import { Button } from "@repo/ui/components/button";

/* SEPARATORS */
export const Example4 = () => {
    return (
        <MenuTrigger>
            <Button variant="outline">File</Button>
            <Menu>
                <MenuItem onAction={() => alert("New")}>New…</MenuItem>
                <MenuItem onAction={() => alert("Open")}>Open…</MenuItem>
                <MenuSeparator />
                <MenuItem onAction={() => alert("Save")}>Save</MenuItem>
                <MenuItem onAction={() => alert("Save As")}>Save as…</MenuItem>
                <MenuItem onAction={() => alert("Rename")}>Rename…</MenuItem>
                <MenuSeparator />
                <MenuItem onAction={() => alert("Page Setup")}>
                    Page setup…
                </MenuItem>
                <MenuItem onAction={() => alert("Print")}>Print…</MenuItem>
            </Menu>
        </MenuTrigger>
    );
};
