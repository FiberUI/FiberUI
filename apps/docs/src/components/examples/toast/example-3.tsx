"use client";

import { Button } from "@repo/ui/components/button";
import { toast } from "sonner";

export const Example3 = () => {
    return (
        <Button
            variant="outline"
            onClick={() =>
                toast.promise(
                    new Promise((resolve) => setTimeout(resolve, 2000)),
                    {
                        loading: "Loading...",
                        success: () => {
                            return `Toast has been added`;
                        },
                        error: "Error",
                    },
                )
            }
        >
            Show Promise Toast
        </Button>
    );
};
