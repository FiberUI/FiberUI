import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <HomeLayout
            {...baseOptions()}
            links={[
                {
                    text: "Showcase",
                    url: "/",
                },
                {
                    text: "Components",
                    url: "/docs/components",
                },
                {
                    text: "Documentation",
                    url: "/docs",
                },
            ]}
        >
            {children}
        </HomeLayout>
    );
}
