interface ReactAriaSectionProps {}

export const ReactAriaSection: React.FC<ReactAriaSectionProps> = ({}) => {
    return (
        <section
            id="why"
            className="border-t border-slate-800 px-4 py-20 sm:px-6 lg:px-8"
        >
            <div className="mx-auto max-w-6xl">
                <h2 className="text-gradient mb-12 text-center font-serif text-4xl font-bold">
                    Why React Aria Matters
                </h2>

                <div className="grid items-center gap-10 md:grid-cols-2">
                    <LeftBlock />
                    <RightBlock />
                </div>
            </div>
        </section>
    );
};

const LeftBlock = () => {
    return (
        <>
            <div className="space-y-6">
                <p className="text-lg text-slate-300">
                    While shadcn/ui is excellent, it uses Radix UI.
                </p>

                <p className="text-slate-400">
                    Fiber UI takes a different approach: every component is
                    built using
                    <span className="font-semibold text-cyan-400">
                        {" "}
                        React Aria hooks
                    </span>{" "}
                    from Adobe — giving you enterprise-grade accessibility
                    built-in, without losing control.
                </p>

                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
                    <p className="mb-2 font-semibold text-emerald-400">
                        Key Benefit
                    </p>
                    <p className="text-slate-300">
                        You own the code. You own the accessibility layer. No
                        vendor lock-in. No dependency hell. True freedom.
                    </p>
                </div>
            </div>
        </>
    );
};

const RightBlock = () => {
    return (
        <>
            {" "}
            <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-8 font-mono text-sm">
                <div className="mb-4 text-cyan-400">
                    # Get started with Fiber UI
                </div>

                <div className="space-y-3 text-slate-300">
                    <div>
                        <span className="text-slate-500">$</span> npx fibercli
                        init
                    </div>

                    <div className="my-2 text-slate-500">
                        Setting up your project...
                    </div>

                    <div>
                        <span className="text-slate-500">$</span> npx fibercli
                        add button
                    </div>

                    <div className="text-emerald-400">
                        Done! Button component added!
                    </div>

                    <div className="mt-4 text-slate-500">
                        Start building accessible UIs immediately.
                    </div>
                </div>
            </div>
        </>
    );
};
