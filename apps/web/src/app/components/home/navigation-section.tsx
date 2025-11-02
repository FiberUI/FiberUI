import { FiberUILogo } from "@repo/ui/components/logo/fiberui-logo";
import { Github } from "lucide-react";

const NAV_LINKS = [
    { href: "#features", label: "Features" },
    { href: "#why", label: "Why Fiber UI" },
    { href: "#comparison", label: "Comparison" },
];

interface NavigationSectionProps {
    githubLink: string;
}

export const NavigationSection: React.FC<NavigationSectionProps> = ({
    githubLink,
}) => {
    return (
        <>
            <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-slate-100/50 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/80">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 font-serif">
                        <FiberUILogo />
                        <span className="text-xl font-bold">Fiber UI</span>
                    </div>

                    <div className="hidden items-center gap-8 md:flex">
                        {NAV_LINKS.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* GitHub Button */}
                    <a
                        href={githubLink}
                        className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                    >
                        <Github size={16} />
                        GitHub
                    </a>
                </div>
            </nav>
        </>
    );
};
