import { ArrowRight, Github } from "lucide-react";

interface CTASectionProps {
    docsLink: string;
    githubLink: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
    docsLink,
    githubLink,
}) => {
    return (
        <section className="border-t border-slate-800 px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-gradient mb-6 font-serif text-4xl font-bold">
                    Ready to Build?
                </h2>
                <p className="mb-8 text-xl text-slate-400">
                    Join the community building beautiful, accessible React
                    applications.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        href={docsLink}
                        className="flex transform items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold transition hover:scale-105 hover:from-cyan-400 hover:to-blue-500"
                    >
                        Get Started Now
                        <ArrowRight size={20} />
                    </a>
                    <a
                        href={githubLink}
                        className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-8 py-3 font-semibold transition hover:bg-slate-700"
                    >
                        <Github size={20} />
                        Star on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};
