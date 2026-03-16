"use client";
import {
    MenuTrigger,
    Menu,
    MenuItem,
    MenuSection,
} from "@repo/ui/components/menu";
import { Button } from "@repo/ui/components/button";

/* SECTIONS WITH HEADERS */
export const Example2 = () => {
    return (
        <MenuTrigger>
            <Button variant="outline">Publish</Button>
            <Menu>
                <MenuSection title="Export">
                    <MenuItem id="image">Image…</MenuItem>
                    <MenuItem id="video">Video…</MenuItem>
                    <MenuItem id="text">Text…</MenuItem>
                </MenuSection>
                <MenuSection title="Share">
                    <MenuItem id="youtube">YouTube…</MenuItem>
                    <MenuItem id="instagram">Instagram…</MenuItem>
                    <MenuItem id="email">Email…</MenuItem>
                </MenuSection>
            </Menu>
        </MenuTrigger>
    );
};
