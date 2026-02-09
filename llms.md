# FiberUI Project Overview

A comprehensive guide to the FiberUI monorepo for LLM context.

---

## Project Structure

**Monorepo** managed with **TurboRepo** + **pnpm** workspaces.

```
fiberui/
├── apps/
│   ├── docs/          # Documentation site (Next.js + Fumadocs)
│   └── web/           # Main web application (Next.js)
├── packages/
│   ├── hooks/         # React hooks library
│   ├── ui/            # UI component library
│   ├── registry/      # Shadcn-style registry for CLI
│   ├── cli/           # CLI tools
│   └── *-config/      # Shared configs (eslint, ts, tailwind)
└── scripts/           # Build and utility scripts
```

---

## Component Architecture (`packages/ui`)

### Tech Stack

- **React Aria Components** - Accessible primitives
- **Tailwind Variants** - Variant-based styling (via `tv()`)
- **Class Variance Authority** - Additional variant utilities
- **Lucide React** - Icons
- **Motion** - Animations

### Component Pattern

```tsx
// packages/ui/src/components/button.tsx
"use client";

import { Button as AriaButton } from "react-aria-components";
import { tv, type VariantProps, cn } from "tailwind-variants";

export const buttonVariants = tv({
    base: "items-center... inline-flex",
    variants: {
        variant: {
            default: "bg-primary...",
            destructive: "bg-destructive...",
        },
        size: {
            default: "h-10 px-6",
            sm: "h-9 px-5",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const { variant, size, className, children, ...rest } = props;
        return (
            <AriaButton
                ref={ref}
                className={cn(buttonVariants({ variant, size }), className)}
                {...rest}
            >
                {children}
            </AriaButton>
        );
    },
);
```

### Available Components (25+)

`badge`, `breadcrumb`, `button`, `card`, `checkbox`, `color-area`, `color-wheel`, `input`, `label`, `list-box`, `loader`, `pagination`, `popover`, `select`, `separator`, `skeleton`, `slider`, `switch`, `tabs`, `text-field`, `textarea`, `toast`, `tooltip`

### Import Pattern

```tsx
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
```

---

## Hooks Architecture (`packages/hooks`)

### Directory Structure

Hooks are organized by semantic category:

| Category   | Hooks                                                                                                                                                                                                                         |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `device/`  | `use-battery`, `use-device-orientation`, `use-geolocation`, `use-media-devices`, `use-network`, `use-wake-lock`                                                                                                               |
| `dom/`     | `use-click-outside`, `use-portal`                                                                                                                                                                                             |
| `form/`    | `use-file-upload`                                                                                                                                                                                                             |
| `storage/` | `use-file-system`, `use-indexed-db`, `use-local-storage-state`, `use-session-storage-state`                                                                                                                                   |
| `utility/` | `use-clipboard`, `use-countdown`, `use-counter`, `use-debounced-callback`, `use-debounced-state`, `use-eye-dropper`, `use-is-mounted`, `use-picture-in-picture`, `use-share`, `use-throttled-callback`, `use-throttled-state` |
| `webrtc/`  | `use-audio-level`, `use-data-channel`, `use-peer-connection`, `use-screen-share`, `use-track-toggle`, `use-user-media`                                                                                                        |

### Import Pattern

```tsx
import { useDebouncedState } from "@repo/hooks/utility/use-debounced-state";
// OR default import
import useDebouncedState from "@repo/hooks/utility/use-debounced-state";
```

---

## Example System

### Structure

Examples live in `apps/docs/src/`:

- **Component examples**: `components/examples/<component-name>/`
- **Hook examples**: `hooks/examples/<hook-name>/`

Each example folder contains:

```
use-debounced-state/
├── example-1.tsx    # Basic usage
├── example-2.tsx    # Advanced usage
├── example-3.tsx    # Edge cases
└── index.tsx        # Re-exports with named aliases
```

### Index Pattern

```tsx
// apps/docs/src/hooks/examples/use-debounced-state/index.tsx
export { Example1 as UseDebouncedStateExample1 } from "./example-1";
export { Example2 as UseDebouncedStateExample2 } from "./example-2";
export { Example3 as UseDebouncedStateExample3 } from "./example-3";
```

### Registration

Examples must be registered in `apps/docs/src/mdx-components.tsx`:

```tsx
import * as UseDebouncedStateExamples from "./hooks/examples/use-debounced-state";

export function getMDXComponents() {
    return {
        ...UseDebouncedStateExamples,
        // ... other examples
    };
}
```

---

## MDX Documentation System

### Tech Stack

- **Fumadocs** - Documentation framework
- **Fumadocs MDX** - MDX processing
- **Zod** - Frontmatter validation

### MDX File Structure

Located in `apps/docs/content/docs/`:

```
content/docs/
├── components/
│   ├── button.mdx
│   ├── meta.json       # Navigation config
│   └── ...
├── hooks/
│   ├── (device)/       # Grouped categories
│   ├── (utility)/
│   ├── index.mdx
│   └── meta.json
└── index.mdx
```

### Frontmatter Schema

```yaml
---
title: useDebouncedState
description: A hook that delays updating a state value...
keywords:
    - useDebouncedState
    - react hook
    - debounce
---
```

### Custom MDX Components

#### ComponentShowcaseTabs

Tab-based preview/code display:

```mdx
<ComponentShowcaseTabs>
    <ComponentPreviewTab>
        <UseDebouncedStateExample1 />
    </ComponentPreviewTab>
    <ComponentCodeTab>
        <HookExampleCodeFromFile name="use-debounced-state" cnt={1} />
    </ComponentCodeTab>
</ComponentShowcaseTabs>
```

#### Code Display Components

| Component                                          | Purpose                             |
| -------------------------------------------------- | ----------------------------------- |
| `<Code name="button" cnt={1} />`                   | Component example code              |
| `<ComponentCode name="button" />`                  | Component source from `packages/ui` |
| `<HookExampleCodeFromFile name="..." cnt={N} />`   | Hook example code                   |
| `<HookCodeFromFile name="..." folder="utility" />` | Hook source from `packages/hooks`   |

### Code Display Implementation

Server components that read source files directly:

```tsx
// apps/docs/src/components/hook-code-from-file.tsx
const HookCodeFromFile = async ({ name, folder }) => {
    const filePath = `../../packages/hooks/src/${folder}/${name}.ts`;
    const code = fs.readFileSync(filePath, "utf8");
    const rendered = await highlight(code, { lang: "tsx", ... });
    return <CodeBlock>{rendered}</CodeBlock>;
};
```

---

## Development Workflow

### Commands

```bash
pnpm dev          # Start all dev servers
pnpm build        # Build all packages
pnpm lint         # Run linting
pnpm check-types  # TypeScript checks
```

### Adding a New Hook

1. Create hook file: `packages/hooks/src/<category>/<hook-name>.ts`
2. Create examples: `apps/docs/src/hooks/examples/<hook-name>/`
    - `example-1.tsx`, `example-2.tsx`, `index.tsx`
3. Register in `apps/docs/src/mdx-components.tsx`
4. Create docs: `apps/docs/content/docs/hooks/(<category>)/<hook-name>.mdx`

### Adding a New Component

1. Create component: `packages/ui/src/components/<name>.tsx`
2. Create examples: `apps/docs/src/components/examples/<name>/`
3. Register in `apps/docs/src/mdx-components.tsx`
4. Create docs: `apps/docs/content/docs/components/<name>.mdx`

---

## Quick Reference

| What                   | Where                                                  |
| ---------------------- | ------------------------------------------------------ |
| Hook source            | `packages/hooks/src/<category>/<hook>.ts`              |
| Component source       | `packages/ui/src/components/<component>.tsx`           |
| Hook examples          | `apps/docs/src/hooks/examples/<hook>/`                 |
| Component examples     | `apps/docs/src/components/examples/<component>/`       |
| Hook docs              | `apps/docs/content/docs/hooks/(<category>)/<hook>.mdx` |
| Component docs         | `apps/docs/content/docs/components/<component>.mdx`    |
| MDX component registry | `apps/docs/src/mdx-components.tsx`                     |
