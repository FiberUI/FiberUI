"use client";

import React, {
    forwardRef,
    useRef,
    useCallback,
    useMemo,
    useState,
} from "react";
import {
    AriaButtonProps,
    useButton,
    useFocusRing,
    mergeProps,
} from "react-aria";
import { cn } from "@repo/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    MoreHorizontalIcon,
} from "lucide-react";
import { Slot } from "@repo/ui/components/slot";

export interface PaginationState {
    /** Total number of items */
    totalItems: number;
    /** Number of items per page */
    itemsPerPage: number;
    /** Current page (1-indexed) */
    currentPage: number;
}

export interface UsePaginationProps {
    /** Total number of items */
    totalItems: number;
    /** Number of items per page */
    itemsPerPage?: number;
    /** Initial page (1-indexed) */
    initialPage?: number;
    /** Maximum number of visible page buttons */
    siblingCount?: number;
    /** Callback when page changes */
    onPageChange?: (page: number) => void;
    /** Callback when items per page changes */
    onItemsPerPageChange?: (itemsPerPage: number) => void;
}

export interface UsePaginationReturn {
    /** Current page (1-indexed) */
    currentPage: number;
    /** Total number of pages */
    totalPages: number;
    /** Items per page */
    itemsPerPage: number;
    /** Whether there's a previous page */
    hasPreviousPage: boolean;
    /** Whether there's a next page */
    hasNextPage: boolean;
    /** Go to a specific page */
    goToPage: (page: number) => void;
    /** Go to the next page */
    nextPage: () => void;
    /** Go to the previous page */
    previousPage: () => void;
    /** Go to the first page */
    firstPage: () => void;
    /** Go to the last page */
    lastPage: () => void;
    /** Set items per page */
    setItemsPerPage: (count: number) => void;
    /** Array of page numbers/ellipsis to render */
    pageRange: (number | "ellipsis")[];
    /** Start index of current page items (0-indexed) */
    startIndex: number;
    /** End index of current page items (0-indexed, exclusive) */
    endIndex: number;
}

export function usePagination({
    totalItems,
    itemsPerPage: initialItemsPerPage = 10,
    initialPage = 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    siblingCount = 1,
    onPageChange,
    onItemsPerPageChange,
}: UsePaginationProps): UsePaginationReturn {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage);

    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
    if (validCurrentPage !== currentPage) {
        setCurrentPage(validCurrentPage);
    }

    const hasPreviousPage = validCurrentPage > 1;
    const hasNextPage = validCurrentPage < totalPages;

    const goToPage = useCallback(
        (page: number) => {
            const newPage = Math.min(Math.max(1, page), totalPages);
            if (newPage !== currentPage) {
                setCurrentPage(newPage);
                onPageChange?.(newPage);
            }
        },
        [currentPage, totalPages, onPageChange],
    );

    const nextPage = useCallback(() => {
        if (hasNextPage) goToPage(currentPage + 1);
    }, [hasNextPage, currentPage, goToPage]);

    const previousPage = useCallback(() => {
        if (hasPreviousPage) goToPage(currentPage - 1);
    }, [hasPreviousPage, currentPage, goToPage]);

    const firstPage = useCallback(() => goToPage(1), [goToPage]);

    const lastPage = useCallback(
        () => goToPage(totalPages),
        [goToPage, totalPages],
    );

    const setItemsPerPage = useCallback(
        (count: number) => {
            setItemsPerPageState(count);
            setCurrentPage(1);
            onItemsPerPageChange?.(count);
            onPageChange?.(1);
        },
        [onItemsPerPageChange, onPageChange],
    );

    const pageRange = useMemo((): (number | "ellipsis")[] => {
        const minPagesToShowEllipsis = 7;

        if (totalPages <= minPagesToShowEllipsis) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const first = 1;
        const last = totalPages;
        const center = validCurrentPage;
        const minCenter = 4;
        const maxCenter = totalPages - 3;

        if (center < minCenter) {
            return [1, 2, 3, 4, 5, "ellipsis", totalPages];
        }

        if (center > maxCenter) {
            return [
                1,
                "ellipsis",
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        return [
            first,
            "ellipsis",
            center - 1,
            center,
            center + 1,
            "ellipsis",
            last,
        ];
    }, [totalPages, validCurrentPage]);

    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return {
        currentPage: validCurrentPage,
        totalPages,
        itemsPerPage,
        hasPreviousPage,
        hasNextPage,
        goToPage,
        nextPage,
        previousPage,
        firstPage,
        lastPage,
        setItemsPerPage,
        pageRange,
        startIndex,
        endIndex,
    };
}

const paginationButtonVariants = cva(
    cn(
        "inline-flex items-center justify-center rounded-lg text-sm font-medium",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "cursor-pointer select-none",
    ),
    {
        variants: {
            variant: {
                default:
                    "bg-transparent hover:bg-accent hover:text-accent-foreground",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                active: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
            },
            size: {
                default: "h-9 min-w-9 px-3",
                sm: "h-8 min-w-8 px-2 text-xs",
                lg: "h-10 min-w-10 px-4",
                icon: "h-9 w-9",
                "icon-sm": "h-8 w-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

interface PaginationProps extends React.ComponentProps<"nav"> {
    "aria-label"?: string;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
    ({ className, "aria-label": ariaLabel = "Pagination", ...props }, ref) => {
        return (
            <nav
                ref={ref}
                role="navigation"
                aria-label={ariaLabel}
                data-slot="pagination"
                className={cn("mx-auto flex w-full justify-center", className)}
                {...props}
            />
        );
    },
);
Pagination.displayName = "Pagination";

export const PaginationContent = forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => {
    return (
        <ul
            ref={ref}
            data-slot="pagination-content"
            className={cn(
                "flex shrink-0 list-none flex-row flex-wrap items-center gap-1",
                className,
            )}
            {...props}
        />
    );
});
PaginationContent.displayName = "PaginationContent";

export const PaginationItem = forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => {
    return (
        <li
            ref={ref}
            data-slot="pagination-item"
            className={cn("list-none", className)}
            {...props}
        />
    );
});
PaginationItem.displayName = "PaginationItem";

interface PaginationButtonProps
    extends Omit<AriaButtonProps<"button">, "elementType">,
        VariantProps<typeof paginationButtonVariants> {
    className?: string;
    children?: React.ReactNode;
    asChild?: boolean;
}

export const PaginationButton = forwardRef<
    HTMLButtonElement,
    PaginationButtonProps
>(
    (
        { variant, size, className, children, asChild = false, ...props },
        forwardedRef,
    ) => {
        const internalRef = useRef<HTMLButtonElement | null>(null);

        const mergedRef = (node: HTMLButtonElement | null) => {
            internalRef.current = node;
            if (typeof forwardedRef === "function") {
                forwardedRef(node);
            } else if (forwardedRef) {
                forwardedRef.current = node;
            }
        };

        const { buttonProps, isPressed } = useButton(props, internalRef);
        const { focusProps, isFocusVisible } = useFocusRing();

        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                {...mergeProps(buttonProps, focusProps)}
                ref={mergedRef}
                className={cn(
                    paginationButtonVariants({ variant, size }),
                    isFocusVisible && "ring-ring ring-2 ring-offset-2",
                    className,
                )}
                data-pressed={isPressed ? "true" : undefined}
            >
                {children}
            </Comp>
        );
    },
);
PaginationButton.displayName = "PaginationButton";

interface PaginationLinkProps extends Omit<PaginationButtonProps, "variant"> {
    isActive?: boolean;
    page: number;
}

export const PaginationLink = forwardRef<
    HTMLButtonElement,
    PaginationLinkProps
>(({ isActive, page, className, children, ...props }, ref) => {
    return (
        <PaginationButton
            ref={ref}
            variant={isActive ? "active" : "ghost"}
            aria-current={isActive ? "page" : undefined}
            aria-label={`Page ${page}`}
            data-active={isActive}
            className={className}
            {...props}
        >
            {children ?? page}
        </PaginationButton>
    );
});
PaginationLink.displayName = "PaginationLink";

interface PaginationPreviousProps extends PaginationButtonProps {
    showLabel?: boolean;
    label?: string;
}

export const PaginationPrevious = forwardRef<
    HTMLButtonElement,
    PaginationPreviousProps
>(
    (
        { showLabel = true, label = "Previous", className, children, ...props },
        ref,
    ) => {
        return (
            <PaginationButton
                ref={ref}
                aria-label="Go to previous page"
                variant="ghost"
                size={showLabel ? "default" : "icon"}
                className={cn("gap-1", showLabel && "px-2.5", className)}
                {...props}
            >
                {children ?? (
                    <>
                        <ChevronLeftIcon className="h-4 w-4" />
                        {showLabel && (
                            <span className="hidden sm:inline">{label}</span>
                        )}
                    </>
                )}
            </PaginationButton>
        );
    },
);
PaginationPrevious.displayName = "PaginationPrevious";

interface PaginationNextProps extends PaginationButtonProps {
    showLabel?: boolean;
    label?: string;
}

export const PaginationNext = forwardRef<
    HTMLButtonElement,
    PaginationNextProps
>(
    (
        { showLabel = true, label = "Next", className, children, ...props },
        ref,
    ) => {
        return (
            <PaginationButton
                ref={ref}
                aria-label="Go to next page"
                variant="ghost"
                size={showLabel ? "default" : "icon"}
                className={cn("gap-1", showLabel && "px-2.5", className)}
                {...props}
            >
                {children ?? (
                    <>
                        {showLabel && (
                            <span className="hidden sm:inline">{label}</span>
                        )}
                        <ChevronRightIcon className="h-4 w-4" />
                    </>
                )}
            </PaginationButton>
        );
    },
);
PaginationNext.displayName = "PaginationNext";

interface PaginationFirstProps extends PaginationButtonProps {
    showLabel?: boolean;
    label?: string;
}

export const PaginationFirst = forwardRef<
    HTMLButtonElement,
    PaginationFirstProps
>(
    (
        { showLabel = false, label = "First", className, children, ...props },
        ref,
    ) => {
        return (
            <PaginationButton
                ref={ref}
                aria-label="Go to first page"
                variant="ghost"
                size={showLabel ? "default" : "icon"}
                className={cn("gap-1", className)}
                {...props}
            >
                {children ?? (
                    <>
                        <ChevronsLeftIcon className="h-4 w-4" />
                        {showLabel && (
                            <span className="hidden sm:inline">{label}</span>
                        )}
                    </>
                )}
            </PaginationButton>
        );
    },
);
PaginationFirst.displayName = "PaginationFirst";

interface PaginationLastProps extends PaginationButtonProps {
    showLabel?: boolean;
    label?: string;
}

export const PaginationLast = forwardRef<
    HTMLButtonElement,
    PaginationLastProps
>(
    (
        { showLabel = false, label = "Last", className, children, ...props },
        ref,
    ) => {
        return (
            <PaginationButton
                ref={ref}
                aria-label="Go to last page"
                variant="ghost"
                size={showLabel ? "default" : "icon"}
                className={cn("gap-1", className)}
                {...props}
            >
                {children ?? (
                    <>
                        {showLabel && (
                            <span className="hidden sm:inline">{label}</span>
                        )}
                        <ChevronsRightIcon className="h-4 w-4" />
                    </>
                )}
            </PaginationButton>
        );
    },
);
PaginationLast.displayName = "PaginationLast";

interface PaginationEllipsisProps extends React.ComponentProps<"span"> {
    onJump?: () => void;
}

export const PaginationEllipsis = forwardRef<
    HTMLSpanElement,
    PaginationEllipsisProps
>(({ className, onJump, ...props }, ref) => {
    const isClickable = !!onJump;

    if (isClickable) {
        return (
            <button
                type="button"
                onClick={onJump}
                className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    "hover:bg-accent hover:text-accent-foreground",
                    "cursor-pointer",
                    className,
                )}
                aria-label="Jump to page"
            >
                <MoreHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">More pages</span>
            </button>
        );
    }

    return (
        <span
            ref={ref}
            aria-hidden
            data-slot="pagination-ellipsis"
            className={cn(
                "flex h-9 w-9 items-center justify-center",
                className,
            )}
            {...props}
        >
            <MoreHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">More pages</span>
        </span>
    );
});
PaginationEllipsis.displayName = "PaginationEllipsis";

interface PaginationInfoProps extends React.ComponentProps<"div"> {
    currentPage: number;
    totalPages: number;
    totalItems?: number;
    startIndex?: number;
    endIndex?: number;
    showItemRange?: boolean;
}

export const PaginationInfo = forwardRef<HTMLDivElement, PaginationInfoProps>(
    (
        {
            currentPage,
            totalPages,
            totalItems,
            startIndex,
            endIndex,
            showItemRange = false,
            className,
            ...props
        },
        ref,
    ) => {
        return (
            <div
                ref={ref}
                data-slot="pagination-info"
                className={cn(
                    "text-muted-foreground min-w-[180px] text-sm tabular-nums",
                    className,
                )}
                {...props}
            >
                {showItemRange &&
                totalItems !== undefined &&
                startIndex !== undefined &&
                endIndex !== undefined ? (
                    <span>
                        Showing{" "}
                        <span className="text-foreground font-medium">
                            {startIndex + 1}
                        </span>
                        {" - "}
                        <span className="text-foreground font-medium">
                            {endIndex}
                        </span>
                        {" of "}
                        <span className="text-foreground font-medium">
                            {totalItems}
                        </span>
                    </span>
                ) : (
                    <span>
                        Page{" "}
                        <span className="text-foreground font-medium">
                            {currentPage}
                        </span>
                        {" of "}
                        <span className="text-foreground font-medium">
                            {totalPages}
                        </span>
                    </span>
                )}
            </div>
        );
    },
);
PaginationInfo.displayName = "PaginationInfo";

interface PaginationJumpProps
    extends Omit<React.ComponentProps<"div">, "onChange"> {
    totalPages: number;
    onJump: (page: number) => void;
    label?: string;
    placeholder?: string;
}

export const PaginationJump = forwardRef<HTMLDivElement, PaginationJumpProps>(
    (
        {
            totalPages,
            onJump,
            label = "Go to",
            placeholder,
            className,
            ...props
        },
        ref,
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const [inputValue, setInputValue] = useState("");

        const handleSubmit = useCallback(
            (e: React.FormEvent) => {
                e.preventDefault();
                const page = parseInt(inputValue, 10);
                if (!isNaN(page) && page >= 1 && page <= totalPages) {
                    onJump(page);
                    setInputValue("");
                    inputRef.current?.blur();
                }
            },
            [inputValue, totalPages, onJump],
        );

        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                    handleSubmit(e);
                } else if (e.key === "Escape") {
                    setInputValue("");
                    inputRef.current?.blur();
                }
            },
            [handleSubmit],
        );

        return (
            <div
                ref={ref}
                data-slot="pagination-jump"
                className={cn("flex items-center gap-2 text-sm", className)}
                {...props}
            >
                <label
                    htmlFor="pagination-jump-input"
                    className="text-muted-foreground whitespace-nowrap"
                >
                    {label}
                </label>
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-1"
                >
                    <input
                        ref={inputRef}
                        id="pagination-jump-input"
                        type="number"
                        min={1}
                        max={totalPages}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder ?? `1-${totalPages}`}
                        className={cn(
                            "border-input bg-background h-8 w-16 rounded-md border px-2 text-center text-sm",
                            "placeholder:text-muted-foreground",
                            "focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                        )}
                        aria-label={`Jump to page, enter a number between 1 and ${totalPages}`}
                    />
                    <PaginationButton
                        type="submit"
                        size="sm"
                        variant="outline"
                        className="hidden sm:inline-flex"
                    >
                        Go
                    </PaginationButton>
                </form>
            </div>
        );
    },
);
PaginationJump.displayName = "PaginationJump";

interface PaginationPerPageProps
    extends Omit<React.ComponentProps<"div">, "onChange"> {
    value: number;
    options?: number[];
    onChange: (value: number) => void;
    label?: string;
}

export const PaginationPerPage = forwardRef<
    HTMLDivElement,
    PaginationPerPageProps
>(
    (
        {
            value,
            options = [10, 20, 50, 100],
            onChange,
            label = "Items per page",
            className,
            ...props
        },
        ref,
    ) => {
        return (
            <div
                ref={ref}
                data-slot="pagination-per-page"
                className={cn("flex items-center gap-2 text-sm", className)}
                {...props}
            >
                <label
                    htmlFor="pagination-per-page-select"
                    className="text-muted-foreground whitespace-nowrap"
                >
                    {label}
                </label>
                <select
                    id="pagination-per-page-select"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className={cn(
                        "border-input bg-background h-8 rounded-md border px-2 text-sm",
                        "focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                        "cursor-pointer",
                    )}
                    aria-label="Select number of items per page"
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    },
);
PaginationPerPage.displayName = "PaginationPerPage";

export interface FullPaginationProps
    extends Omit<React.ComponentProps<"nav">, "onChange"> {
    /** Pagination state from usePagination hook, or controlled props */
    pagination: UsePaginationReturn;
    /** Show first/last page buttons */
    showFirstLast?: boolean;
    /** Show previous/next buttons */
    showPrevNext?: boolean;
    /** Show page numbers */
    showPageNumbers?: boolean;
    /** Show page info (e.g., "Page 1 of 10") */
    showInfo?: boolean;
    /** Show item range instead of page info */
    showItemRange?: boolean;
    /** Show jump to page input */
    showJump?: boolean;
    /** Show items per page selector */
    showPerPage?: boolean;
    /** Items per page options */
    perPageOptions?: number[];
    /** Size variant */
    size?: "default" | "sm" | "lg";
    /** Labels for i18n */
    labels?: {
        previous?: string;
        next?: string;
        first?: string;
        last?: string;
        goTo?: string;
        perPage?: string;
    };
}

export const FullPagination = forwardRef<HTMLElement, FullPaginationProps>(
    (
        {
            pagination,
            showFirstLast = true,
            showPrevNext = true,
            showPageNumbers = true,
            showInfo = false,
            showItemRange = false,
            showJump = false,
            showPerPage = false,
            perPageOptions,
            size = "default",
            labels = {},
            className,
            ...props
        },
        ref,
    ) => {
        const {
            currentPage,
            totalPages,
            itemsPerPage,
            hasPreviousPage,
            hasNextPage,
            goToPage,
            nextPage,
            previousPage,
            firstPage,
            lastPage,
            setItemsPerPage,
            pageRange,
            startIndex,
            endIndex,
        } = pagination;

        const sizeMap = {
            default: { button: "default" as const, icon: "icon" as const },
            sm: { button: "sm" as const, icon: "icon-sm" as const },
            lg: { button: "lg" as const, icon: "icon" as const },
        };

        const currentSize = sizeMap[size];

        const totalItems =
            pagination.startIndex !== undefined &&
            pagination.endIndex !== undefined
                ? Math.ceil(pagination.endIndex / pagination.currentPage) *
                  pagination.totalPages
                : undefined;

        return (
            <Pagination
                ref={ref}
                className={cn("flex-col gap-4 sm:flex-row", className)}
                {...props}
            >
                {(showInfo || showItemRange) && totalItems && (
                    <PaginationInfo
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        showItemRange={showItemRange}
                        className="sm:order-0 order-first"
                    />
                )}

                <PaginationContent>
                    {showFirstLast && (
                        <PaginationItem>
                            <PaginationFirst
                                onPress={firstPage}
                                isDisabled={!hasPreviousPage}
                                size={currentSize.icon}
                                label={labels.first}
                            />
                        </PaginationItem>
                    )}

                    {showPrevNext && (
                        <PaginationItem>
                            <PaginationPrevious
                                onPress={previousPage}
                                isDisabled={!hasPreviousPage}
                                size={currentSize.button}
                                label={labels.previous}
                            />
                        </PaginationItem>
                    )}

                    {showPageNumbers &&
                        pageRange.map((page, index) => {
                            const ellipsisKey =
                                page === "ellipsis"
                                    ? index < pageRange.indexOf(currentPage) ||
                                      (pageRange.indexOf(currentPage) === -1 &&
                                          index < pageRange.length / 2)
                                        ? "ellipsis-left"
                                        : "ellipsis-right"
                                    : page;

                            return page === "ellipsis" ? (
                                <PaginationItem key={ellipsisKey}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            ) : (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        page={page}
                                        isActive={page === currentPage}
                                        onPress={() => goToPage(page)}
                                        size={currentSize.icon}
                                    />
                                </PaginationItem>
                            );
                        })}

                    {showPrevNext && (
                        <PaginationItem>
                            <PaginationNext
                                onPress={nextPage}
                                isDisabled={!hasNextPage}
                                size={currentSize.button}
                                label={labels.next}
                            />
                        </PaginationItem>
                    )}

                    {showFirstLast && (
                        <PaginationItem>
                            <PaginationLast
                                onPress={lastPage}
                                isDisabled={!hasNextPage}
                                size={currentSize.icon}
                                label={labels.last}
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>

                {showJump && (
                    <PaginationJump
                        totalPages={totalPages}
                        onJump={goToPage}
                        label={labels.goTo}
                        className="sm:order-0 order-last"
                    />
                )}

                {showPerPage && (
                    <PaginationPerPage
                        value={itemsPerPage}
                        options={perPageOptions}
                        onChange={setItemsPerPage}
                        label={labels.perPage}
                        className="order-last"
                    />
                )}
            </Pagination>
        );
    },
);
FullPagination.displayName = "FullPagination";

export { paginationButtonVariants };
