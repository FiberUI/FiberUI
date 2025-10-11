import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { JSX } from "react";

export default function Layout({ children }: DocsLayoutProps): JSX.Element {
    return (
        <DocsLayout tree={source.pageTree} {...baseOptions()}>
            {children}
        </DocsLayout>
    );
}
