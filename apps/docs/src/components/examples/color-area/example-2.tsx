"use client";

import { useState } from "react";
import { parseColor } from "react-aria-components";
import { ColorArea } from "@repo/ui/components/color-area";

/* CONTROLLED COLOR AREA WITH VALUE DISPLAY */
export const Example2: React.FC = () => {
    const [color, setColor] = useState(parseColor("hsl(120, 100%, 50%)"));

    return (
        <div className="flex flex-col gap-4">
            <ColorArea value={color} onChange={setColor} />
            <div className="flex items-center gap-3">
                <div
                    className="size-10 rounded-md border shadow-sm"
                    style={{ backgroundColor: color.toString("css") }}
                />
                <div className="text-sm">
                    <p className="font-medium">{color.toString("hex")}</p>
                    <p className="text-muted-foreground">
                        {color.toString("hsl")}
                    </p>
                </div>
            </div>
        </div>
    );
};
