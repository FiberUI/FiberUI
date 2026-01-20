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
            <div className="not-prose grid min-h-96 min-w-80 place-items-center">
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
            <div className="">{children}</div>
        </Tab>
    );
};
