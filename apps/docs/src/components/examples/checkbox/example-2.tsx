"use client";

import { useState } from "react";
import { Checkbox } from "@repo/ui/components/checkbox";

export const Example2 = () => {
    const [checked, setChecked] = useState(false);

    return (
        <div className="space-x-2">
            <div className="flex items-center gap-2">
                <Checkbox isSelected={checked} onChange={setChecked} />
                Controlled checkbox
            </div>

            <p>Checked: {checked ? "Yes" : "No"}</p>
        </div>
    );
};
