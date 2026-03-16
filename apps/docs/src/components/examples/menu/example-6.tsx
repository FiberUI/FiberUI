"use client";
import { MenuTrigger, Menu, MenuItem } from "@repo/ui/components/menu";
import { Button } from "@repo/ui/components/button";

/* DISABLED ITEMS */
export const Example6 = () => {
    return (
        <MenuTrigger>
            <Button variant="outline">Permissions</Button>
            <Menu>
                <MenuItem id="read">Read</MenuItem>
                <MenuItem id="write">Write</MenuItem>
                <MenuItem id="admin" isDisabled>
                    Admin (restricted)
                </MenuItem>
                <MenuItem id="delete" isDisabled>
                    Delete (restricted)
                </MenuItem>
                <MenuItem id="comment">Comment</MenuItem>
            </Menu>
        </MenuTrigger>
    );
};
