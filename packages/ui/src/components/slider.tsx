"use client";
import {
    Slider as AriaSlider,
    SliderProps as AriaSliderProps,
    SliderThumb,
    SliderTrack,
} from "react-aria-components";
import { cn } from "tailwind-variants";

export interface SliderProps<T> extends AriaSliderProps<T> {
    label?: string;
    thumbLabels?: string[];
}

export function Slider<T extends number | number[]>({
    thumbLabels,
    className,
    ...props
}: SliderProps<T>) {
    return (
        <AriaSlider
            data-slot="slider"
            {...props}
            className={cn(
                "relative flex w-full touch-none select-none items-center",
                className,
            )}
        >
            {/* SliderTrack is a tall container for the thumb to move in */}
            <SliderTrack
                data-slot="slider-track"
                className="relative h-5 w-full"
            >
                {({ state }) => (
                    <>
                        {/* Visible track bar - centered vertically */}
                        <div className="bg-muted absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full" />

                        {/* Fill bar - centered vertically */}
                        {state.values.length === 1 ? (
                            // Single thumb - fill from start to thumb
                            <div
                                className="bg-primary absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full"
                                style={{
                                    width: `${state.getThumbPercent(0) * 100}%`,
                                }}
                            />
                        ) : state.values.length === 2 ? (
                            // Range slider - fill between the two thumbs
                            <div
                                className="bg-primary absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full"
                                style={{
                                    left: `${state.getThumbPercent(0) * 100}%`,
                                    width: `${(state.getThumbPercent(1) - state.getThumbPercent(0)) * 100}%`,
                                }}
                            />
                        ) : null}

                        {/* Thumbs - React Aria sets left position, we need to center vertically */}
                        {state.values.map((_, i) => (
                            <SliderThumb
                                key={i}
                                index={i}
                                aria-label={thumbLabels?.[i]}
                                className="border-primary bg-background ring-ring/50 absolute top-1/2 block size-4 rounded-full border shadow transition-colors hover:ring-4 focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50"
                            />
                        ))}
                    </>
                )}
            </SliderTrack>
        </AriaSlider>
    );
}
