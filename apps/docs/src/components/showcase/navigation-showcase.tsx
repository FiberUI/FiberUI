import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb";
import { Separator } from "@repo/ui/components/separator";
import { Home, ChevronRight } from "lucide-react";

export const NavigationShowcase = () => {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Navigation</h2>
                <p className="text-muted-foreground mt-1">
                    Breadcrumb and separator components
                </p>
            </div>

            <div className="space-y-8">
                {/* Breadcrumb */}
                <div className="space-y-3">
                    <h3 className="text-muted-foreground text-sm font-medium">
                        Breadcrumb
                    </h3>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">
                                    <Home className="size-4" />
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">
                                    Components
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {/* Separator */}
                <div className="space-y-3">
                    <h3 className="text-muted-foreground text-sm font-medium">
                        Separator
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm">Horizontal separator</p>
                            <Separator />
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <span>Home</span>
                            <Separator orientation="vertical" className="h-4" />
                            <span>About</span>
                            <Separator orientation="vertical" className="h-4" />
                            <span>Contact</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
