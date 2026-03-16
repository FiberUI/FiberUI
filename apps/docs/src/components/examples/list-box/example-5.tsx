"use client";
import { ListBox, ListBoxItem } from "@repo/ui/components/list-box";

/* DISABLED ITEMS */
export const Example5 = () => {
    return (
        <ListBox
            aria-label="Permissions"
            selectionMode="single"
            disabledKeys={["admin", "delete"]}
        >
            <ListBoxItem id="read">Read</ListBoxItem>
            <ListBoxItem id="write">Write</ListBoxItem>
            <ListBoxItem id="admin">Admin (restricted)</ListBoxItem>
            <ListBoxItem id="delete">Delete (restricted)</ListBoxItem>
            <ListBoxItem id="comment">Comment</ListBoxItem>
        </ListBox>
    );
};
