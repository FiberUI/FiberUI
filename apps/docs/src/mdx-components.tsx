import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import * as ComponentShowcaseTabsComponent from "./components/component-showcase-tabs";
import { CodeFromFile } from "./components/code-from-file";

/* Fiber UI Components Examples IMPORT */
import * as ButtonExamples from "./components/examples/button";
import * as LoaderExamples from "./components/examples/loader";
import * as SeparatorExamples from "./components/examples/separator";

/* ------------------------------------*/

import { ComponentsListView } from "./components/components-list-view";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        ...components,
        ...ComponentShowcaseTabsComponent,

        ComponentsListView,

        /* Fiber UI Components Examples */

        ...ButtonExamples,
        ...LoaderExamples,
        ...SeparatorExamples,

        /* ------------------------------*/

        Code: CodeFromFile,
        CodeFromFile,
    };
}
