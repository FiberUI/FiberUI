"use client";
import { Button } from "@repo/ui/components/button";
import {
    DialogTrigger,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogBody,
    DialogFooter,
    DialogClose,
} from "@repo/ui/components/dialog";

/* NESTED DIALOG EXAMPLE */
export const Example7 = () => {
    return (
        <DialogTrigger>
            <Button variant="outline">Open Settings</Button>
            <DialogOverlay>
                <DialogContent>
                    <DialogClose />
                    <DialogHeader>
                        <DialogTitle>Settings</DialogTitle>
                        <DialogDescription>
                            Manage your application settings. Some actions may
                            require additional confirmation.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <p className="text-sm font-medium">
                                        Notifications
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                        Enable push notifications
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Configure
                                </Button>
                            </div>
                            <div className="flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <p className="text-sm font-medium">
                                        Privacy
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                        Manage your data and privacy
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Manage
                                </Button>
                            </div>
                            <div className="border-destructive/20 flex items-center justify-between rounded-md border p-3">
                                <div>
                                    <p className="text-destructive text-sm font-medium">
                                        Danger Zone
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                        Irreversible actions
                                    </p>
                                </div>
                                <DialogTrigger>
                                    <Button variant="destructive" size="sm">
                                        Delete
                                    </Button>
                                    <DialogOverlay>
                                        <DialogContent size="sm">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Confirm Deletion
                                                </DialogTitle>
                                                <DialogDescription>
                                                    This is a nested dialog. Are
                                                    you sure you want to proceed
                                                    with this destructive
                                                    action?
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose>
                                                    <Button variant="outline">
                                                        Go Back
                                                    </Button>
                                                </DialogClose>
                                                <DialogClose>
                                                    <Button variant="destructive">
                                                        Confirm Delete
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </DialogOverlay>
                                </DialogTrigger>
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </DialogOverlay>
        </DialogTrigger>
    );
};
