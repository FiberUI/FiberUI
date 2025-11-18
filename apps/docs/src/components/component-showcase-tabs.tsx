"use client";

import { Code, Eye } from "lucide-react";
import { Tab, Tabs } from "./tabs";

interface ComponentShowcaseTabsProps {
    children: React.ReactNode;
}

export const ComponentShowcaseTabs: React.FC<ComponentShowcaseTabsProps> = ({
    children,
}) => {
    return (
        <Tabs
            items={["Preview", "Code"]}
            iconList={[<Eye key={1} />, <Code key={2} />]}
        >
            {children}
        </Tabs>
    );
};

interface ComponentPreviewTabProps {
    children: React.ReactNode;
}

export const ComponentPreviewTab: React.FC<ComponentPreviewTabProps> = ({
    children,
}) => {
    return (
        <Tab asChild value="Preview">
            <div className="no-prose! grid min-h-96 min-w-80 place-content-center">
                {children}
            </div>
        </Tab>
    );
};

interface ComponentCodeTabProps {
    children: React.ReactNode;
}

export const ComponentCodeTab: React.FC<ComponentCodeTabProps> = ({
    children,
}) => {
    return (
        <Tab asChild value="Code">
            <div className="bg-zinc-50 dark:bg-zinc-800/75">{children}</div>
        </Tab>
    );
};
