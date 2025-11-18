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
import { Separator } from "@repo/ui/components/separator";

export function Example4() {
    return (
        <Card className="w-80 overflow-hidden sm:w-96">
            <CardHeader>
                <div className="mb-5 h-[100px] w-full rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                <CardTitle>Cookie Settings</CardTitle>
                <CardDescription>
                    Manage your cookie settings here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="flex items-center justify-between space-x-2">
                        <Label
                            htmlFor="necessary"
                            className="flex flex-col space-y-1"
                        >
                            <span>Strictly Necessary</span>
                            <span className="text-muted-foreground font-normal leading-snug">
                                These cookies are essential in order to use the
                                website and use its features.
                            </span>
                        </Label>
                        <Checkbox
                            id="necessary"
                            className="h-4 w-4"
                            defaultSelected
                            isDisabled
                        />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                        <Label
                            htmlFor="functional"
                            className="flex flex-col space-y-1"
                        >
                            <span>Functional Cookies</span>
                            <span className="text-muted-foreground font-normal leading-snug">
                                These cookies allow the website to provide
                                personalized functionality.
                            </span>
                        </Label>
                        <Checkbox id="functional" className="h-4 w-4" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                        <Label
                            htmlFor="performance"
                            className="flex flex-col space-y-1"
                        >
                            <span>Performance Cookies</span>
                            <span className="text-muted-foreground font-normal leading-snug">
                                These cookies help to improve the performance of
                                the website.
                            </span>
                        </Label>
                        <Checkbox id="performance" className="h-4 w-4" />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Save preferences</Button>
            </CardFooter>
        </Card>
    );
}
