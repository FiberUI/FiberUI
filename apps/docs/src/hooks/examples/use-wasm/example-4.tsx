"use client";

import { useWasm } from "@repo/hooks/performance/use-wasm";
import { useState } from "react";
import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Cpu, ArrowRight } from "lucide-react";

interface StringWasm {
    // WASM modules often use memory pointers for strings
    // This example simulates calling a module that allocates and returns memory
    processString: (ptr: number, len: number) => number;
    memory: WebAssembly.Memory;
}

export function Example4() {
    // In a real application, you would load a compiled WASM that exports memory and string processing functions
    const { module, loading } = useWasm<StringWasm>("/example-string.wasm");
    const [input, setInput] = useState("Hello WebAssembly");
    const [output, setOutput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleProcess = () => {
        setIsProcessing(true);

        // Simulating the complexity of passing strings to WASM
        setTimeout(() => {
            if (module && module.memory) {
                try {
                    // 1. Encode string to UTF-8
                    const encoder = new TextEncoder();
                    const bytes = encoder.encode(input);

                    // 2. Allocate memory in WASM (pseudo-code, depends on WASM implementation)
                    // const ptr = module.alloc(bytes.length);
                    // 3. Write to memory
                    // new Uint8Array(module.memory.buffer, ptr, bytes.length).set(bytes);

                    // 4. Call WASM function
                    // const resultPtr = module.processString(ptr, bytes.length);

                    // 5. Read result from memory
                    // const decoder = new TextDecoder();
                    // const resultBytes = new Uint8Array(module.memory.buffer, resultPtr, someLen);
                    // setOutput(decoder.decode(resultBytes));

                    setOutput(
                        `[WASM Processed]: ${input.toUpperCase()} (Simulated)`,
                    );
                } catch (e) {
                    setOutput("WASM memory interacting failed.");
                }
            } else {
                // Fallback simulation for the docs UI since we don't have a real .wasm file here
                setOutput(`[Processed]: ${input.split("").reverse().join("")}`);
            }
            setIsProcessing(false);
        }, 400);
    };

    return (
        <Card className="mx-auto flex w-full max-w-md flex-col gap-6 p-6">
            <div className="flex items-center gap-3 border-b pb-4">
                <div className="bg-primary/10 text-primary rounded-lg p-2">
                    <Cpu className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-bold">Advanced: Memory & Strings</h3>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                        Passing complex data types via `memory` exports.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter string to process..."
                />
                <Button
                    onClick={handleProcess}
                    isDisabled={loading || isProcessing}
                    className="w-full"
                >
                    {isProcessing ? "Processing in WASM..." : "Process Data"}
                </Button>
            </div>

            {output && (
                <div className="animate-in fade-in zoom-in-95 mt-2 flex flex-col gap-2">
                    <div className="text-muted-foreground flex items-center text-xs font-bold uppercase tracking-wider">
                        <ArrowRight className="mr-1 h-3 w-3" />
                        Output Result
                    </div>
                    <div className="break-all rounded-md border bg-zinc-100 p-3 font-mono text-sm dark:bg-zinc-900">
                        {output}
                    </div>
                </div>
            )}
        </Card>
    );
}
