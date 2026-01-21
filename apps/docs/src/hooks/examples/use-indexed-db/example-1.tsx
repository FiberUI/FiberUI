"use client";

import { useState } from "react";
import { useIndexedDB } from "@repo/hooks/storage/use-indexed-db";

interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: number;
}

/* BASIC USAGE - Notes App */
export const Example1 = () => {
    const {
        data: notes,
        add,
        remove,
        isLoading,
        isSupported,
        error,
    } = useIndexedDB<Note>({
        dbName: "notesApp",
        storeName: "notes",
        keyPath: "id",
    });

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    if (!isSupported) {
        return (
            <div className="rounded-md border border-yellow-500/50 bg-yellow-500/10 p-4">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    IndexedDB is not supported in this browser
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <span className="text-muted-foreground text-sm">Loading...</span>
        );
    }

    const handleAdd = async () => {
        if (!title.trim()) return;
        await add({
            id: crypto.randomUUID(),
            title,
            content,
            createdAt: Date.now(),
        });
        setTitle("");
        setContent("");
    };

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex flex-col gap-2">
                <input
                    className="bg-background rounded-md border px-3 py-2 text-sm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note title..."
                />
                <textarea
                    className="bg-background rounded-md border px-3 py-2 text-sm"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Note content..."
                    rows={2}
                />
                <button
                    className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm"
                    onClick={handleAdd}
                >
                    Add Note
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {notes.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                        No notes yet
                    </p>
                ) : (
                    notes.map((note) => (
                        <div
                            key={note.id}
                            className="flex items-start justify-between rounded-md border p-3"
                        >
                            <div>
                                <h4 className="text-sm font-medium">
                                    {note.title}
                                </h4>
                                <p className="text-muted-foreground text-xs">
                                    {note.content}
                                </p>
                            </div>
                            <button
                                className="text-destructive hover:text-destructive/80"
                                onClick={() => remove(note.id)}
                            >
                                ×
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
