"use client";

import { useState } from "react";
import { Slider } from "@repo/ui/components/slider";

/* RANGE SLIDER EXAMPLE */
export const Example3 = () => {
    const [value, setValue] = useState([25, 75]);

    return (
        <div className="w-full max-w-xs space-y-4">
            <Slider value={value} onChange={(v) => setValue(v as number[])} />
            <p className="text-muted-foreground text-center text-sm">
                Range:{" "}
                <span className="text-foreground font-medium">{value[0]}</span>
                {" – "}
                <span className="text-foreground font-medium">{value[1]}</span>
            </p>
        </div>
    );
};
