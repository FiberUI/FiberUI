"use client";

import { useSessionStorageState } from "@repo/hooks/storage/use-session-storage-state";

type WizardStep = "personal" | "address" | "review";

/* MULTI-STEP WIZARD - Preserving Progress */
export const Example2 = () => {
    const [currentStep, setCurrentStep, isLoading] =
        useSessionStorageState<WizardStep>("wizard-step", "personal");

    const steps: { key: WizardStep; label: string }[] = [
        { key: "personal", label: "Personal" },
        { key: "address", label: "Address" },
        { key: "review", label: "Review" },
    ];

    if (isLoading) {
        return (
            <span className="text-muted-foreground text-sm">Loading...</span>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                {steps.map((step, index) => (
                    <button
                        key={step.key}
                        className={`rounded-md px-4 py-2 text-sm ${
                            currentStep === step.key
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                        }`}
                        onClick={() => setCurrentStep(step.key)}
                    >
                        {index + 1}. {step.label}
                    </button>
                ))}
            </div>
            <p className="text-muted-foreground text-sm">
                Current step: <span className="font-medium">{currentStep}</span>
            </p>
            <p className="text-muted-foreground text-xs">
                Progress is preserved until you close this tab
            </p>
        </div>
    );
};
