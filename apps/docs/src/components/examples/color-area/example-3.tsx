"use client";

import { useState } from "react";
import { parseColor } from "react-aria-components";
import { ColorArea } from "@repo/ui/components/color-area";

/* COLOR AREA WITH DIFFERENT COLOR SPACES */
export const Example3: React.FC = () => {
    const [hslColor, setHslColor] = useState(parseColor("hsl(0, 100%, 50%)"));

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <p className="text-sm font-medium">
                        Saturation vs Lightness
                    </p>
                    <ColorArea
                        value={hslColor}
                        onChange={setHslColor}
                        xChannel="saturation"
                        yChannel="lightness"
                    />
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium">Hue vs Saturation</p>
                    <ColorArea
                        value={hslColor}
                        onChange={setHslColor}
                        xChannel="hue"
                        yChannel="saturation"
                    />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div
                    className="size-10 rounded-md border shadow-sm"
                    style={{ backgroundColor: hslColor.toString("css") }}
                />
                <p className="text-sm font-medium">
                    {hslColor.toString("hsl")}
                </p>
            </div>
        </div>
    );
};
