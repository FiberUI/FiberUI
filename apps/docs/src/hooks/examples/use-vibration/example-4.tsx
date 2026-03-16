"use client";

import { useState } from "react";
import { useVibration } from "@repo/hooks/device/use-vibration";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Card } from "@repo/ui/components/card";

export function Example4() {
    const { vibrate } = useVibration();
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (pin.length !== 4) {
            setError(true);
            // Quick error buzz to alert user
            vibrate([50, 50, 50, 50]);

            // Clear error state after a moment
            setTimeout(() => setError(false), 2000);
            return;
        }

        // Success hum
        setError(false);
        vibrate(200);
        setPin("");
        alert("PIN Accepted!");
    };

    const handleInput = (val: string) => {
        // Light tap when typing
        vibrate(10);
        setPin(val);
    };

    return (
        <Card className="mx-auto w-full max-w-sm p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="text-center">
                    <h3 className="text-lg font-medium">Form Feedback</h3>
                    <p className="text-muted-foreground text-sm">
                        Submit an invalid PIN to trigger error vibration.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Label htmlFor="pin">Enter 4-digit PIN</Label>
                    <Input
                        id="pin"
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        placeholder="••••"
                        value={pin}
                        onChange={(e) => handleInput(e.target.value)}
                        className={`text-center text-xl tracking-widest transition-all ${
                            error
                                ? "animate-in slide-in-from-left-2 border-red-500 ring-1 ring-red-500"
                                : ""
                        }`}
                    />
                    {error && (
                        <p className="text-destructive text-xs">
                            PIN must be exactly 4 digits
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full">
                    Verify
                </Button>
            </form>
        </Card>
    );
}
