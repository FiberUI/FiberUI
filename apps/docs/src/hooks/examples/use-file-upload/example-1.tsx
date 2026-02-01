/* eslint-disable */

"use client";

import { useFileUpload, formatBytes } from "@repo/hooks/form/use-file-upload";

export function Example1() {
    const { files, errors, removeFile, getInputProps } = useFileUpload({
        maxSize: 5 * 1024 * 1024, // 5MB
        accept: "image/*",
    });

    const file = files[0];

    return (
        <div className="flex w-full max-w-md flex-col items-center gap-4 p-4">
            <div className="w-full">
                <label
                    htmlFor="file-upload-1"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
                >
                    {file ? "Change File" : "Select Image"}
                </label>
                <input
                    id="file-upload-1"
                    className="sr-only"
                    {...getInputProps()}
                />
            </div>

            {errors.length > 0 && (
                <div className="w-full rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950">
                    {errors.map((error, i) => (
                        <p
                            key={i}
                            className="text-sm text-red-600 dark:text-red-400"
                        >
                            {error}
                        </p>
                    ))}
                </div>
            )}

            {file && (
                <div className="bg-muted/50 w-full rounded-lg border p-4">
                    <div className="flex items-start gap-4">
                        {file.preview && (
                            <img
                                src={file.preview}
                                alt={file.file.name}
                                className="h-20 w-20 rounded-md object-cover"
                            />
                        )}
                        <div className="flex-1 space-y-1">
                            <p className="truncate text-sm font-medium">
                                {file.file.name}
                            </p>
                            <p className="text-muted-foreground text-xs">
                                {formatBytes(file.file.size)}
                            </p>
                        </div>
                        <button
                            onClick={() => removeFile(file.id)}
                            className="text-muted-foreground hover:text-destructive rounded-md p-1 transition-colors"
                            aria-label="Remove file"
                        >
                            <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
