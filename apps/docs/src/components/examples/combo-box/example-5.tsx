"use client";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { ComboBox, ComboBoxItem } from "@repo/ui/components/combo-box";

/* ASYNC LOADING EXAMPLE */
const allItems = [
    { id: "react", name: "React" },
    { id: "angular", name: "Angular" },
    { id: "vue", name: "Vue" },
    { id: "svelte", name: "Svelte" },
    { id: "solid", name: "Solid" },
    { id: "next", name: "Next.js" },
    { id: "nuxt", name: "Nuxt" },
    { id: "remix", name: "Remix" },
    { id: "astro", name: "Astro" },
];

export const Example5 = () => {
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState(allItems);

    const onInputChange = (value: string) => {
        setInputValue(value);
        setIsLoading(true);

        // Simulate async search
        setTimeout(() => {
            setItems(
                allItems.filter((item) =>
                    item.name.toLowerCase().includes(value.toLowerCase()),
                ),
            );
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="flex flex-col gap-2">
            <ComboBox
                label="Framework"
                placeholder="Search frameworks..."
                items={items}
                inputValue={inputValue}
                onInputChange={onInputChange}
                allowsEmptyCollection
            >
                {(item) => (
                    <ComboBoxItem id={item.id}>{item.name}</ComboBoxItem>
                )}
            </ComboBox>
            {isLoading && (
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <LoaderIcon className="size-3 animate-spin" />
                    Loading...
                </div>
            )}
        </div>
    );
};
