import { FiberUILogo } from "@repo/ui/components/logo/fiberui-logo";

interface FooterSectionProps {
    docsLink: string;
    docsComponentsLink: string;
    licenseLink: string;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
    docsLink,
    docsComponentsLink,
    licenseLink,
}) => {
    return (
        <footer className="border-t border-slate-800 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Top Section */}
                <div className="mb-8 grid gap-8 md:grid-cols-4">
                    {/* Logo + Description */}
                    <div>
                        <div className="mb-4 flex items-center gap-2 font-serif">
                            <FiberUILogo />
                            <span className="font-bold">Fiber UI</span>
                        </div>
                        <p className="text-sm text-slate-400">
                            Beautiful, accessible React components built with
                            React Aria hooks and Tailwind CSS.
                        </p>
                    </div>

                    <FooterColumn
                        title="Resources"
                        links={[
                            { label: "Documentation", href: docsLink },
                            { label: "Components", href: docsComponentsLink },
                            { label: "Examples", href: "#" },
                        ]}
                    />

                    <FooterColumn
                        title="Community"
                        links={[
                            { label: "GitHub", href: docsLink },
                            { label: "Discord", href: "#" },
                            { label: "Twitter", href: "#" },
                        ]}
                    />

                    <FooterColumn
                        title="Company"
                        links={[
                            { label: "About", href: "#" },
                            { label: "License", href: licenseLink },
                            { label: "Contributing", href: "#" },
                        ]}
                    />
                </div>

                {/* Bottom Section */}
                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>
                        &copy; {new Date().getFullYear()} Fiber UI. MIT License.
                    </p>
                </div>
            </div>
        </footer>
    );
};

const FooterColumn = ({
    title,
    links,
}: {
    title: string;
    links: { label: string; href: string }[];
}) => (
    <div>
        <h4 className="mb-4 font-semibold">{title}</h4>
        <ul className="space-y-2 text-sm text-slate-400">
            {links.map((link) => (
                <FooterLink key={link.label} {...link} />
            ))}
        </ul>
    </div>
);

const FooterLink = ({ label, href }: { label: string; href: string }) => (
    <li>
        <a href={href} className="hover:text-slate-200">
            {label}
        </a>
    </li>
);
