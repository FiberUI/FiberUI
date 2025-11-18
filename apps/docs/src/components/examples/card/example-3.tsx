import { Button } from "@repo/ui/components/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Label } from "@repo/ui/components/label";

const notifications = [
    {
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
];

export function Example3() {
    return (
        <Card className="w-80 sm:w-96">
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Label className="has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950 flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Push Notifications
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Send notifications to device.
                        </p>
                    </div>
                    <Checkbox className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700" />
                </Label>
                <div>
                    {notifications.map((notification, index) => (
                        <div
                            key={index}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {notification.title}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    {notification.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Mark all as read</Button>
            </CardFooter>
        </Card>
    );
}
