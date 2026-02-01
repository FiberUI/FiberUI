/* eslint-disable */
"use client";

import { useFileUpload, formatBytes } from "@repo/hooks/form/use-file-upload";

export function Example2() {
    const {
        files,
        isDragging,
        errors,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        openFileDialog,
        removeFile,
        getInputProps,
        clearFiles,
    } = useFileUpload({
        multiple: true,
        maxFiles: 5,
        maxSize: 10 * 1024 * 1024, // 10MB
    });

    return (
        <div className="flex w-full max-w-lg flex-col gap-4 p-4">
            <input className="sr-only" {...getInputProps()} />

            {/* Dropzone */}
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={openFileDialog}
                className={`flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
                    isDragging
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-primary/50"
                }`}
            >
                <svg
                    className="text-muted-foreground mb-4 h-10 w-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                </svg>
                <p className="text-muted-foreground mb-1 text-sm font-medium">
                    {isDragging
                        ? "Drop files here"
                        : "Click to upload or drag and drop"}
                </p>
                <p className="text-muted-foreground text-xs">
                    Up to 5 files, max 10MB each
                </p>
            </div>

            {/* Error messages */}
            {errors.length > 0 && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950">
                    {errors.map((error: string, i: number) => (
                        <p
                            key={i}
                            className="text-sm text-red-600 dark:text-red-400"
                        >
                            {error}
                        </p>
                    ))}
                </div>
            )}

            {/* File list */}
            {files.length > 0 && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                            {files.length} file{files.length > 1 ? "s" : ""}{" "}
                            selected
                        </p>
                        <button
                            onClick={clearFiles}
                            className="text-muted-foreground hover:text-destructive text-xs underline"
                        >
                            Clear all
                        </button>
                    </div>
                    <div className="space-y-2">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className="bg-muted/50 flex items-center gap-3 rounded-md border p-3"
                            >
                                {file.preview &&
                                file.file.type?.startsWith("image/") ? (
                                    <img
                                        src={file.preview}
                                        alt={file.file.name}
                                        className="h-10 w-10 rounded object-cover"
                                    />
                                ) : (
                                    <div className="bg-muted flex h-10 w-10 items-center justify-center rounded">
                                        <svg
                                            className="text-muted-foreground h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                                            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                        </svg>
                                    </div>
                                )}
                                <div className="min-w-0 flex-1">
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
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
