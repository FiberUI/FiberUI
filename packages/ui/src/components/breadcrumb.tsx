"use client";

import { forwardRef, Fragment } from "react";
import { cn } from "@repo/ui/lib/utils";
import { Slot } from "@repo/ui/components/slot";
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

interface BreadcrumbProps extends React.ComponentProps<"nav"> {
    /** Separator between items */
    separator?: React.ReactNode;
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
    ({ className, ...props }, ref) => {
        return (
            <nav
                ref={ref}
                aria-label="Breadcrumb"
                className={className}
                {...props}
            />
        );
    },
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = forwardRef<HTMLOListElement, React.ComponentProps<"ol">>(
    ({ className, ...props }, ref) => {
        return (
            <ol
                ref={ref}
                className={cn(
                    "text-muted-foreground wrap-break-word flex list-none flex-wrap items-center gap-1.5 text-sm sm:gap-2.5",
                    className,
                )}
                {...props}
            />
        );
    },
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
    ({ className, ...props }, ref) => {
        return (
            <li
                ref={ref}
                className={cn("inline-flex items-center gap-1.5", className)}
                {...props}
            />
        );
    },
);
BreadcrumbItem.displayName = "BreadcrumbItem";

interface BreadcrumbLinkProps extends React.ComponentProps<"a"> {
    asChild?: boolean;
}

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
    ({ asChild, className, children, ...props }, ref) => {
        const linkClassName = cn(
            "hover:text-foreground cursor-pointer transition-colors",
            className,
        );

        const Comp = asChild ? Slot : "a";
        return (
            <Comp ref={ref} className={linkClassName} {...props}>
                {children}
            </Comp>
        );
    },
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = forwardRef<
    HTMLSpanElement,
    React.ComponentProps<"span">
>(({ className, ...props }, ref) => {
    return (
        <span
            ref={ref}
            role="link"
            aria-disabled="true"
            aria-current="page"
            className={cn("text-foreground font-medium", className)}
            {...props}
        />
    );
});
BreadcrumbPage.displayName = "BreadcrumbPage";

interface BreadcrumbSeparatorProps extends React.ComponentProps<"li"> {
    children?: React.ReactNode;
}

const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <li
                ref={ref}
                role="presentation"
                aria-hidden="true"
                className={cn("[&>svg]:size-3.5", className)}
                {...props}
            >
                {children ?? <ChevronRightIcon />}
            </li>
        );
    },
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

interface BreadcrumbEllipsisProps extends React.ComponentProps<"span"> {
    onClick?: () => void;
}

const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
    ({ className, onClick, ...props }, ref) => {
        const isClickable = !!onClick;

        if (isClickable) {
            return (
                <button
                    type="button"
                    onClick={onClick}
                    className={cn(
                        "flex size-9 items-center justify-center rounded-md",
                        "hover:bg-accent hover:text-accent-foreground transition-colors",
                        "cursor-pointer",
                        className,
                    )}
                    aria-label="Show more breadcrumbs"
                >
                    <MoreHorizontalIcon className="size-4" />
                    <span className="sr-only">More</span>
                </button>
            );
        }

        return (
            <span
                ref={ref}
                role="presentation"
                aria-hidden="true"
                className={cn(
                    "flex size-9 items-center justify-center",
                    className,
                )}
                {...props}
            >
                <MoreHorizontalIcon className="size-4" />
                <span className="sr-only">More</span>
            </span>
        );
    },
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export interface BreadcrumbItemData {
    label: string;
    href?: string;
    icon?: React.ReactNode;
}

interface SimpleBreadcrumbProps extends Omit<BreadcrumbProps, "children"> {
    items: BreadcrumbItemData[];
    separator?: React.ReactNode;
    maxItems?: number;
    itemsBeforeCollapse?: number;
    itemsAfterCollapse?: number;
    onExpandClick?: () => void;
}

const SimpleBreadcrumb = forwardRef<HTMLElement, SimpleBreadcrumbProps>(
    (
        {
            items,
            separator,
            maxItems,
            itemsBeforeCollapse = 1,
            itemsAfterCollapse = 2,
            onExpandClick,
            className,
            ...props
        },
        ref,
    ) => {
        const shouldCollapse = maxItems && items.length > maxItems;

        let displayItems = items;
        if (shouldCollapse) {
            const before = items.slice(0, itemsBeforeCollapse);
            const after = items.slice(-itemsAfterCollapse);
            displayItems = [
                ...before,
                { label: "...", href: undefined },
                ...after,
            ];
        }

        return (
            <Breadcrumb ref={ref} className={className} {...props}>
                <BreadcrumbList>
                    {displayItems.map((item, index) => {
                        const isLast = index === displayItems.length - 1;
                        const isEllipsis = item.label === "...";

                        return (
                            <Fragment key={`${item.label}-${index}`}>
                                <BreadcrumbItem>
                                    {isEllipsis ? (
                                        <BreadcrumbEllipsis
                                            onClick={onExpandClick}
                                        />
                                    ) : isLast ? (
                                        <BreadcrumbPage>
                                            {item.icon}
                                            {item.label}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={item.href}>
                                            {item.icon}
                                            {item.label}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && (
                                    <BreadcrumbSeparator>
                                        {separator}
                                    </BreadcrumbSeparator>
                                )}
                            </Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        );
    },
);
SimpleBreadcrumb.displayName = "SimpleBreadcrumb";

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
    SimpleBreadcrumb,
};
