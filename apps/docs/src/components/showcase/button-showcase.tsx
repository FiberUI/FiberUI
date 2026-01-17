import { Button } from "@repo/ui/components/button";
import { ArrowRight, Download, Mail, Trash2 } from "lucide-react";

export const ButtonShowcase = () => {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Button</h2>
                <p className="text-muted-foreground mt-1">
                    Versatile button component with multiple variants and sizes
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                        Variants
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                        <Button variant="destructive">Destructive</Button>
                    </div>
                </div>

                <div>
                    <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                        Sizes
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                        <Button size="icon" variant="outline">
                            <Mail className="size-4" />
                        </Button>
                    </div>
                </div>

                <div>
                    <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                        With Icons
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <Button>
                            <Mail className="size-4" />
                            Send Email
                        </Button>
                        <Button variant="outline">
                            <Download className="size-4" />
                            Download
                        </Button>
                        <Button variant="destructive">
                            <Trash2 className="size-4" />
                            Delete
                        </Button>
                        <Button>
                            Continue
                            <ArrowRight className="size-4" />
                        </Button>
                    </div>
                </div>

                <div>
                    <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                        States
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <Button isDisabled>Disabled</Button>
                        <Button variant="outline" isDisabled>
                            Disabled Outline
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
