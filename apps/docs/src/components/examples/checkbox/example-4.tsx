"use client";

import { useState } from "react";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Button } from "@repo/ui/components/button";

export const Example4 = () => {
    const [selected, setSelected] = useState<boolean | "indeterminate">(
        "indeterminate",
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Checkbox
                    isIndeterminate={selected === "indeterminate"}
                    isSelected={selected === true}
                    onChange={(isSelected) => setSelected(isSelected)}
                />
                Indeterminate checkbox
            </div>

            <div className="flex gap-2">
                <Button
                    onPress={() => setSelected("indeterminate")}
                    variant="outline"
                >
                    Set Indeterminate
                </Button>
                <Button onPress={() => setSelected(true)} variant="outline">
                    Set Checked
                </Button>
                <Button onPress={() => setSelected(false)} variant="outline">
                    Set Unchecked
                </Button>
            </div>
        </div>
    );
};
