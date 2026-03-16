"use client";
import { Button } from "@repo/ui/components/button";
import {
    DialogTrigger,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@repo/ui/components/dialog";

/* ALERT DIALOG EXAMPLE */
export const Example6 = () => {
    return (
        <DialogTrigger>
            <Button variant="outline">Show Alert</Button>
            <DialogOverlay isDismissable={false}>
                <DialogContent role="alertdialog" size="sm">
                    <DialogHeader>
                        <DialogTitle>Session Expired</DialogTitle>
                        <DialogDescription>
                            Your session has expired due to inactivity. Please
                            sign in again to continue using the application.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose>
                            <Button>Sign In Again</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </DialogOverlay>
        </DialogTrigger>
    );
};
