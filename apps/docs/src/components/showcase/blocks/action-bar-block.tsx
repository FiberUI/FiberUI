import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import {
    Archive,
    Trash2,
    Clock,
    MoreHorizontal,
    Reply,
    Forward,
} from "lucide-react";

export const ActionBarBlock = () => {
    return (
        <div className="space-y-3">
            {/* Email-style action bar */}
            <Card>
                <CardContent className="flex items-center gap-1 p-2">
                    <Button size="icon" variant="ghost">
                        <Archive className="size-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                        <Trash2 className="size-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                        <Clock className="size-4" />
                    </Button>
                    <div className="bg-border mx-2 h-4 w-px" />
                    <Button size="icon" variant="ghost">
                        <Reply className="size-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                        <Forward className="size-4" />
                    </Button>
                    <div className="flex-1" />
                    <Button size="icon" variant="ghost">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </CardContent>
            </Card>

            {/* Button group */}
            <div className="flex gap-1">
                <Button variant="secondary" className="rounded-r-none">
                    Save
                </Button>
                <Button
                    variant="secondary"
                    className="border-background rounded-none border-x"
                >
                    Preview
                </Button>
                <Button variant="secondary" className="rounded-l-none">
                    Publish
                </Button>
            </div>
        </div>
    );
};
