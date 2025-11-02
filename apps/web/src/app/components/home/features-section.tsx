import { Code2, Lock, Palette, Zap, LucideIcon } from "lucide-react";

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
    iconBgColor: string;
    iconColor: string;
    featureHoverBgClass: string;
    featureHoverBorderClass: string;
}

export interface FeaturesSectionProps {}

const features: Feature[] = [
    {
        icon: Code2,
        title: "Copy & Paste",
        description:
            "Components are yours to own. Copy the code into your project and customize it however you need.",
        color: "cyan",
        iconBgColor: "bg-cyan-500/25",
        iconColor: "text-cyan-400",
        featureHoverBgClass: "hover:bg-cyan-500/10",
        featureHoverBorderClass: "hover:border-cyan-500/30",
    },
    {
        icon: Lock,
        title: "Accessibility First",
        description:
            "Built with React Aria hooks from Adobe. Enterprise-grade accessibility features come standard with every component.",
        color: "blue",
        iconBgColor: "bg-blue-500/25",
        iconColor: "text-blue-400",
        featureHoverBgClass: "hover:bg-blue-500/10",
        featureHoverBorderClass: "hover:border-blue-500/30",
    },
    {
        icon: Palette,
        title: "Fully Customizable",
        description:
            "Unstyled by default. Use Tailwind CSS to style components exactly how your design system requires.",
        color: "emerald",
        iconBgColor: "bg-emerald-500/25",
        iconColor: "text-emerald-400",
        featureHoverBgClass: "hover:bg-emerald-500/10",
        featureHoverBorderClass: "hover:border-emerald-500/30",
    },
    {
        icon: Zap,
        title: "No Lock-in",
        description:
            "No dependencies. No version constraints. You control the code, not a library author.",
        color: "purple",
        iconBgColor: "bg-purple-500/25",
        iconColor: "text-purple-400",
        featureHoverBgClass: "hover:bg-purple-500/10",
        featureHoverBorderClass: "hover:border-purple-500/30",
    },
];

const FeatureCard: React.FC<Feature> = ({
    icon: Icon,
    title,
    description,
    iconBgColor,
    iconColor,
    featureHoverBgClass,
    featureHoverBorderClass,
}) => {
    return (
        <div
            className={`rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 transition ${featureHoverBgClass} ${featureHoverBorderClass}`}
        >
            <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${iconBgColor}`}
            >
                <Icon size={24} className={iconColor} />
            </div>
            <h3 className="mb-2 font-serif text-xl font-semibold">{title}</h3>
            <p className="text-slate-400">{description}</p>
        </div>
    );
};

export const FeaturesSection: React.FC<FeaturesSectionProps> = () => {
    return (
        <section
            id="features"
            className="border-t border-slate-800 px-4 py-20 sm:px-6 lg:px-8"
        >
            <div className="mx-auto max-w-6xl">
                <h2 className="text-gradient mb-12 text-center font-serif text-4xl font-bold">
                    Why Choose Fiber UI?
                </h2>

                <div className="grid gap-8 md:grid-cols-2">
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};
