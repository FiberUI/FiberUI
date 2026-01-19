"use client";
import {
    ColorWheel as AriaColorWheel,
    ColorWheelProps as AriaColorWheelProps,
    ColorWheelTrack,
} from "react-aria-components";
import { ColorThumb } from "@repo/ui/components/color-thumb";

export interface ColorWheelProps
    extends Omit<AriaColorWheelProps, "outerRadius" | "innerRadius"> {
    outerRadius?: number;
    innerRadius?: number;
}

export const ColorWheel: React.FC<ColorWheelProps> = ({
    outerRadius = 100,
    innerRadius = 75,
    ...props
}) => {
    return (
        <AriaColorWheel
            data-slot="color-wheel"
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            {...props}
        >
            <ColorWheelTrack
                className="data-disabled:bg-muted"
                style={({ defaultStyle, isDisabled }) => ({
                    ...defaultStyle,
                    background: isDisabled
                        ? undefined
                        : defaultStyle.background,
                })}
            />
            <ColorThumb />
        </AriaColorWheel>
    );
};
