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

/* BASIC USAGE EXAMPLE */
export const Example1 = () => {
    return (
        <DialogTrigger>
            <Button variant="outline">Open Dialog</Button>
            <DialogOverlay>
                <DialogContent>
                    <DialogClose />
                    <DialogHeader>
                        <DialogTitle>Welcome to FiberUI</DialogTitle>
                        <DialogDescription>
                            This is a basic dialog built with React Aria
                            components. It supports keyboard navigation, focus
                            trapping, and screen reader accessibility out of the
                            box.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                        <p className="text-muted-foreground text-sm">
                            Dialogs are used to display content that requires
                            user attention or interaction. Click outside or
                            press Escape to dismiss.
                        </p>
                    </DialogBody>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button>Continue</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </DialogOverlay>
        </DialogTrigger>
    );
};
