// import "global.css";
import React from "react";
import {
    ChevronRight,
    Zap,
    Lock,
    Palette,
    Code2,
    Github,
    ArrowRight,
} from "lucide-react";

const DOCS_LINK = "https://docs.fiberui.com";
const DOCS_COMPONENTS_LINK = DOCS_LINK + "/components";

const GITHUB_LINK = "https://github.com/FiberUI/FiberUI";

const LICENSE_LINK =
    "https://github.com/FiberUI/FiberUI/blob/master/LICENSE.md";

// SVG Icon for the logo - a simple, abstract fiber-like shape
const FiberUIIcon = () => (
    <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-slate-800"
    >
        <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="currentColor"
            fillOpacity="0.1"
        />
        <path
            d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M18 12C18 8.69 15.31 6 12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2 2"
        />
    </svg>
);

export default function App() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-neutral-50 to-zinc-50 font-sans text-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            {/* Navigation */}
            <nav className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-slate-100/50 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/80">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <FiberUIIcon />
                        <span className="text-xl font-bold">Fiber UI</span>
                    </div>
                    <div className="hidden items-center gap-8 md:flex">
                        <a
                            href="#features"
                            className="text-slate-400 transition hover:text-slate-200"
                        >
                            Features
                        </a>
                        <a
                            href="#why"
                            className="text-slate-400 transition hover:text-slate-200"
                        >
                            Why Fiber UI
                        </a>
                        <a
                            href="#comparison"
                            className="text-slate-400 transition hover:text-slate-200"
                        >
                            Comparison
                        </a>
                    </div>
                    <a
                        href={GITHUB_LINK}
                        className="flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium transition hover:bg-gray-600"
                    >
                        <Github size={16} />
                        Github
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    {/* Badge */}
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 dark:border-slate-700 dark:bg-slate-800/50">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-600 dark:bg-cyan-400"></span>
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                            Open Source & Coming Soon
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="mb-6 bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-500 bg-clip-text text-5xl font-bold tracking-tighter text-transparent md:text-7xl dark:bg-gradient-to-r dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-400">
                        Beautiful, Accessible React Components
                    </h1>

                    {/* Subheading */}
                    <p className="mb-4 text-xl text-slate-400 md:text-2xl">
                        Copy. Paste. Customize.
                    </p>
                    <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-500">
                        Built with{" "}
                        <div className="inline-block skew-x-12 transform bg-cyan-600 px-3 py-2">
                            <div className="-skew-x-12 font-semibold text-white">
                                React Aria hooks
                            </div>
                        </div>{" "}
                        from Adobe for accessibility-first design and{" "}
                        <div className="inline-block -skew-x-12 bg-blue-600 px-3 py-2">
                            <div className="skew-x-12 break-inside-avoid font-semibold text-white">
                                Tailwind CSS
                            </div>
                        </div>{" "}
                        for styling. Inspired by shadcn/ui&apos;s philosophy,
                        but with accessibility baked in.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href={DOCS_LINK}
                            className="flex transform items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold transition hover:scale-105 hover:from-cyan-400 hover:to-blue-500"
                        >
                            Get Started
                            <ArrowRight size={20} />
                        </a>
                        <a
                            href={DOCS_COMPONENTS_LINK}
                            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-8 py-3 font-semibold transition hover:bg-slate-700"
                        >
                            View Components
                            <ChevronRight size={20} />
                        </a>
                    </div>

                    {/* Tech Stack */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="flex items-center justify-center gap-3 rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-3">
                            <Zap size={20} className="text-cyan-400" />
                            <span className="text-slate-300">
                                React Aria Hooks
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-3 rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-3">
                            <Palette size={20} className="text-blue-400" />
                            <span className="text-slate-300">
                                Tailwind CSS Styled
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-3 rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-3">
                            <Lock size={20} className="text-emerald-400" />
                            <span className="text-slate-300">
                                Fully Customizable
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="border-t border-slate-800 px-4 py-20 sm:px-6 lg:px-8"
            >
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-12 text-center text-4xl font-bold">
                        Why Choose Fiber UI?
                    </h2>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Feature 1 */}
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 transition hover:border-cyan-500/30 hover:bg-cyan-500/10">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/25">
                                <Code2 size={24} className="text-cyan-400" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">
                                Copy & Paste
                            </h3>
                            <p className="text-slate-400">
                                Components are yours to own. Copy the code into
                                your project and customize it however you need.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 transition hover:border-blue-500/30 hover:bg-blue-500/10">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/25">
                                <Lock size={24} className="text-blue-400" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">
                                Accessibility First
                            </h3>
                            <p className="text-slate-400">
                                Built with React Aria hooks from Adobe.
                                Enterprise-grade accessibility features come
                                standard with every component.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 transition hover:border-emerald-500/30 hover:bg-emerald-500/10">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/25">
                                <Palette
                                    size={24}
                                    className="text-emerald-400"
                                />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">
                                Fully Customizable
                            </h3>
                            <p className="text-slate-400">
                                Unstyled by default. Use Tailwind CSS to style
                                components exactly how your design system
                                requires.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 transition hover:border-purple-500/30 hover:bg-purple-500/10">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/25">
                                <Zap size={24} className="text-purple-400" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">
                                No Lock-in
                            </h3>
                            <p className="text-slate-400">
                                No dependencies. No version constraints. You
                                control the code, not a library author.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section
                id="comparison"
                className="border-t border-slate-800 px-4 py-20 sm:px-6 lg:px-8"
            >
                <div className="mx-auto max-w-4xl">
                    <h2 className="mb-4 text-center text-4xl font-bold">
                        How Does Fiber UI Compare?
                    </h2>
                    <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-slate-400">
                        Similar philosophy to shadcn/ui, but built with React
                        Aria for better accessibility out of the box.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6">
                            <h3 className="mb-4 text-xl font-semibold text-cyan-400">
                                Like shadcn/ui
                            </h3>
                            <ul className="space-y-3 text-slate-300">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 text-emerald-400">
                                        ✓
                                    </span>
                                    <span>
                                        Copy and paste components into your
                                        codebase
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 text-emerald-400">
                                        ✓
                                    </span>
                                    <span>Unstyled and fully customizable</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 text-emerald-400">
                                        ✓
                                    </span>
                                    <span>Built with Tailwind CSS</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 text-emerald-400">
                                        ✓
                                    </span>
                                    <span>You own the code, not a library</span>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-6">
                            <h3 className="mb-4 text-xl font-semibold text-blue-400">
                                What Makes Fiber UI Different
                            </h3>
                            <ul className="space-y-3 text-slate-300">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 text-emerald-400">
                                        ✨
                                    </span>
                                    <span>
                                        Built with{" "}
                                        <strong>React Aria hooks</strong> from
                                        Adobe for accessibility
                                    </span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="mt-1 text-emerald-400">
                                        ✨
                                    </span>
                                    <span>
                                        Enterprise-grade accessibility out of
                                        the box
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 text-emerald-400">
                                        ✨
                                    </span>
                                    <span>
                                        Complete control over accessibility
                                        implementation
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Example Section */}
            <section
                id="why"
                className="border-t border-slate-800 px-4 py-20 sm:px-6 lg:px-8"
            >
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-12 text-center text-4xl font-bold">
                        Why React Aria Matters
                    </h2>

                    <div className="grid items-center gap-8 md:grid-cols-2">
                        <div>
                            <p className="mb-6 text-lg text-slate-300">
                                While shadcn/ui is excellent, it uses Radix UI.
                            </p>
                            <p className="mb-6 text-slate-400">
                                Fiber UI takes a different approach: every
                                component is built using React Aria hooks from
                                Adobe. This means you get enterprise-grade
                                accessibility features copy-pasted directly into
                                your codebase with full control.
                            </p>
                            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
                                <p className="mb-2 font-semibold text-emerald-400">
                                    ✨ Key Benefit
                                </p>
                                <p className="text-slate-300">
                                    You own the code. You own the accessibility
                                    implementation. No version lock-in, no
                                    dependency hell.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-8 font-mono text-sm">
                            <div className="mb-4 text-cyan-400">
                                # Get started with Fiber UI
                            </div>
                            <div className="space-y-3 text-slate-300">
                                <div>
                                    <span className="text-slate-500">$</span>{" "}
                                    npx fibercli init
                                </div>
                                <div className="my-2 text-slate-500">
                                    Setting up your project...
                                </div>
                                <div>
                                    <span className="text-slate-500">$</span>{" "}
                                    npx fibercli add button
                                </div>
                                <div className="text-emerald-400">
                                    ✅ Button component added!
                                </div>
                                <div className="mt-4 text-slate-500">
                                    Start building accessible UIs immediately.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="border-t border-slate-800 px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-6 text-4xl font-bold">Ready to Build?</h2>
                    <p className="mb-8 text-xl text-slate-400">
                        Join the community building beautiful, accessible React
                        applications.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href={DOCS_LINK}
                            className="flex transform items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold transition hover:scale-105 hover:from-cyan-400 hover:to-blue-500"
                        >
                            Get Started Now
                            <ArrowRight size={20} />
                        </a>
                        <a
                            href={GITHUB_LINK}
                            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-8 py-3 font-semibold transition hover:bg-slate-700"
                        >
                            <Github size={20} />
                            Star on GitHub
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 grid gap-8 md:grid-cols-4">
                        <div>
                            <div className="mb-4 flex items-center gap-2">
                                <FiberUIIcon />
                                <span className="font-bold">Fiber UI</span>
                            </div>
                            <p className="text-sm text-slate-400">
                                Beautiful, accessible React components built
                                with React Aria hooks and Tailwind CSS.
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold">Resources</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li>
                                    <a
                                        href={DOCS_LINK}
                                        className="hover:text-slate-200"
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={DOCS_COMPONENTS_LINK}
                                        className="hover:text-slate-200"
                                    >
                                        Components
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-slate-200"
                                    >
                                        Examples
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold">Community</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li>
                                    <a
                                        href={DOCS_LINK}
                                        className="hover:text-slate-200"
                                    >
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-slate-200"
                                    >
                                        Discord
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-slate-200"
                                    >
                                        Twitter
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold">Company</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-slate-200"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={LICENSE_LINK}
                                        className="hover:text-slate-200"
                                    >
                                        License
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-slate-200"
                                    >
                                        Contributing
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                        <p>
                            &copy; {new Date().getFullYear()} Fiber UI. MIT
                            License.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
