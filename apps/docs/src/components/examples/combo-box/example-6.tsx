"use client";
import { ComboBox, ComboBoxItem } from "@repo/ui/components/combo-box";

/* DISABLED STATES EXAMPLE */
export const Example6 = () => {
    return (
        <div className="flex flex-col gap-4">
            <ComboBox
                label="Disabled combo box"
                placeholder="Select an option"
                isDisabled
            >
                <ComboBoxItem>Option 1</ComboBoxItem>
                <ComboBoxItem>Option 2</ComboBoxItem>
                <ComboBoxItem>Option 3</ComboBoxItem>
            </ComboBox>

            <ComboBox label="With disabled items" placeholder="Select a color">
                <ComboBoxItem id="red">Red</ComboBoxItem>
                <ComboBoxItem id="green" isDisabled>
                    Green (disabled)
                </ComboBoxItem>
                <ComboBoxItem id="blue">Blue</ComboBoxItem>
                <ComboBoxItem id="yellow" isDisabled>
                    Yellow (disabled)
                </ComboBoxItem>
            </ComboBox>
        </div>
    );
};
