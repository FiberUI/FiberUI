"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Card, CardContent } from "@repo/ui/components/card";
import { Mic, Send, Paperclip } from "lucide-react";

export const ChatInputBlock = () => {
    const [message, setMessage] = useState("");

    return (
        <Card>
            <CardContent className="p-3">
                <div className="flex items-end gap-2">
                    <Button size="icon" variant="ghost" className="shrink-0">
                        <Paperclip className="size-4" />
                    </Button>
                    <div className="flex-1">
                        <Input
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="border-0 bg-transparent focus-visible:ring-0"
                        />
                    </div>
                    <Button size="icon" variant="ghost" className="shrink-0">
                        <Mic className="size-4" />
                    </Button>
                    <Button size="icon" className="shrink-0">
                        <Send className="size-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
