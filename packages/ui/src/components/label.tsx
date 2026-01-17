"use client";

import { forwardRef } from "react";
import {
    Label as AriaLabel,
    LabelProps as AriaLabelProps,
} from "react-aria-components";
import { cn } from "tailwind-variants";

interface LabelProps extends AriaLabelProps {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, children, ...restProps }, ref) => {
        return (
            <AriaLabel
                ref={ref}
                {...restProps}
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
            </AriaLabel>
        );
    },
);
Label.displayName = "Label";
