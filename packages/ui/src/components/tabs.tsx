"use client";

import {
    Tabs as AriaTabs,
    TabList as AriaTabList,
    Tab as AriaTab,
    TabPanel as AriaTabPanel,
    composeRenderProps,
    type TabsProps as AriaTabsProps,
    type TabListProps as AriaTabListProps,
    type TabProps as AriaTabProps,
    type TabPanelProps as AriaTabPanelProps,
} from "react-aria-components";
import { cn, tv } from "tailwind-variants";
import { focusRing } from "@repo/ui/lib/utils";

/* -----------------------------------------------------------------------------
 * Tabs (Root)
 * ---------------------------------------------------------------------------*/

interface TabsProps extends AriaTabsProps {}

const tabsStyles = tv({
    base: "flex gap-2 font-sans",
    variants: {
        orientation: {
            horizontal: "flex-col",
            vertical: "flex-row",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

export const Tabs = ({ className, ...props }: TabsProps) => {
    return (
        <AriaTabs
            data-slot="tabs"
            className={composeRenderProps(className, (className, renderProps) =>
                tabsStyles({ ...renderProps, className }),
            )}
            {...props}
        />
    );
};

/* -----------------------------------------------------------------------------
 * TabList
 * ---------------------------------------------------------------------------*/

interface TabListProps<T extends object> extends AriaTabListProps<T> {}

const tabListStyles = tv({
    base: "bg-muted text-muted-foreground inline-flex w-fit items-center justify-center rounded-lg p-1",
    variants: {
        orientation: {
            horizontal: "h-9 flex-row",
            vertical: "flex-col items-start",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

export const TabList = <T extends object>({
    className,
    ...props
}: TabListProps<T>) => {
    return (
        <AriaTabList
            data-slot="tab-list"
            className={composeRenderProps(className, (className, renderProps) =>
                tabListStyles({ ...renderProps, className }),
            )}
            {...props}
        />
    );
};

/* -----------------------------------------------------------------------------
 * Tab (Trigger)
 * ---------------------------------------------------------------------------*/

interface TabProps extends AriaTabProps {}

const tabStyles = tv({
    extend: focusRing,
    base: [
        "inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-3 py-1 text-sm font-medium transition-[color,box-shadow]",
        "text-foreground dark:text-muted-foreground",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    ],
    variants: {
        isSelected: {
            true: [
                "bg-background text-foreground shadow-sm",
                "dark:bg-input/30 dark:text-foreground dark:border-input",
            ],
            false: "hover:text-foreground hover:bg-background/50",
        },
        isDisabled: {
            true: "pointer-events-none opacity-50",
        },
    },
    defaultVariants: {
        isSelected: false,
    },
});

export const Tab = ({ className, ...props }: TabProps) => {
    return (
        <AriaTab
            data-slot="tab-trigger"
            className={composeRenderProps(
                cn("cursor-default", className),
                (className, renderProps) =>
                    tabStyles({ ...renderProps, className }),
            )}
            {...props}
        />
    );
};

/* -----------------------------------------------------------------------------
 * TabPanel (Content)
 * ---------------------------------------------------------------------------*/

interface TabPanelProps extends AriaTabPanelProps {}

const tabPanelStyles = tv({
    extend: focusRing,
    base: "text-foreground flex-1 p-4 text-sm outline-none",
});

export const TabPanel = ({ className, ...props }: TabPanelProps) => {
    return (
        <AriaTabPanel
            data-slot="tab-panel"
            className={composeRenderProps(className, (className, renderProps) =>
                tabPanelStyles({ ...renderProps, className }),
            )}
            {...props}
        />
    );
};
