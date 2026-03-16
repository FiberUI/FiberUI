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

/* CONFIRMATION DIALOG EXAMPLE */
export const Example2 = () => {
    return (
        <DialogTrigger>
            <Button variant="destructive">Delete Account</Button>
            <DialogOverlay>
                <DialogContent size="sm">
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                        <div className="border-destructive/20 bg-destructive/5 rounded-md border p-3">
                            <p className="text-destructive text-sm font-medium">
                                Warning: All your projects, files, and settings
                                will be permanently removed.
                            </p>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button variant="destructive">
                                Yes, delete account
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </DialogOverlay>
        </DialogTrigger>
    );
};
