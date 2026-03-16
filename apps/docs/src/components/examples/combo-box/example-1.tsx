"use client";
import { ComboBox, ComboBoxItem } from "@repo/ui/components/combo-box";

/* BASIC EXAMPLE */
export const Example1 = () => {
    return (
        <ComboBox label="Favorite fruit" placeholder="Select a fruit">
            <ComboBoxItem>Apple</ComboBoxItem>
            <ComboBoxItem>Banana</ComboBoxItem>
            <ComboBoxItem>Orange</ComboBoxItem>
            <ComboBoxItem>Strawberry</ComboBoxItem>
            <ComboBoxItem>Mango</ComboBoxItem>
            <ComboBoxItem>Grape</ComboBoxItem>
        </ComboBox>
    );
};
