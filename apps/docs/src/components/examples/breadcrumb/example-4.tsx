"use client";

import { SimpleBreadcrumb } from "@repo/ui/components/breadcrumb";

export const Example4 = () => {
    const items = [
        { label: "Home", href: "#" },
        { label: "Products", href: "#" },
        { label: "Electronics", href: "#" },
        { label: "Smartphones", href: "#" },
        { label: "iPhone 15 Pro" },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div>
                <p className="text-muted-foreground mb-2 text-sm">
                    Full breadcrumb
                </p>
                <SimpleBreadcrumb items={items} />
            </div>
            <div>
                <p className="text-muted-foreground mb-2 text-sm">
                    Collapsed (maxItems=4)
                </p>
                <SimpleBreadcrumb items={items} maxItems={4} />
            </div>
        </div>
    );
};
