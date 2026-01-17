import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";

export const CardShowcase = () => {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Card</h2>
                <p className="text-muted-foreground mt-1">
                    Container for grouping related content
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Basic Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>
                            A brief description of the card content.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">
                            This is the main content area of the card.
                        </p>
                    </CardContent>
                </Card>

                {/* Card with Footer */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notification</CardTitle>
                        <CardDescription>
                            You have 3 unread messages.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                                3
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">
                                    New messages
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    From your team
                                </p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size="sm" className="w-full">
                            View All
                        </Button>
                    </CardFooter>
                </Card>

                {/* User Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                        <CardDescription>
                            People working on this project.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-bold text-white">
                                A
                            </div>
                            <div>
                                <p className="text-sm font-medium">
                                    Alice Chen
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    Lead Developer
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-xs font-bold text-white">
                                B
                            </div>
                            <div>
                                <p className="text-sm font-medium">Bob Smith</p>
                                <p className="text-muted-foreground text-xs">
                                    Designer
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
