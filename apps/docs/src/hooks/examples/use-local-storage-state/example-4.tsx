"use client";

import { useState } from "react";
import { useLocalStorageState } from "@repo/hooks/use-local-storage-state";

interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}

/* ARRAY STATE - Todo List */
export const Example4 = () => {
    const [todos, setTodos, isLoading] = useLocalStorageState<TodoItem[]>(
        "todos",
        [],
    );
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (!input.trim()) return;
        setTodos((prev) => [
            ...prev,
            { id: Date.now(), text: input, completed: false },
        ]);
        setInput("");
    };

    const toggleTodo = (id: number) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
        );
    };

    const deleteTodo = (id: number) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    if (isLoading) {
        return (
            <span className="text-muted-foreground text-sm">Loading...</span>
        );
    }

    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <div className="flex gap-2">
                <input
                    className="bg-background flex-1 rounded-md border px-3 py-1.5 text-sm"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a todo..."
                    onKeyDown={(e) => e.key === "Enter" && addTodo()}
                />
                <button
                    className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm"
                    onClick={addTodo}
                >
                    Add
                </button>
            </div>
            <ul className="flex flex-col gap-1">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex items-center justify-between rounded-md border px-3 py-2"
                    >
                        <span
                            className={`cursor-pointer text-sm ${
                                todo.completed
                                    ? "text-muted-foreground line-through"
                                    : ""
                            }`}
                            onClick={() => toggleTodo(todo.id)}
                        >
                            {todo.text}
                        </span>
                        <button
                            className="text-destructive hover:text-destructive/80"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
