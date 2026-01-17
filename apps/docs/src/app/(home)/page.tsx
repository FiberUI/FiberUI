import Link from "next/link";
import { Button } from "@repo/ui/components/button";

import {
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
} from "../../components/showcase/blocks";

export default function ShowcasePage() {
    return (
        <main className="min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Hero */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Fiber UI
                        </span>
                    </h1>
                    <p className="text-muted-foreground mt-3 text-lg">
                        Beautiful, accessible React components
                    </p>
                </div>

                {/* Visual Grid Layout - Masonry style */}
                <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-6">
                        <PaymentBlock />
                        <ActionBarBlock />
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-6">
                        <SearchBlock />
                        <AppearanceBlock />
                        <ChatInputBlock />
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-6">
                        <FormBlock />
                        <StatesBlock />
                    </div>

                    {/* Column 4 */}
                    <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-1">
                        <TabsBlock />
                        <TeamBlock />
                        <SettingsBlock />
                        <NavigationBlock />
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="mx-auto mt-16 max-w-2xl text-center">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/docs">
                            <Button size="lg">Get Started</Button>
                        </Link>
                        <Link href="/docs/components">
                            <Button variant="outline" size="lg">
                                Browse Components
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
