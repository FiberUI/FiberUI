"use client";

import { parseColor } from "react-aria-components";
import { ColorWheel } from "@repo/ui/components/color-wheel";

/* BASIC COLOR WHEEL EXAMPLE */
export const Example1: React.FC = () => {
    return <ColorWheel defaultValue={parseColor("hsl(30, 100%, 50%)")} />;
};
