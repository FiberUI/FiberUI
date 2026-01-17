"use client";

import { Button } from "@repo/ui/components/button";
import { toast } from "sonner";

export const Example2 = () => {
    return (
        <div className="flex gap-2">
            <Button
                variant="outline"
                onClick={() => toast.success("Event has been created")}
            >
                Success
            </Button>
            <Button
                variant="outline"
                onClick={() => toast.info("Event has been created")}
            >
                Info
            </Button>
            <Button
                variant="outline"
                onClick={() => toast.warning("Event has been created")}
            >
                Warning
            </Button>
            <Button
                variant="outline"
                onClick={() => toast.error("Event has not been created")}
            >
                Error
            </Button>
        </div>
    );
};
