"use client";
import {
    ListBox,
    ListBoxItem,
    DropdownSection,
} from "@repo/ui/components/list-box";

/* SECTIONS WITH HEADERS */
export const Example4 = () => {
    return (
        <ListBox aria-label="Sandwich contents" selectionMode="multiple">
            <DropdownSection title="Veggies" items={undefined}>
                <ListBoxItem id="lettuce">Lettuce</ListBoxItem>
                <ListBoxItem id="tomato">Tomato</ListBoxItem>
                <ListBoxItem id="onion">Onion</ListBoxItem>
            </DropdownSection>
            <DropdownSection title="Protein" items={undefined}>
                <ListBoxItem id="ham">Ham</ListBoxItem>
                <ListBoxItem id="tuna">Tuna</ListBoxItem>
                <ListBoxItem id="tofu">Tofu</ListBoxItem>
            </DropdownSection>
            <DropdownSection title="Condiments" items={undefined}>
                <ListBoxItem id="mayo">Mayonnaise</ListBoxItem>
                <ListBoxItem id="mustard">Mustard</ListBoxItem>
                <ListBoxItem id="ranch">Ranch</ListBoxItem>
            </DropdownSection>
        </ListBox>
    );
};
