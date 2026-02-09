"use client";

import { useState } from "react";
import { useSpeechRecognition } from "@repo/hooks/speech/use-speech-recognition";
import { Mic, MicOff, ListChecks, Trash2 } from "lucide-react";

/* VOICE COMMANDS - Execute Actions from Speech */
export const Example2 = () => {
    const [tasks, setTasks] = useState<string[]>([
        "Review PR #42",
        "Update documentation",
    ]);
    const [lastCommand, setLastCommand] = useState<string | null>(null);

    const { isListening, isSupported, start, stop, resetTranscript } =
        useSpeechRecognition({
            continuous: true,
            onResult: (text, isFinal) => {
                if (!isFinal) return;

                const command = text.toLowerCase().trim();
                setLastCommand(command);

                // Add task command
                if (
                    command.startsWith("add task ") ||
                    command.startsWith("add ")
                ) {
                    const taskName = command.replace(/^add( task)?\s+/i, "");
                    if (taskName) {
                        setTasks((prev) => [...prev, taskName]);
                    }
                }
                // Remove task command
                else if (
                    command.startsWith("remove task ") ||
                    command.startsWith("delete ")
                ) {
                    const taskName = command.replace(
                        /^(remove task|delete)\s+/i,
                        "",
                    );
                    setTasks((prev) =>
                        prev.filter((t) => !t.toLowerCase().includes(taskName)),
                    );
                }
                // Clear all command
                else if (command === "clear all" || command === "delete all") {
                    setTasks([]);
                }
            },
        });

    if (!isSupported) {
        return (
            <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-center">
                Speech Recognition is not supported in your browser.
            </div>
        );
    }

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            {/* Header with mic button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ListChecks className="text-primary h-5 w-5" />
                    <h3 className="font-semibold">Voice Task Manager</h3>
                </div>
                <button
                    onClick={() => {
                        if (isListening) {
                            stop();
                        } else {
                            resetTranscript();
                            start();
                        }
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                        isListening
                            ? "animate-pulse bg-red-500 text-white"
                            : "bg-primary text-primary-foreground"
                    }`}
                >
                    {isListening ? (
                        <MicOff className="h-4 w-4" />
                    ) : (
                        <Mic className="h-4 w-4" />
                    )}
                </button>
            </div>

            {/* Commands hint */}
            <div className="bg-muted/50 rounded-lg p-3 text-xs">
                <p className="text-muted-foreground mb-1 font-medium">
                    Try saying:
                </p>
                <ul className="text-muted-foreground space-y-0.5">
                    <li>&quot;Add task buy groceries&quot;</li>
                    <li>&quot;Delete groceries&quot;</li>
                    <li>&quot;Clear all&quot;</li>
                </ul>
            </div>

            {/* Last command */}
            {lastCommand && (
                <p className="text-muted-foreground text-xs">
                    Last command:{" "}
                    <span className="text-foreground font-mono">
                        &quot;{lastCommand}&quot;
                    </span>
                </p>
            )}

            {/* Task list */}
            <div className="bg-background rounded-lg border">
                {tasks.length === 0 ? (
                    <p className="text-muted-foreground p-4 text-center text-sm italic">
                        No tasks. Say &quot;Add task...&quot; to create one.
                    </p>
                ) : (
                    <ul className="divide-y">
                        {tasks.map((task, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between p-3"
                            >
                                <span className="text-sm">{task}</span>
                                <button
                                    onClick={() =>
                                        setTasks((prev) =>
                                            prev.filter((_, i) => i !== index),
                                        )
                                    }
                                    className="text-muted-foreground hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
