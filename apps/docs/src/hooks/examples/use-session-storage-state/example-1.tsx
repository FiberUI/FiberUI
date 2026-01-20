"use client";

import { useSessionStorageState } from "@repo/hooks/use-session-storage-state";

/* BASIC USAGE - Form Data Persistence */
export const Example1 = () => {
    const [formData, setFormData, isLoading] = useSessionStorageState(
        "contact-form",
        {
            name: "",
            email: "",
            message: "",
        },
    );

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    if (isLoading) {
        return (
            <span className="text-muted-foreground text-sm">Loading...</span>
        );
    }

    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <input
                className="bg-background rounded-md border px-3 py-2 text-sm"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Name"
            />
            <input
                className="bg-background rounded-md border px-3 py-2 text-sm"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Email"
            />
            <textarea
                className="bg-background rounded-md border px-3 py-2 text-sm"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Message"
                rows={3}
            />
            <p className="text-muted-foreground text-xs">
                Form data is preserved during your session
            </p>
        </div>
    );
};
