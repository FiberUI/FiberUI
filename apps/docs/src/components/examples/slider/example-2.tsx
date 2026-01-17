"use client";

import { useState } from "react";
import { Slider } from "@repo/ui/components/slider";

/* CONTROLLED SLIDER EXAMPLE */
export const Example2 = () => {
    const [value, setValue] = useState([30]);

    return (
        <div className="w-full max-w-xs space-y-4">
            <Slider value={value} onChange={(v) => setValue(v as number[])} />
            <p className="text-muted-foreground text-center text-sm">
                Value:{" "}
                <span className="text-foreground font-medium">{value[0]}</span>
            </p>
        </div>
    );
};
