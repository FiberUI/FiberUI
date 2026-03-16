"use client";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
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

/* FORM DIALOG EXAMPLE */
export const Example3 = () => {
    return (
        <DialogTrigger>
            <Button>Edit Profile</Button>
            <DialogOverlay>
                <DialogContent>
                    <DialogClose />
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when
                            you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    defaultValue="Rajat Verma"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    defaultValue="rajat@fiberui.com"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="Enter username"
                                    defaultValue="@rajatverma"
                                />
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button>Save Changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </DialogOverlay>
        </DialogTrigger>
    );
};
