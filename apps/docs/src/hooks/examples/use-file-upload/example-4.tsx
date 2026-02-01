"use client";

import {
    useFileUpload,
    formatBytes,
    type FileWithPreview,
} from "@repo/hooks/form/use-file-upload";

// Sample initial files for demo
const initialFiles = [
    {
        id: "document-pdf-demo",
        name: "document.pdf",
        size: 528737,
        type: "application/pdf",
        url: "https://example.com/document.pdf",
    },
    {
        id: "archive-zip-demo",
        name: "project.zip",
        size: 252873,
        type: "application/zip",
        url: "https://example.com/project.zip",
    },
    {
        id: "spreadsheet-xlsx-demo",
        name: "data.xlsx",
        size: 352873,
        type: "application/xlsx",
        url: "https://example.com/data.xlsx",
    },
];

// Get appropriate icon based on file type
function getFileIcon(file: FileWithPreview) {
    const fileType =
        file.file instanceof File ? file.file.type : file.file.type;
    const fileName =
        file.file instanceof File ? file.file.name : file.file.name;

    // PDF/Word documents
    if (
        fileType.includes("pdf") ||
        fileName.endsWith(".pdf") ||
        fileType.includes("word") ||
        fileName.endsWith(".doc") ||
        fileName.endsWith(".docx")
    ) {
        return (
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
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
            </svg>
        );
    }

    // Archives
    if (
        fileType.includes("zip") ||
        fileType.includes("archive") ||
        fileName.endsWith(".zip") ||
        fileName.endsWith(".rar")
    ) {
        return (
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
                <path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v18" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <circle cx="10" cy="20" r="2" />
                <path d="M10 7V6" />
                <path d="M10 12v-1" />
                <path d="M10 18v-2" />
            </svg>
        );
    }

    // Spreadsheets
    if (
        fileType.includes("excel") ||
        fileName.endsWith(".xls") ||
        fileName.endsWith(".xlsx")
    ) {
        return (
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
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M8 13h2" />
                <path d="M14 13h2" />
                <path d="M8 17h2" />
                <path d="M14 17h2" />
            </svg>
        );
    }

    // Images
    if (fileType.startsWith("image/")) {
        return (
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
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
        );
    }

    // Video
    if (fileType.includes("video/")) {
        return (
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
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                <rect x="2" y="6" width="14" height="12" rx="2" />
            </svg>
        );
    }

    // Audio
    if (fileType.includes("audio/")) {
        return (
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
                <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
            </svg>
        );
    }

    // Default file icon
    return (
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
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
    );
}

export function Example4() {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const maxFiles = 10;

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
        clearFiles,
        getInputProps,
    } = useFileUpload({
        initialFiles,
        maxFiles,
        maxSize,
        multiple: true,
    });

    return (
        <div className="flex w-full max-w-lg flex-col gap-2 p-4">
            {/* Drop area */}
            <div
                className={`hover:bg-accent/50 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors ${
                    isDragging ? "border-primary bg-accent/50" : "border-input"
                }`}
                onClick={openFileDialog}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                role="button"
                tabIndex={-1}
            >
                <input
                    {...getInputProps()}
                    aria-label="Upload files"
                    className="sr-only"
                />

                <div className="flex flex-col items-center justify-center text-center">
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
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                            <path d="M12 12v6" />
                            <path d="m15 15-3-3-3 3" />
                        </svg>
                    </div>
                    <p className="mb-1.5 text-sm font-medium">Upload files</p>
                    <p className="text-muted-foreground mb-2 text-xs">
                        Drag & drop or click to browse
                    </p>
                    <div className="text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs">
                        <span>All files</span>
                        <span>∙</span>
                        <span>Max {maxFiles} files</span>
                        <span>∙</span>
                        <span>Up to {formatBytes(maxSize)}</span>
                    </div>
                </div>
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

            {/* File list */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file) => (
                        <div
                            className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
                            key={file.id}
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex aspect-square h-10 w-10 shrink-0 items-center justify-center rounded border">
                                    {getFileIcon(file)}
                                </div>
                                <div className="flex min-w-0 flex-col gap-0.5">
                                    <p className="truncate text-[13px] font-medium">
                                        {file.file.name}
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                        {formatBytes(file.file.size)}
                                    </p>
                                </div>
                            </div>

                            <button
                                aria-label="Remove file"
                                className="text-muted-foreground/80 hover:text-foreground -me-2 h-8 w-8 rounded-md p-2 transition-colors hover:bg-transparent"
                                onClick={() => removeFile(file.id)}
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

                    {/* Remove all files button */}
                    {files.length > 1 && (
                        <button
                            onClick={clearFiles}
                            className="bg-background hover:bg-accent rounded-md border px-3 py-1.5 text-sm font-medium transition-colors"
                        >
                            Remove all files
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
