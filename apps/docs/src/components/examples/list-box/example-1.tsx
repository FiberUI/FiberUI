"use client";
import { ListBox, ListBoxItem } from "@repo/ui/components/list-box";

/* BASIC USAGE */
export const Example1 = () => {
    return (
        <ListBox aria-label="Favorite animal" selectionMode="single">
            <ListBoxItem>Aardvark</ListBoxItem>
            <ListBoxItem>Cat</ListBoxItem>
            <ListBoxItem>Dog</ListBoxItem>
            <ListBoxItem>Kangaroo</ListBoxItem>
            <ListBoxItem>Panda</ListBoxItem>
            <ListBoxItem>Snake</ListBoxItem>
        </ListBox>
    );
};
