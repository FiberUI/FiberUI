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

/* SIZE VARIANTS EXAMPLE */
export const Example4 = () => {
    return (
        <div className="flex flex-wrap gap-3">
            <DialogTrigger>
                <Button variant="outline" size="sm">
                    Small
                </Button>
                <DialogOverlay>
                    <DialogContent size="sm">
                        <DialogClose />
                        <DialogHeader>
                            <DialogTitle>Small Dialog</DialogTitle>
                            <DialogDescription>
                                This dialog uses the &quot;sm&quot; size variant
                                with a max-width of 24rem.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose>
                                <Button variant="outline" size="sm">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </DialogOverlay>
            </DialogTrigger>

            <DialogTrigger>
                <Button variant="outline" size="sm">
                    Default
                </Button>
                <DialogOverlay>
                    <DialogContent size="default">
                        <DialogClose />
                        <DialogHeader>
                            <DialogTitle>Default Dialog</DialogTitle>
                            <DialogDescription>
                                This dialog uses the &quot;default&quot; size
                                variant with a max-width of 32rem.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose>
                                <Button variant="outline" size="sm">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </DialogOverlay>
            </DialogTrigger>

            <DialogTrigger>
                <Button variant="outline" size="sm">
                    Large
                </Button>
                <DialogOverlay>
                    <DialogContent size="lg">
                        <DialogClose />
                        <DialogHeader>
                            <DialogTitle>Large Dialog</DialogTitle>
                            <DialogDescription>
                                This dialog uses the &quot;lg&quot; size variant
                                with a max-width of 42rem. Ideal for more
                                complex content.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose>
                                <Button variant="outline" size="sm">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </DialogOverlay>
            </DialogTrigger>
        </div>
    );
};
