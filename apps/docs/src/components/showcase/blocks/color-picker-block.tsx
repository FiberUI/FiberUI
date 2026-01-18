"use client";

import { useState } from "react";
import { parseColor } from "react-aria-components";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";
import { ColorArea } from "@repo/ui/components/color-area";
import { ColorWheel } from "@repo/ui/components/color-wheel";

export const ColorPickerBlock = () => {
    const [color, setColor] = useState(parseColor("hsl(200, 100%, 50%)"));

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Color Picker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <ColorWheel
                        value={color}
                        onChange={setColor}
                        outerRadius={60}
                        innerRadius={45}
                    />
                    <ColorArea
                        value={color}
                        onChange={setColor}
                        xChannel="saturation"
                        yChannel="lightness"
                        className="size-28"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div
                        className="size-8 rounded-md border shadow-sm"
                        style={{ backgroundColor: color.toString("css") }}
                    />
                    <div className="text-sm">
                        <p className="font-mono font-medium">
                            {color.toString("hex")}
                        </p>
                        <p className="text-muted-foreground font-mono text-xs">
                            {color.toString("hsl")}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
