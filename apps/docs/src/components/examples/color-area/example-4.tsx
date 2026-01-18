"use client";

import { parseColor } from "react-aria-components";
import { ColorArea } from "@repo/ui/components/color-area";

/* DISABLED COLOR AREA */
export const Example4: React.FC = () => {
    return <ColorArea defaultValue={parseColor("#7f007f")} isDisabled />;
};
