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

/* SCROLLABLE CONTENT EXAMPLE */
export const Example5 = () => {
    return (
        <DialogTrigger>
            <Button variant="outline">Terms of Service</Button>
            <DialogOverlay>
                <DialogContent>
                    <DialogClose />
                    <DialogHeader>
                        <DialogTitle>Terms of Service</DialogTitle>
                        <DialogDescription>
                            Please read our terms of service carefully before
                            proceeding.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                        <div className="text-muted-foreground space-y-4 text-sm">
                            <div>
                                <h4 className="text-foreground mb-1 font-semibold">
                                    1. Acceptance of Terms
                                </h4>
                                <p>
                                    By accessing and using this service, you
                                    accept and agree to be bound by the terms
                                    and provisions of this agreement. If you do
                                    not agree to abide by the above, please do
                                    not use this service.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-foreground mb-1 font-semibold">
                                    2. Use License
                                </h4>
                                <p>
                                    Permission is granted to temporarily use the
                                    materials on this website for personal,
                                    non-commercial transitory viewing only. This
                                    is the grant of a license, not a transfer of
                                    title.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-foreground mb-1 font-semibold">
                                    3. Disclaimer
                                </h4>
                                <p>
                                    The materials on this website are provided
                                    on an &quot;as is&quot; basis. We make no
                                    warranties, expressed or implied, and hereby
                                    disclaim and negate all other warranties
                                    including, without limitation, implied
                                    warranties or conditions of merchantability.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-foreground mb-1 font-semibold">
                                    4. Limitations
                                </h4>
                                <p>
                                    In no event shall the company or its
                                    suppliers be liable for any damages
                                    (including, without limitation, damages for
                                    loss of data or profit) arising out of the
                                    use or inability to use the materials on
                                    this website.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-foreground mb-1 font-semibold">
                                    5. Accuracy of Materials
                                </h4>
                                <p>
                                    The materials appearing on this website
                                    could include technical, typographical, or
                                    photographic errors. The company does not
                                    warrant that any of the materials on its
                                    website are accurate, complete or current.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-foreground mb-1 font-semibold">
                                    6. Links
                                </h4>
                                <p>
                                    The company has not reviewed all of the
                                    sites linked to its website and is not
                                    responsible for the contents of any such
                                    linked site. The inclusion of any link does
                                    not imply endorsement by the company of the
                                    site.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-foreground mb-1 font-semibold">
                                    7. Modifications
                                </h4>
                                <p>
                                    The company may revise these terms of
                                    service at any time without notice. By using
                                    this website you are agreeing to be bound by
                                    the then current version of these terms of
                                    service.
                                </p>
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="outline">Decline</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button>Accept</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </DialogOverlay>
        </DialogTrigger>
    );
};
