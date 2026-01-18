"use client";

import { useState } from "react";
import { parseColor } from "react-aria-components";
import { ColorWheel } from "@repo/ui/components/color-wheel";

/* CONTROLLED COLOR WHEEL WITH VALUE DISPLAY */
export const Example2: React.FC = () => {
    const [color, setColor] = useState(parseColor("hsl(180, 100%, 50%)"));

    return (
        <div className="flex items-center gap-6">
            <ColorWheel value={color} onChange={setColor} />
            <div className="flex items-center gap-3">
                <div
                    className="size-12 rounded-md border shadow-sm"
                    style={{ backgroundColor: color.toString("css") }}
                />
                <div className="text-sm">
                    <p className="font-mono font-medium">
                        {color.toString("hex")}
                    </p>
                    <p className="text-muted-foreground font-mono">
                        Hue: {Math.round(color.getChannelValue("hue"))}°
                    </p>
                </div>
            </div>
        </div>
    );
};
