"use client";

import { cn } from "@repo/ui/lib/utils";
import { ComponentProps, forwardRef, ReactNode } from "react";
import { LabelAriaProps, mergeProps, useLabel } from "react-aria";

interface LabelProps extends LabelAriaProps, ComponentProps<"label"> {
    className?: string;
    children: ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
    ({ className = "", children, ...restProps }, ref) => {
        const { labelProps } = useLabel(restProps);

        return (
            <label
                {...mergeProps(labelProps, restProps)}
                ref={ref}
                className={cn(
                    `flex select-none items-center gap-2 text-sm font-medium leading-none`,
                    `peer-disabled:cursor-not-allowed peer-disabled:opacity-50`,
                    `peer-[data-disabled=true]:cursor-not-allowed peer-[data-disabled="true"]:opacity-50`,
                    `aria-disabled:pointer-events-none aria-disabled:opacity-50`,
                    `group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50`,
                    className,
                )}
            >
                {children}
            </label>
        );
    },
);
Label.displayName = "Label";
