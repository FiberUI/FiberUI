"use client";
import React from "react";
import {
    ColorArea as AriaColorArea,
    ColorAreaProps as AriaColorAreaProps,
} from "react-aria-components";
import { ColorThumb } from "./color-thumb";
import { cn } from "@repo/ui/lib/utils";

export interface ColorAreaProps extends AriaColorAreaProps {}

export const ColorArea: React.FC<ColorAreaProps> = ({
    className,
    ...props
}) => {
    return (
        <AriaColorArea
            data-slot="color-area"
            {...props}
            className={cn(
                "data-disabled:bg-muted aspect-square w-56 shrink-0 rounded-lg",
                className,
            )}
            style={({ defaultStyle, isDisabled }) => ({
                ...defaultStyle,
                background: isDisabled ? undefined : defaultStyle.background,
            })}
        >
            <ColorThumb />
        </AriaColorArea>
    );
};
