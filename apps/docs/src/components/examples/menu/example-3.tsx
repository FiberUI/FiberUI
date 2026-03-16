"use client";
import {
    MenuTrigger,
    SubmenuTrigger,
    Menu,
    MenuItem,
} from "@repo/ui/components/menu";
import { Button } from "@repo/ui/components/button";

/* SUBMENUS */
export const Example3 = () => {
    return (
        <MenuTrigger>
            <Button variant="outline">Actions</Button>
            <Menu>
                <MenuItem onAction={() => alert("Cut")}>Cut</MenuItem>
                <MenuItem onAction={() => alert("Copy")}>Copy</MenuItem>
                <MenuItem onAction={() => alert("Delete")}>Delete</MenuItem>
                <SubmenuTrigger>
                    <MenuItem>Share</MenuItem>
                    <Menu>
                        <MenuItem onAction={() => alert("SMS")}>SMS</MenuItem>
                        <MenuItem onAction={() => alert("Instagram")}>
                            Instagram
                        </MenuItem>
                        <SubmenuTrigger>
                            <MenuItem>Email</MenuItem>
                            <Menu>
                                <MenuItem onAction={() => alert("Work")}>
                                    Work
                                </MenuItem>
                                <MenuItem onAction={() => alert("Personal")}>
                                    Personal
                                </MenuItem>
                            </Menu>
                        </SubmenuTrigger>
                    </Menu>
                </SubmenuTrigger>
            </Menu>
        </MenuTrigger>
    );
};
