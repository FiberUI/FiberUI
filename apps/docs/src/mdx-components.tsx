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

/* Fiber UI Hooks Examples IMPORT */
import * as UseLocalStorageStateExamples from "./hooks/examples/use-local-storage-state";
import * as UseSessionStorageStateExamples from "./hooks/examples/use-session-storage-state";
import * as UseIsMountedExamples from "./hooks/examples/use-is-mounted";
import * as UseBatteryExamples from "./hooks/examples/use-battery";
import * as UseIndexedDBExamples from "./hooks/examples/use-indexed-db";
import * as UseMediaDevicesExamples from "./hooks/examples/use-media-devices";
import * as UseGeolocationExamples from "./hooks/examples/use-geolocation";
import * as UseClipboardExamples from "./hooks/examples/use-clipboard";
import * as UseDebouncedStateExamples from "./hooks/examples/use-debounced-state";
import * as UseDebouncedCallbackExamples from "./hooks/examples/use-debounced-callback";
import * as UseThrottledStateExamples from "./hooks/examples/use-throttled-state";
import * as UseThrottledCallbackExamples from "./hooks/examples/use-throttled-callback";

/* ------------------------------------*/

import { ComponentsListView } from "./components/components-list-view";
import {
    HookCodeFromFile,
    HookExampleCodeFromFile,
} from "./components/hook-code-from-file";
import {
    MdnIcon,
    WebDevIcon,
    ReactIcon,
    NextjsIcon,
} from "./components/external-icons";

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

        /* Fiber UI Hooks Examples */
        ...UseLocalStorageStateExamples,
        ...UseSessionStorageStateExamples,
        ...UseIsMountedExamples,
        ...UseBatteryExamples,
        ...UseIndexedDBExamples,
        ...UseMediaDevicesExamples,
        ...UseGeolocationExamples,
        ...UseClipboardExamples,
        ...UseDebouncedStateExamples,
        ...UseDebouncedCallbackExamples,
        ...UseThrottledStateExamples,
        ...UseThrottledCallbackExamples,

        Code: CodeFromFile,
        CodeFromFile,
        ComponentCode: ComponentCodeFromFile,
        HookExampleCodeFromFile,
        HookCodeFromFile,
        MdnIcon,
        WebDevIcon,
        ReactIcon,
        NextjsIcon,
    };
}
