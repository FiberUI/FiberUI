import { Skeleton } from "@repo/ui/components/skeleton";
import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import { LoaderSpinner } from "@repo/ui/components/loader";
import { Button } from "@repo/ui/components/button";

export const StatesBlock = () => {
    return (
        <div className="space-y-4">
            {/* Loading Card */}
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                        <Skeleton className="size-10 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </CardContent>
            </Card>

            {/* Processing State */}
            <Card>
                <CardContent className="flex items-center justify-center gap-3 py-8">
                    <LoaderSpinner />
                    <span className="text-muted-foreground text-sm">
                        Processing...
                    </span>
                </CardContent>
            </Card>

            {/* Disabled Buttons */}
            <div className="flex gap-2">
                <Button isDisabled>Disabled</Button>
                <Button variant="outline" isDisabled>
                    Disabled
                </Button>
            </div>
        </div>
    );
};
