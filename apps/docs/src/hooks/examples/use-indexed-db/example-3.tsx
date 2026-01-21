"use client";

import { useIndexedDB } from "@repo/hooks/storage/use-indexed-db";

interface Bookmark {
    id: string;
    url: string;
    title: string;
    tags: string[];
}

/* BOOKMARKS - With Tags */
export const Example3 = () => {
    const {
        data: bookmarks,
        add,
        remove,
        update,
        isLoading,
        isSupported,
    } = useIndexedDB<Bookmark>({
        dbName: "bookmarksApp",
        storeName: "bookmarks",
        keyPath: "id",
    });

    if (!isSupported) {
        return (
            <div className="rounded-md border border-yellow-500/50 bg-yellow-500/10 p-4">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    IndexedDB is not supported
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <span className="text-muted-foreground text-sm">Loading...</span>
        );
    }

    const sampleBookmarks: Bookmark[] = [
        {
            id: "1",
            url: "https://react.dev",
            title: "React Docs",
            tags: ["react", "docs"],
        },
        {
            id: "2",
            url: "https://nextjs.org",
            title: "Next.js",
            tags: ["nextjs", "framework"],
        },
        {
            id: "3",
            url: "https://github.com",
            title: "GitHub",
            tags: ["git", "code"],
        },
    ];

    const addBookmark = (bookmark: Bookmark) => {
        if (bookmarks.some((b) => b.id === bookmark.id)) return;
        add(bookmark);
    };

    const toggleTag = async (bookmark: Bookmark, tag: string) => {
        const newTags = bookmark.tags.includes(tag)
            ? bookmark.tags.filter((t) => t !== tag)
            : [...bookmark.tags, tag];
        await update({ ...bookmark, tags: newTags });
    };

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            {/* Add Buttons */}
            <div className="flex flex-wrap gap-2">
                {sampleBookmarks.map((b) => (
                    <button
                        key={b.id}
                        className="hover:bg-muted rounded-md border px-3 py-1.5 text-xs"
                        onClick={() => addBookmark(b)}
                    >
                        + {b.title}
                    </button>
                ))}
            </div>

            {/* Bookmarks List */}
            <div className="flex flex-col gap-2">
                {bookmarks.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                        No bookmarks saved
                    </p>
                ) : (
                    bookmarks.map((bookmark) => (
                        <div
                            key={bookmark.id}
                            className="flex flex-col gap-2 rounded-md border p-3"
                        >
                            <div className="flex items-center justify-between">
                                <a
                                    href={bookmark.url}
                                    className="text-primary text-sm font-medium hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {bookmark.title}
                                </a>
                                <button
                                    className="text-destructive hover:text-destructive/80"
                                    onClick={() => remove(bookmark.id)}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {["react", "nextjs", "docs", "code"].map(
                                    (tag) => (
                                        <button
                                            key={tag}
                                            className={`rounded-full px-2 py-0.5 text-xs ${
                                                bookmark.tags.includes(tag)
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted text-muted-foreground"
                                            }`}
                                            onClick={() =>
                                                toggleTag(bookmark, tag)
                                            }
                                        >
                                            {tag}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
