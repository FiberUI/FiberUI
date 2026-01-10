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
        name: "Card",
        href: "card",
        description: "Container for grouping related content.",
    },
    {
        name: "Checkbox",
        href: "checkbox",
        description: "Checkbox input for boolean selections.",
    },
    {
        name: "Input",
        href: "input",
        description: "Text input field for user data.",
    },
    {
        name: "Label",
        href: "label",
        description: "Accessible label for form controls.",
    },
    {
        name: "Loader",
        href: "loader",
        description: "Loading indicators and spinners.",
    },
    {
        name: "Pagination",
        href: "pagination",
        description: "Navigate through pages of content.",
    },
    {
        name: "Popover",
        href: "popover",
        description: "Floating content panel.",
    },
    {
        name: "Separator",
        href: "separator",
        description: "Visual divider between elements.",
    },
    {
        name: "Skeleton",
        href: "skeleton",
        description: "Placeholder loading states for content.",
    },
    {
        name: "Textarea",
        href: "textarea",
        description: "Multi-line text input field.",
    },
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
