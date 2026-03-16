"use client";
import { MenuTrigger, Menu, MenuItem } from "@repo/ui/components/menu";
import { Button } from "@repo/ui/components/button";

/* BASIC MENU */
export const Example1 = () => {
    return (
        <MenuTrigger>
            <Button variant="outline">Actions</Button>
            <Menu>
                <MenuItem onAction={() => alert("New file")}>
                    New file…
                </MenuItem>
                <MenuItem onAction={() => alert("Open")}>Open…</MenuItem>
                <MenuItem onAction={() => alert("Save")}>Save</MenuItem>
                <MenuItem onAction={() => alert("Save As")}>Save as…</MenuItem>
                <MenuItem onAction={() => alert("Print")}>Print…</MenuItem>
            </Menu>
        </MenuTrigger>
    );
};
