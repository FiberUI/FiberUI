"use client";

import { parseColor } from "react-aria-components";
import { ColorWheel } from "@repo/ui/components/color-wheel";

/* DISABLED COLOR WHEEL */
export const Example3: React.FC = () => {
    return (
        <ColorWheel
            defaultValue={parseColor("hsl(200, 100%, 50%)")}
            isDisabled
        />
    );
};
