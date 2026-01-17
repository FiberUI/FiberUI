import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Textarea } from "@repo/ui/components/textarea";
import { Search, Mail, Lock, User } from "lucide-react";

export const InputShowcase = () => {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Input & Textarea</h2>
                <p className="text-muted-foreground mt-1">
                    Form input components for collecting user data
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="default-input">Default Input</Label>
                    <Input id="default-input" placeholder="Enter text..." />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email-input">Email</Label>
                    <Input
                        id="email-input"
                        type="email"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password-input">Password</Label>
                    <Input
                        id="password-input"
                        type="password"
                        placeholder="••••••••"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="disabled-input">Disabled</Label>
                    <Input
                        id="disabled-input"
                        disabled
                        placeholder="Disabled input"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="file-input">File Upload</Label>
                    <Input id="file-input" type="file" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="search-input">Search</Label>
                    <Input
                        id="search-input"
                        type="search"
                        placeholder="Search..."
                    />
                </div>

                <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="textarea">Textarea</Label>
                    <Textarea
                        id="textarea"
                        placeholder="Write your message here..."
                        rows={4}
                    />
                </div>
            </div>
        </section>
    );
};
