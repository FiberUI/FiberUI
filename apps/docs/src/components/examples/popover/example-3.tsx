import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
} from "@repo/ui/components/popover";

export const Example3: React.FC = () => {
    return (
        <div className="flex min-h-[400px] items-center justify-center">
            <Popover>
                <PopoverTrigger>
                    <Button>Open Popover</Button>
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
                                <Checkbox defaultSelected />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">
                                    Marketing emails
                                </span>
                                <Checkbox />
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
