import { Button } from "@repo/ui/components/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
} from "@repo/ui/components/popover";

interface Example3Props {}

export const Example3: React.FC<Example3Props> = ({}) => {
    return (
        <div className="flex min-h-[400px] items-center justify-center">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <PopoverHeader>
                        <h3 className="text-lg font-semibold">
                            Account Settings
                        </h3>
                    </PopoverHeader>
                    <PopoverBody>
                        <p className="mb-4 text-sm text-gray-600">
                            Manage your account preferences and settings here.
                            Changes will be saved automatically.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">
                                    Email notifications
                                </span>
                                <input type="checkbox" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">
                                    Marketing emails
                                </span>
                                <input type="checkbox" />
                            </div>
                        </div>
                    </PopoverBody>
                    <PopoverFooter>
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                                Cancel
                            </Button>
                            <Button size="sm">Save Changes</Button>
                        </div>
                    </PopoverFooter>
                </PopoverContent>
            </Popover>
        </div>
    );
};
