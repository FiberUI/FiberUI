import { JSX } from "react";

interface ComparisonSectionProps {}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({}) => {
    return (
        <section
            id="comparison"
            className="border-t border-slate-800 px-4 py-20 sm:px-6 lg:px-8"
        >
            <div className="mx-auto max-w-4xl">
                <h2 className="text-gradient mb-4 text-center font-serif text-4xl font-bold">
                    How Does Fiber UI Compare?
                </h2>

                <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-slate-400">
                    Similar philosophy to shadcn/ui, but built with React Aria
                    for better accessibility out of the box.
                </p>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Like shadcn */}
                    <FeatureCard
                        title="Like shadcn/ui"
                        titleClass="text-cyan-400"
                        containerClass="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6"
                        icon="✓"
                        features={[
                            "Copy and paste components into your codebase",
                            "Unstyled and fully customizable",
                            "Built with Tailwind CSS",
                            "You own the code, not a library",
                        ]}
                    />

                    {/* Fiber UI unique */}
                    <FeatureCard
                        title="What Makes Fiber UI Different"
                        titleClass="text-blue-400"
                        containerClass="rounded-xl border border-blue-500/30 bg-blue-500/10 p-6"
                        icon="✨"
                        features={[
                            <>
                                Built with <strong>React Aria hooks</strong>{" "}
                                from Adobe for accessibility
                            </>,
                            "Enterprise-grade accessibility out of the box",
                            "Complete control over accessibility implementation",
                        ]}
                    />
                </div>
            </div>
        </section>
    );
};

{
    /* ✅ Reusable Card Component */
}
const FeatureCard = ({
    title,
    titleClass,
    containerClass,
    icon,
    features,
}: {
    title: string;
    titleClass: string;
    containerClass: string;
    icon: string;
    features: Array<string | JSX.Element>;
}) => (
    <div className={containerClass}>
        <h3 className={`mb-4 text-xl font-semibold ${titleClass}`}>{title}</h3>
        <ul className="space-y-3 text-slate-300">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 text-emerald-400">{icon}</span>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);
