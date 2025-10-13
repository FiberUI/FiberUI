import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import * as ComponentShowcaseTabsComponent from "./components/component-showcase-tabs";
import { CodeFromFile } from "./components/code-from-file";
import * as ButtonExamples from "./components/examples/button-examples";
import * as LoaderExamples from "./components/examples/loader-examples";
// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        ...components,
        ...ComponentShowcaseTabsComponent,
        ...ButtonExamples,
        ...LoaderExamples,
        Code: CodeFromFile,
        CodeFromFile,
    };
}
