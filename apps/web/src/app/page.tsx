// import "global.css";

import {
    ComparisonSection,
    CTASection,
    FeaturesSection,
    FooterSection,
    HeroSection,
    NavigationSection,
    ReactAriaSection,
} from "./components/home";

const DOCS_LINK = "https://docs.fiberui.com/docs";
const DOCS_COMPONENTS_LINK = DOCS_LINK + "/components";

const GITHUB_LINK = "https://github.com/FiberUI/FiberUI";

const LICENSE_LINK =
    "https://github.com/FiberUI/FiberUI/blob/master/LICENSE.md";

export default function App() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-neutral-50 to-zinc-50 font-sans text-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <NavigationSection githubLink={GITHUB_LINK} />

            <HeroSection
                docsUrl={DOCS_LINK}
                componentsUrl={DOCS_COMPONENTS_LINK}
            />

            <FeaturesSection />

            <ComparisonSection />

            <ReactAriaSection />

            <CTASection docsLink={DOCS_LINK} githubLink={GITHUB_LINK} />

            <FooterSection
                docsLink={DOCS_LINK}
                docsComponentsLink={DOCS_COMPONENTS_LINK}
                licenseLink={LICENSE_LINK}
            />
        </div>
    );
}
