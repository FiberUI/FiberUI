"use client";

import Link from "next/link";
import { Button } from "@repo/ui/components/button";
import { Tabs, TabList, Tab, TabPanel } from "@repo/ui/components/tabs";
import { Home, KeyRound, LayoutDashboard, Mail } from "lucide-react";

import {
    // Home tab blocks
    PaymentBlock,
    ChatInputBlock,
    AppearanceBlock,
    ActionBarBlock,
    StatesBlock,
    SearchBlock,
    FormBlock,
    SettingsBlock,
    TabsBlock,
    TeamBlock,
    NavigationBlock,
    ColorPickerBlock,
    OverlaysBlock,
    // Auth tab blocks
    AuthLoginBlock,
    AuthSignupBlock,
    // Dashboard tab blocks
    DashboardStatsBlock,
    DashboardActivityBlock,
    DashboardProgressBlock,
    // Email tab blocks
    EmailListBlock,
    EmailComposeBlock,
    EmailActionsBlock,
} from "../../components/showcase/blocks";
import {
    WithContext as JsonLdSchema,
    SoftwareApplication,
    WebSite,
} from "schema-dts";

const baseUrl = "https://r.fiberui.com";

const webAppJsonLd: JsonLdSchema<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FiberUI",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    url: baseUrl,
    author: {
        "@type": "Person",
        name: "Rajat Verma",
        url: "https://x.com/rajatverma3112",
    },
    publisher: {
        "@type": "Organization",
        name: "FiberUI",
        logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.svg`,
        },
    },
    abstract:
        "Fiber UI is a comprehensive library of accessible React components and production-ready hooks. Built with Tailwind CSS and React Aria, it provides a complete stack for building modern, type-safe web applications, including advanced WebRTC hooks for real-time communication.",
};

const webSiteJsonLd: JsonLdSchema<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FiberUI",
    url: baseUrl,
    author: {
        "@type": "Person",
        name: "Rajat Verma",

        url: "https://x.com/rajatverma3112",
    },
    publisher: {
        "@type": "Organization",
        name: "FiberUI",
        logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.svg`,
        },
    },

    abstract:
        "Fiber UI is a comprehensive library of accessible React components and production-ready hooks. Built with Tailwind CSS and React Aria, it provides a complete stack for building modern, type-safe web applications, including advanced WebRTC hooks for real-time communication.",
};

export default function ShowcasePage() {
    return (
        <main className="min-h-screen py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(webAppJsonLd),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(webSiteJsonLd),
                }}
            />
            <div className="container mx-auto px-4">
                {/* Hero */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        <span className="text-gradient">Fiber UI</span>
                    </h1>
                    <p className="text-muted-foreground mt-3 text-lg">
                        Beautiful, accessible React components built with React
                        Aria
                    </p>
                </div>

                {/* Header CTA */}
                <div className="mx-auto my-16 max-w-2xl text-center">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/docs/components">
                            <Button variant="default" size="lg">
                                Browse Components
                            </Button>
                        </Link>
                        <Link href="/docs/hooks">
                            <Button variant="default" size="lg">
                                Browse Hooks
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Tabbed Showcase */}
                <Tabs defaultSelectedKey="home" className="mx-auto max-w-7xl">
                    <div className="mb-6 flex justify-center">
                        <TabList className="bg-muted/50 border">
                            <Tab id="home">
                                <Home className="size-4" />
                                Home
                            </Tab>
                            <Tab id="auth">
                                <KeyRound className="size-4" />
                                Auth
                            </Tab>
                            <Tab id="dashboard">
                                <LayoutDashboard className="size-4" />
                                Dashboard
                            </Tab>
                            <Tab id="email">
                                <Mail className="size-4" />
                                Email
                            </Tab>
                        </TabList>
                    </div>

                    {/* Home Tab */}
                    <TabPanel id="home">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            <div className="flex flex-col gap-6">
                                <PaymentBlock />
                                <ColorPickerBlock />
                            </div>
                            <div className="flex flex-col gap-6">
                                <SearchBlock />
                                <AppearanceBlock />
                                <ChatInputBlock />
                            </div>
                            <div className="flex flex-col gap-6">
                                <FormBlock />
                                <OverlaysBlock />
                                <StatesBlock />
                            </div>
                            <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-1">
                                <TabsBlock />
                                <ActionBarBlock />
                                <TeamBlock />
                                <SettingsBlock />
                                <NavigationBlock />
                            </div>
                        </div>
                    </TabPanel>

                    {/* Auth Tab */}
                    <TabPanel id="auth">
                        <div className="flex flex-wrap justify-center gap-8">
                            <AuthLoginBlock />
                            <AuthSignupBlock />
                        </div>
                    </TabPanel>

                    {/* Dashboard Tab */}
                    <TabPanel id="dashboard">
                        <div className="grid gap-6 lg:grid-cols-2">
                            <DashboardStatsBlock />
                            <DashboardProgressBlock />
                            <div className="lg:col-span-2">
                                <DashboardActivityBlock />
                            </div>
                        </div>
                    </TabPanel>

                    {/* Email Tab */}
                    <TabPanel id="email">
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="space-y-4">
                                <EmailActionsBlock />
                                <EmailListBlock />
                            </div>
                            <EmailComposeBlock />
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </main>
    );
}
