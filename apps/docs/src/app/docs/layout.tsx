import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { Code2, ComponentIcon } from "lucide-react";
import { FloatingNav } from "@/components/floating-nav";

export default function Layout({ children }: LayoutProps<"/docs">) {
    return (
        <DocsLayout
            tree={source.pageTree}
            {...baseOptions()}
            sidebar={{
                enabled: true,
                tabs: [
                    {
                        title: "Get Started",
                        url: "/docs",
                    },
                    {
                        title: "Components",
                        url: "/docs/components",
                        description: "UI Components Collection",
                        icon: (
                            <>
                                <ComponentIcon
                                    size={18}
                                    className="text-emerald-500"
                                />
                            </>
                        ),
                    },
                    {
                        title: "React Hooks",
                        url: "/docs/hooks",
                        description: "React hooks Collection",
                        icon: (
                            <>
                                <Code2 size={18} className="text-amber-500" />
                            </>
                        ),
                    },
                ],
            }}
        >
            {children}
            <FloatingNav showSourceCode />
        </DocsLayout>
    );
}
