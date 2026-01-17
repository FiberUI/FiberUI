"use client";

import { Button } from "@repo/ui/components/button";
import { toast } from "sonner";

export const Example4 = () => {
    return (
        <div className="grid grid-cols-3 gap-2">
            <Button
                variant="outline"
                onClick={() =>
                    toast("Event has been created", {
                        position: "top-left",
                    })
                }
            >
                Top Left
            </Button>
            <Button
                variant="outline"
                onClick={() =>
                    toast("Event has been created", {
                        position: "top-center",
                    })
                }
            >
                Top Center
            </Button>
            <Button
                variant="outline"
                onClick={() =>
                    toast("Event has been created", {
                        position: "top-right",
                    })
                }
            >
                Top Right
            </Button>
            <Button
                variant="outline"
                onClick={() =>
                    toast("Event has been created", {
                        position: "bottom-left",
                    })
                }
            >
                Bottom Left
            </Button>
            <Button
                variant="outline"
                onClick={() =>
                    toast("Event has been created", {
                        position: "bottom-center",
                    })
                }
            >
                Bottom Center
            </Button>
            <Button
                variant="outline"
                onClick={() =>
                    toast("Event has been created", {
                        position: "bottom-right",
                    })
                }
            >
                Bottom Right
            </Button>
        </div>
    );
};
