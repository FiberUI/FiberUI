"use client";
import { useState } from "react";
import type { Key } from "react-aria-components";
import { ComboBox, ComboBoxItem } from "@repo/ui/components/combo-box";

/* CONTROLLED SELECTION EXAMPLE */
export const Example2 = () => {
    const [animal, setAnimal] = useState<Key | null>("cat");

    return (
        <div className="flex flex-col gap-2">
            <ComboBox
                label="Favorite animal"
                placeholder="Select an animal"
                selectedKey={animal}
                onSelectionChange={setAnimal}
            >
                <ComboBoxItem id="cat">Cat</ComboBoxItem>
                <ComboBoxItem id="dog">Dog</ComboBoxItem>
                <ComboBoxItem id="koala">Koala</ComboBoxItem>
                <ComboBoxItem id="kangaroo">Kangaroo</ComboBoxItem>
                <ComboBoxItem id="panda">Panda</ComboBoxItem>
            </ComboBox>
            <p className="text-muted-foreground text-sm">
                Selected: {animal ?? "none"}
            </p>
        </div>
    );
};
