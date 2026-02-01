/* eslint-disable */

"use client";

import { useFileUpload } from "@repo/hooks/form/use-file-upload";

// Sample initial files for demo
const initialFiles = [
    {
        id: "image-01-demo",
        name: "image-01.jpg",
        size: 1528737,
        type: "image/jpeg",
        url: "https://picsum.photos/400/400?random=1",
    },
    {
        id: "image-02-demo",
        name: "image-02.jpg",
        size: 1024000,
        type: "image/jpeg",
        url: "https://picsum.photos/400/400?random=2",
    },
    {
        id: "image-03-demo",
        name: "image-03.jpg",
        size: 2048000,
        type: "image/jpeg",
        url: "https://picsum.photos/400/400?random=3",
    },
];

export function Example3() {
    const maxSizeMB = 5;
    const maxSize = maxSizeMB * 1024 * 1024;
    const maxFiles = 6;

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
    } = useFileUpload({
        accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
        initialFiles,
        maxFiles,
        maxSize,
        multiple: true,
    });

    return (
        <div className="flex w-full max-w-xl flex-col gap-2 p-4">
            {/* Drop area */}
            <div
                className={`relative flex min-h-52 flex-col overflow-hidden rounded-xl border border-dashed p-4 transition-colors ${
                    isDragging ? "border-primary bg-accent/50" : "border-input"
                } ${files.length === 0 ? "items-center justify-center" : ""}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    {...getInputProps()}
                    aria-label="Upload image file"
                    className="sr-only"
                />

                {files.length > 0 ? (
                    <div className="flex w-full flex-col gap-3">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="truncate text-sm font-medium">
                                Uploaded Files ({files.length})
                            </h3>
                            <button
                                disabled={files.length >= maxFiles}
                                onClick={openFileDialog}
                                className="bg-background hover:bg-accent inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <svg
                                    className="h-3.5 w-3.5 opacity-60"
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
                                Add more
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {files.map((file) => (
                                <div
                                    className="bg-accent relative aspect-square rounded-md"
                                    key={file.id}
                                >
                                    <img
                                        alt={file.file.name}
                                        className="size-full rounded-[inherit] object-cover"
                                        src={file.preview}
                                    />
                                    <button
                                        aria-label="Remove image"
                                        className="bg-primary text-primary-foreground border-background absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2"
                                        onClick={() => removeFile(file.id)}
                                    >
                                        <svg
                                            className="h-3.5 w-3.5"
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
                ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                        <div
                            aria-hidden="true"
                            className="bg-background mb-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                        >
                            <svg
                                className="h-4 w-4 opacity-60"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="3"
                                    rx="2"
                                    ry="2"
                                />
                                <circle cx="9" cy="9" r="2" />
                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>
                        </div>
                        <p className="mb-1.5 text-sm font-medium">
                            Drop your images here
                        </p>
                        <p className="text-muted-foreground text-xs">
                            SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
                        </p>
                        <button
                            className="bg-background hover:bg-accent mt-4 inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
                            onClick={openFileDialog}
                        >
                            <svg
                                className="h-4 w-4 opacity-60"
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
                            Select images
                        </button>
                    </div>
                )}
            </div>

            {errors.length > 0 && (
                <div
                    className="text-destructive flex items-center gap-1 text-xs"
                    role="alert"
                >
                    <svg
                        className="h-3 w-3 shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="8" y2="12" />
                        <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    <span>{errors[0]}</span>
                </div>
            )}
        </div>
    );
}
