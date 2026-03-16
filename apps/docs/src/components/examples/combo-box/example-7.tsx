"use client";
import { ComboBox, ComboBoxItem } from "@repo/ui/components/combo-box";

/* FORM INTEGRATION WITH DESCRIPTION */
export const Example7 = () => {
    return (
        <ComboBox
            label="Country"
            placeholder="e.g. United States"
            name="country"
            isRequired
            description="Please select your country of residence."
        >
            <ComboBoxItem id="us">United States</ComboBoxItem>
            <ComboBoxItem id="uk">United Kingdom</ComboBoxItem>
            <ComboBoxItem id="ca">Canada</ComboBoxItem>
            <ComboBoxItem id="au">Australia</ComboBoxItem>
            <ComboBoxItem id="de">Germany</ComboBoxItem>
            <ComboBoxItem id="jp">Japan</ComboBoxItem>
        </ComboBox>
    );
};
