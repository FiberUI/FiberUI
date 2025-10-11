import { HomeLayout, HomeLayoutProps } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { JSX } from "react";

export default function Layout({ children }: HomeLayoutProps): JSX.Element {
    return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
}
