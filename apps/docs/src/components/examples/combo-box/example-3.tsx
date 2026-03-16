"use client";
import {
    ComboBox,
    ComboBoxItem,
    ComboBoxSection,
    ComboBoxHeader,
} from "@repo/ui/components/combo-box";
import { Collection } from "react-aria-components";

/* GROUPED/SECTIONED EXAMPLE */
const options = [
    {
        name: "Fruit",
        children: [
            { id: "apple", name: "Apple" },
            { id: "banana", name: "Banana" },
            { id: "orange", name: "Orange" },
            { id: "grapes", name: "Grapes" },
        ],
    },
    {
        name: "Vegetable",
        children: [
            { id: "carrot", name: "Carrot" },
            { id: "broccoli", name: "Broccoli" },
            { id: "spinach", name: "Spinach" },
            { id: "potato", name: "Potato" },
        ],
    },
];

export const Example3 = () => {
    return (
        <ComboBox
            label="Preferred food"
            placeholder="Select a food"
            defaultItems={options}
        >
            {(section) => (
                <ComboBoxSection id={section.name}>
                    <ComboBoxHeader>{section.name}</ComboBoxHeader>
                    <Collection items={section.children}>
                        {(item) => (
                            <ComboBoxItem id={item.id}>
                                {item.name}
                            </ComboBoxItem>
                        )}
                    </Collection>
                </ComboBoxSection>
            )}
        </ComboBox>
    );
};
