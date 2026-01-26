import { useState, useCallback } from "react";

/**
 * Options for file picking
 */
export interface OpenFileOptions {
    /** Allowed MIME types or file extensions */
    types?: FilePickerAcceptType[];
    /** Allow multiple file selection */
    multiple?: boolean;
    /** excluded types */
    excludeAcceptAllOption?: boolean;
    /** Description for the file picker */
    description?: string;
}

/**
 * Options for file saving
 */
export interface SaveFileOptions {
    /** Suggested file name */
    suggestedName?: string;
    /** Allowed MIME types */
    types?: FilePickerAcceptType[];
}

/**
 * Return type for the useFileSystem hook
 */
export interface UseFileSystemReturn {
    /** Open a file picker and load the file */
    openFile: (options?: OpenFileOptions) => Promise<File | null>;
    /** Save content to the currently open file */
    saveFile: (content: string | Blob | BufferSource) => Promise<boolean>;
    /** Save content to a new file (Save As) */
    saveFileAs: (
        content: string | Blob | BufferSource,
        options?: SaveFileOptions,
    ) => Promise<boolean>;
    /** The currently active file handle */
    fileHandle: FileSystemFileHandle | null;
    /** The currently loaded file object */
    file: File | null;
    /** Whether the API is supported */
    isSupported: boolean;
    /** Whether an operation is in progress */
    isLoading: boolean;
    /** Error from last operation */
    error: Error | null;
}

// Types for File System Access API
// These might be available in newer TypeScript versions or DOM libs,
// but defining them here ensures compatibility.
interface FilePickerAcceptType {
    description?: string;
    accept: Record<string, string[]>;
}

interface OpenFilePickerOptions {
    multiple?: boolean;
    excludeAcceptAllOption?: boolean;
    types?: FilePickerAcceptType[];
}

interface SaveFilePickerOptions {
    suggestedName?: string;
    types?: FilePickerAcceptType[];
}

declare global {
    interface Window {
        showOpenFilePicker?: (
            options?: OpenFilePickerOptions,
        ) => Promise<FileSystemFileHandle[]>;
        showSaveFilePicker?: (
            options?: SaveFilePickerOptions,
        ) => Promise<FileSystemFileHandle>;
    }
}

/**
 * A React hook that provides access to the File System Access API,
 * allowing reading and writing files directly to the user's system.
 *
 * @returns UseFileSystemReturn and state
 */
export function useFileSystem(): UseFileSystemReturn {
    const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(
        null,
    );
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Check support
    const isSupported =
        typeof window !== "undefined" && "showOpenFilePicker" in window;

    // Open file
    const openFile = useCallback(
        async (options: OpenFileOptions = {}): Promise<File | null> => {
            if (!isSupported) {
                setError(new Error("File System Access API is not supported"));
                return null;
            }

            setIsLoading(true);
            setError(null);

            try {
                // @ts-ignore - API support check handles this
                const handles = await window.showOpenFilePicker({
                    multiple: false, // We only support single file for this simple hook for now
                    types: options.types,
                    excludeAcceptAllOption: options.excludeAcceptAllOption,
                });

                if (!handles || handles.length === 0 || !handles[0]) {
                    setIsLoading(false);
                    return null;
                }

                const handle = handles[0];
                const fileData = await handle.getFile();

                setFileHandle(handle);
                setFile(fileData);
                return fileData;
            } catch (err) {
                // Ignore abort errors (user cancelled)
                if ((err as Error).name !== "AbortError") {
                    const error =
                        err instanceof Error
                            ? err
                            : new Error("Failed to open file");
                    setError(error);
                }
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [isSupported],
    );

    // Write content to a handle
    const writeToHandle = async (
        handle: FileSystemFileHandle,
        content: string | Blob | BufferSource,
    ) => {
        // Create a writable stream
        // @ts-ignore
        const writable = await handle.createWritable();
        // Write the contents
        await writable.write(content);
        // Close the file
        await writable.close();
    };

    // Save to current file
    const saveFile = useCallback(
        async (content: string | Blob | BufferSource): Promise<boolean> => {
            if (!isSupported) {
                setError(new Error("File System Access API is not supported"));
                return false;
            }

            if (!fileHandle) {
                setError(new Error("No file currently open"));
                return false;
            }

            setIsLoading(true);
            setError(null);

            try {
                await writeToHandle(fileHandle, content);

                // Refresh file data
                const updatedFile = await fileHandle.getFile();
                setFile(updatedFile);
                return true;
            } catch (err) {
                const error =
                    err instanceof Error
                        ? err
                        : new Error("Failed to save file");
                setError(error);
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [isSupported, fileHandle],
    );

    // Save as new file
    const saveFileAs = useCallback(
        async (
            content: string | Blob | BufferSource,
            options: SaveFileOptions = {},
        ): Promise<boolean> => {
            if (!isSupported) {
                setError(new Error("File System Access API is not supported"));
                return false;
            }

            setIsLoading(true);
            setError(null);

            try {
                // @ts-ignore
                const handle = await window.showSaveFilePicker({
                    suggestedName: options.suggestedName,
                    types: options.types,
                });

                await writeToHandle(handle, content);

                const fileData = await handle.getFile();
                setFileHandle(handle);
                setFile(fileData);
                return true;
            } catch (err) {
                if ((err as Error).name !== "AbortError") {
                    const error =
                        err instanceof Error
                            ? err
                            : new Error("Failed to save file");
                    setError(error);
                }
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [isSupported],
    );

    return {
        openFile,
        saveFile,
        saveFileAs,
        fileHandle,
        file,
        isSupported,
        isLoading,
        error,
    };
}

export default useFileSystem;
