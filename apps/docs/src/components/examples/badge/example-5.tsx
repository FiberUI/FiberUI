import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Bell, Mail, MessageSquare, ShoppingCart } from "lucide-react";

/* BADGE AS NOTIFICATION INDICATOR */
export const Example5 = () => {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
                <Button size="icon" variant="outline">
                    <Bell className="size-4" />
                </Button>
                <Badge className="absolute -right-1 -top-1 size-5 p-0 text-[10px]">
                    3
                </Badge>
            </div>
            <div className="relative">
                <Button size="icon" variant="outline">
                    <Mail className="size-4" />
                </Button>
                <Badge className="absolute -right-1 -top-1 size-5 p-0 text-[10px]">
                    12
                </Badge>
            </div>
            <div className="relative">
                <Button size="icon" variant="outline">
                    <MessageSquare className="size-4" />
                </Button>
                <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 size-5 p-0 text-[10px]"
                >
                    5
                </Badge>
            </div>
            <div className="relative">
                <Button size="icon" variant="outline">
                    <ShoppingCart className="size-4" />
                </Button>
                <Badge
                    variant="secondary"
                    className="absolute -right-1 -top-1 size-5 p-0 text-[10px]"
                >
                    2
                </Badge>
            </div>
        </div>
    );
};
