"use client";

import { useShare } from "@repo/hooks/utility/use-share";
import { Button } from "@repo/ui/components/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export function Example1() {
    const { share, isSupported } = useShare();

    const handleShare = async () => {
        const success = await share({
            title: "Fiber UI Hooks",
            text: "Check out this awesome collection of React hooks!",
            url: "https://fiberui.com/hooks",
        });

        if (success) {
            toast.success("Shared successfully!");
        } else {
            toast.error("Share cancelled or failed");
        }
    };

    if (!isSupported) {
        return (
            <div className="rounded-md bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                Web Share API is not supported in this browser.
            </div>
        );
    }

    return (
        <Button onClick={handleShare} className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Resource
        </Button>
    );
}
