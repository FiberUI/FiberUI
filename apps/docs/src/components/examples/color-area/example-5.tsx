"use client";

import { parseColor } from "react-aria-components";
import { ColorArea } from "@repo/ui/components/color-area";

/* BASIC COLOR AREA EXAMPLE */
export const Example5: React.FC = () => {
    return <ColorArea defaultValue={parseColor("#7f007f")} />;
};
