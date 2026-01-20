import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { Code2, Component } from "lucide-react";

export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <HomeLayout
            {...baseOptions()}
            links={[
                {
                    text: "Components",
                    url: "/docs/components",
                    icon: <Component />,
                },
                {
                    text: "React Hooks",
                    url: "/docs/hooks",
                    icon: <Code2 />,
                },
            ]}
        >
            {children}
        </HomeLayout>
    );
}
