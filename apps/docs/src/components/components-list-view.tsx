"use client";

import Link from "next/link";

type ComponentItem = {
    name: string;
    href: string;
    description: string;
};

const COMPONENTS_LIST = [
    {
        name: "Button",
        href: "button",
        description: "Buttons to trigger user actions.",
    },
    {
        name: "Input",
        href: "input",
        description: "input field",
    },
    {
        name: "Label",
        href: "label",
        description: "label component optimized for a11y",
    },
    {
        name: "Loader",
        href: "loader",
        description: "loading indicators",
    },
    {
        name: "Popover",
        href: "popover",
        description: "popover component",
    },
    {
        name: "Separator",
        href: "separator",
        description: "visual elements to separate",
    },
    // {
    //     name: "Modal",
    //     href: "modal",
    //     description: "Overlays for dialogs and prompts.",
    // },
    // {
    //     name: "Select",
    //     href: "select",
    //     description: "Dropdown selector component.",
    // },
    // {
    //     name: "Card",
    //     href: "card",
    //     description: "Cards for grouping UI content.",
    // },
    // {
    //     name: "Avatar",
    //     href: "avatar",
    //     description: "Profile and image avatars.",
    // },
    // {
    //     name: "Tabs",
    //     href: "tabs",
    //     description: "Tabbed navigation views.",
    // },
].toSorted((a, b) => a.name.localeCompare(b.name));

export const ComponentsListView = () => {
    return <ComponentGrid components={COMPONENTS_LIST} />;
};

const ComponentGrid = ({ components }: { components: ComponentItem[] }) => {
    return (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
            {components.map((item) => (
                <Link
                    key={item.name}
                    href={`/docs/components/${item.href}`}
                    className="text-fd-foreground hover:border-fd-border group rounded-lg border-2 border-transparent px-5 py-4 text-xl no-underline transition-colors duration-300"
                >
                    <span>{item.name}</span>
                    <br />
                    <span className="group-hover:text-fd-accent-foreground/75 text-sm font-normal text-transparent transition-colors duration-300">
                        {item.description}
                    </span>
                </Link>
            ))}
        </div>
    );
};
