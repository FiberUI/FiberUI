"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Zap, Palette, Lock } from "lucide-react";

interface HeroSectionProps {
    docsUrl: string;
    componentsUrl: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    docsUrl,
    componentsUrl,
}) => {
    return (
        <section className="px-4 pt-32 pb-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <HeroBadge />

                <h1 className="mb-6 bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-500 bg-clip-text font-serif text-5xl font-extrabold tracking-tighter text-transparent md:text-7xl dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-400">
                    Beautiful, Accessible React Components
                </h1>

                <HeroSubheading />

                <HeroCTA docsUrl={docsUrl} componentsUrl={componentsUrl} />

                <TechStack />
            </div>
        </section>
    );
};

const HeroBadge = () => (
    <div className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 dark:border-slate-700 dark:bg-slate-800/50">
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-600 dark:bg-cyan-400"></span>
        <span className="text-sm text-slate-700 dark:text-slate-300">
            Open Source & Coming Soon
        </span>
    </div>
);

const HeroSubheading = () => (
    <>
        <p className="mb-4 text-xl text-slate-400 md:text-2xl">
            Copy. Paste. Customize.
        </p>

        <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-500">
            Built with{" "}
            <span className="inline-block skew-x-12 bg-cyan-600 px-3 py-2">
                <span className="block -skew-x-12 font-semibold text-white">
                    React Aria hooks
                </span>
            </span>{" "}
            from Adobe for accessibility-first design and{" "}
            <span className="inline-block -skew-x-12 bg-blue-600 px-3 py-2">
                <span className="block skew-x-12 font-semibold text-white">
                    Tailwind CSS
                </span>
            </span>{" "}
            for styling. Inspired by shadcn/ui&apos;s philosophy, but with
            accessibility baked in.
        </p>
    </>
);

const HeroCTA = ({
    docsUrl,
    componentsUrl,
}: {
    docsUrl: string;
    componentsUrl: string;
}) => (
    <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
            href={docsUrl}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold transition hover:scale-105 hover:from-cyan-400 hover:to-blue-500"
        >
            Get Started
            <ArrowRight size={18} />
        </Link>

        <Link
            href={componentsUrl}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-8 py-3 font-semibold transition hover:bg-slate-700"
        >
            View Components
            <ChevronRight size={18} />
        </Link>
    </div>
);

const techItems = [
    {
        icon: Zap,
        label: "React Aria Hooks",
        color: "text-cyan-400",
        containerClasses: "bg-cyan-400/10 border-cyan-400/30",
        textColor: "text-cyan-400",
    },
    {
        icon: Palette,
        label: "Tailwind CSS Styled",
        color: "text-purple-400",
        containerClasses: "bg-purple-400/10 border-purple-400/30",
        textColor: "text-purple-400",
    },
    {
        icon: Lock,
        label: "Fully Customizable",
        color: "text-emerald-400",
        containerClasses: "bg-emerald-400/10 border-emerald-400/30",
        textColor: "text-emerald-400",
    },
];

const TechStack = () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {techItems.map(
            ({ icon: Icon, label, color, containerClasses, textColor }, i) => (
                <div
                    key={i}
                    className={`-bg-slate-800/50 flex items-center justify-center gap-3 rounded-lg border ${containerClasses} px-4 py-3`}
                >
                    <Icon size={20} className={color} />
                    <span
                        className={`${textColor ? textColor : "bg-slate-300"}`}
                    >
                        {label}
                    </span>
                </div>
            ),
        )}
    </div>
);
