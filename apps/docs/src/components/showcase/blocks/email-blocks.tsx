"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Badge } from "@repo/ui/components/badge";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Separator } from "@repo/ui/components/separator";
import {
    Star,
    Trash2,
    Archive,
    Reply,
    Forward,
    MoreVertical,
    Paperclip,
    Send,
    Search,
} from "lucide-react";
import { Textarea } from "@repo/ui/components/textarea";

const emails = [
    {
        from: "Emma Watson",
        subject: "Project Update - Q4 Goals",
        preview: "Hi team, I wanted to share the latest updates on our Q4...",
        time: "10:30 AM",
        unread: true,
        starred: true,
    },
    {
        from: "GitHub",
        subject: "New pull request in fiber-ui",
        preview: "@mike has opened a new pull request #142 in fiber-ui...",
        time: "9:15 AM",
        unread: true,
        starred: false,
    },
    {
        from: "Stripe",
        subject: "Payment received - Invoice #1234",
        preview: "You received a payment of $499.00 from Acme Inc...",
        time: "Yesterday",
        unread: false,
        starred: false,
    },
    {
        from: "Sarah Johnson",
        subject: "Re: Design feedback",
        preview: "Thanks for the feedback! I've made the changes you...",
        time: "Yesterday",
        unread: false,
        starred: true,
    },
];

export const EmailListBlock = () => {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="border-b pb-3">
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                        <Input
                            placeholder="Search emails..."
                            className="pl-9"
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {emails.map((email, i) => (
                    <div key={i}>
                        <div
                            className={`hover:bg-muted/50 flex cursor-pointer items-start gap-3 p-4 transition-colors ${email.unread ? "bg-muted/30" : ""}`}
                        >
                            <Checkbox className="mt-1" />
                            <button className="mt-1">
                                <Star
                                    className={`size-4 ${email.starred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                />
                            </button>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`text-sm ${email.unread ? "font-semibold" : "font-medium"}`}
                                    >
                                        {email.from}
                                    </span>
                                    <span className="text-muted-foreground text-xs">
                                        {email.time}
                                    </span>
                                </div>
                                <p
                                    className={`text-sm ${email.unread ? "font-medium" : ""}`}
                                >
                                    {email.subject}
                                </p>
                                <p className="text-muted-foreground truncate text-xs">
                                    {email.preview}
                                </p>
                            </div>
                        </div>
                        {i < emails.length - 1 && <Separator />}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export const EmailComposeBlock = () => {
    return (
        <Card className="flex h-full flex-col">
            <CardHeader className="border-b pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base">New Message</CardTitle>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon-sm">
                            <Paperclip className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm">
                            <MoreVertical className="size-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-12 text-sm">
                        To:
                    </span>
                    <Input placeholder="Recipients" className="flex-1" />
                </div>
                <Separator />
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-12 text-sm">
                        Subject:
                    </span>
                    <Input placeholder="Subject" className="flex-1" />
                </div>
                <Separator />
                <Textarea
                    placeholder="Write your message..."
                    className="min-h-[120px] flex-1 resize-none"
                />
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon-sm">
                            <Paperclip className="size-4" />
                        </Button>
                    </div>
                    <Button>
                        <Send className="mr-2 size-4" />
                        Send
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export const EmailActionsBlock = () => {
    return (
        <Card>
            <CardContent className="flex items-center justify-between p-3">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm">
                        <Reply className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                        <Forward className="size-4" />
                    </Button>
                    <Separator orientation="vertical" className="mx-1 h-6" />
                    <Button variant="ghost" size="icon-sm">
                        <Archive className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                        <Trash2 className="size-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">Inbox</Badge>
                    <span className="text-muted-foreground text-sm">
                        1 of 24
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};
