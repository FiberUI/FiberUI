import { Button } from "@repo/ui/components/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";

export function Example1() {
    return (
        <Card className="w-80 sm:w-96">
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>
                    Deploy your new project in one-click.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Name of your project"
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
            </CardFooter>
        </Card>
    );
}
