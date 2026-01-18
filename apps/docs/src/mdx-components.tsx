import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import * as ComponentShowcaseTabsComponent from "./components/component-showcase-tabs";
import {
    CodeFromFile,
    ComponentCodeFromFile,
} from "./components/code-from-file";

/* Fiber UI Components Examples IMPORT */
import * as BadgeExamples from "./components/examples/badge";
import * as BreadcrumbExamples from "./components/examples/breadcrumb";
import * as ButtonExamples from "./components/examples/button";
import * as CardExamples from "./components/examples/card";
import * as CheckboxExamples from "./components/examples/checkbox";
import * as ColorAreaExamples from "./components/examples/color-area";
import * as ColorWheelExamples from "./components/examples/color-wheel";
import * as InputExamples from "./components/examples/input";
import * as LabelExamples from "./components/examples/label";
import * as LoaderExamples from "./components/examples/loader";
import * as PaginationExamples from "./components/examples/pagination";
import * as PopoverExamples from "./components/examples/popover";
import * as SeparatorExamples from "./components/examples/separator";
import * as SkeletonExamples from "./components/examples/skeleton";
import * as ToastExamples from "./components/examples/toast";
import * as TextareaExamples from "./components/examples/textarea";
import * as SelectExamples from "./components/examples/select";
import * as SliderExamples from "./components/examples/slider";
import * as SwitchExamples from "./components/examples/switch";
import * as TabsExamples from "./components/examples/tabs";
import * as TooltipExamples from "./components/examples/tooltip";

/* ------------------------------------*/

import { ComponentsListView } from "./components/components-list-view";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        ...components,
        ...ComponentShowcaseTabsComponent,

        ComponentsListView,

        /* Fiber UI Components Examples */

        ...BadgeExamples,
        ...BreadcrumbExamples,
        ...ButtonExamples,
        ...CardExamples,
        ...CheckboxExamples,
        ...ColorAreaExamples,
        ...ColorWheelExamples,
        ...InputExamples,
        ...LabelExamples,
        ...LoaderExamples,
        ...PaginationExamples,
        ...SeparatorExamples,
        ...PopoverExamples,
        ...SkeletonExamples,
        ...ToastExamples,
        ...TextareaExamples,
        ...SelectExamples,
        ...SliderExamples,
        ...SwitchExamples,
        ...TabsExamples,
        ...TooltipExamples,

        Code: CodeFromFile,
        CodeFromFile,
        ComponentCode: ComponentCodeFromFile,
    };
}
