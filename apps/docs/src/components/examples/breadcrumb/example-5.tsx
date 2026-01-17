"use client";

import { SimpleBreadcrumb } from "@repo/ui/components/breadcrumb";
import { HomeIcon, FolderIcon, FileIcon } from "lucide-react";

export const Example5 = () => {
    const items = [
        {
            label: "Home",
            href: "#",
            icon: <HomeIcon className="mr-1.5 size-4" />,
        },
        {
            label: "Documents",
            href: "#",
            icon: <FolderIcon className="mr-1.5 size-4" />,
        },
        {
            label: "Projects",
            href: "#",
            icon: <FolderIcon className="mr-1.5 size-4" />,
        },
        {
            label: "report.pdf",
            icon: <FileIcon className="mr-1.5 size-4" />,
        },
    ];

    return <SimpleBreadcrumb items={items} />;
};
