import { Button } from "@repo/ui/components/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@repo/ui/components/popover";

export function Example5() {
    return (
        <Card className="w-80 sm:w-96">
            <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                    Invite your team members to collaborate.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 font-bold dark:bg-zinc-700">
                            <span>SD</span>
                        </div>{" "}
                        <div>
                            <p className="text-sm font-medium leading-none">
                                Sofia Davis
                            </p>
                            <p className="text-muted-foreground text-sm">
                                m@example.com
                            </p>
                        </div>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Owner
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <div className="flex flex-col p-2">
                                <Button
                                    variant="ghost"
                                    className="justify-start"
                                >
                                    Viewer
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="justify-start"
                                >
                                    Developer
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="justify-start"
                                >
                                    Billing
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="justify-start"
                                >
                                    Owner
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 font-bold dark:bg-zinc-700">
                            <span>JL</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium leading-none">
                                Jackson Lee
                            </p>
                            <p className="text-muted-foreground text-sm">
                                p@example.com
                            </p>
                        </div>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Member
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <div className="flex flex-col p-2">
                                <Button
                                    variant="ghost"
                                    className="justify-start"
                                >
                                    Viewer
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="justify-start"
                                >
                                    Developer
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="justify-start"
                                >
                                    Billing
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="justify-start"
                                >
                                    Owner
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </CardContent>
        </Card>
    );
}
