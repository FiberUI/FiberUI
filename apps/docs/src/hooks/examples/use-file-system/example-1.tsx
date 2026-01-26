"use client";

import { useFileSystem } from "@repo/hooks/storage/use-file-system";
import { Button } from "@repo/ui/components/button";
import { FileText, Save, FolderOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function Example1() {
    const { openFile, saveFile, saveFileAs, file, isLoading, isSupported } =
        useFileSystem();
    const [content, setContent] = useState("");

    // Read file content when file changes
    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setContent((e.target?.result as string) || "");
            };
            reader.readAsText(file);
        }
    }, [file]);

    const handleOpen = async () => {
        try {
            await openFile({
                types: [
                    {
                        description: "Text Files",
                        accept: {
                            "text/plain": [".txt", ".md", ".json"],
                        },
                    },
                ],
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async () => {
        if (!file) {
            handleSaveAs();
            return;
        }

        const success = await saveFile(content);
        if (success) toast.success("File saved successfully!");
    };

    const handleSaveAs = async () => {
        const success = await saveFileAs(content, {
            types: [
                {
                    description: "Text Files",
                    accept: {
                        "text/plain": [".txt"],
                    },
                },
            ],
        });
        if (success) toast.success("File saved as new file!");
    };

    if (!isSupported) {
        return (
            <div className="rounded-md bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                File System Access API is not supported in this browser.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 border-b pb-4">
                <Button
                    onClick={handleOpen}
                    isDisabled={isLoading}
                    variant="outline"
                >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Open File
                </Button>
                <Button onClick={handleSave} isDisabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                </Button>
                <Button
                    onClick={handleSaveAs}
                    isDisabled={isLoading}
                    variant="secondary"
                >
                    <FileText className="mr-2 h-4 w-4" />
                    Save As...
                </Button>

                {file && (
                    <div className="text-muted-foreground ml-auto text-sm">
                        Editing:{" "}
                        <span className="text-foreground font-medium">
                            {file.name}
                        </span>
                    </div>
                )}
            </div>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="focus:ring-ring min-h-[200px] w-full rounded-md border bg-transparent p-4 font-mono text-sm shadow-sm outline-none focus:ring-1"
                placeholder="Type something or open a text file..."
            />
        </div>
    );
}
